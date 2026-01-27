/**
 * 摸鱼放置游戏辅助脚本 - 主入口文件
 *
 * 架构说明：
 * - 初始化核心模块（WebSocket、数据缓存、日志系统）
 * - 注册功能模块（任务、物品、工具栏、资源监控、制作管理）
 * - 创建用户界面（悬浮面板和设置面板）
 */

import type { PanelButton } from './types';
import { FloatingPanel, settingsPanel, CraftPanel, SkillAllocationPanel } from './ui';
import { logger, ws, dataCache } from './core';
import {
  questManager,
  qualityToolbarManager,
  itemManager,
  resourceMonitor,
  craftManager,
  battleGuard,
  tavernExpertManager,
} from './features';
import { mountResourceUtils } from './utils';
import { STORAGE_KEYS, DEFAULT_CONFIG } from './config/defaults';

/**
 * 应用模块注册表
 */
interface AppModules {
  quest: typeof questManager;
  toolbar: typeof qualityToolbarManager;
  items: typeof itemManager;
  resources: typeof resourceMonitor;
  craft: typeof craftManager;
  settings: typeof settingsPanel;
  craftPanel: CraftPanel;
  skillAllocationPanel: SkillAllocationPanel;
}

const app: AppModules = {
  quest: questManager,
  toolbar: qualityToolbarManager,
  items: itemManager,
  resources: resourceMonitor,
  craft: craftManager,
  settings: settingsPanel,
  craftPanel: new CraftPanel(),
  skillAllocationPanel: new SkillAllocationPanel(),
};

/**
 * 初始化日志系统
 */
async function initLogger(): Promise<void> {
  const enabled = await GM.getValue(STORAGE_KEYS.CONSOLE_LOG_ENABLED, DEFAULT_CONFIG.CONSOLE_LOG_ENABLED);
  logger.setEnabled(enabled);
}

/**
 * 初始化核心模块
 */
function initCoreModules(): void {
  ws.init();
  dataCache.init();
  logger.success('核心模块初始化完成');
}

/**
 * 动态生成菜单按钮列表
 * 根据功能启用状态动态生成按钮配置
 */
const getMenuButtons = (): PanelButton[] => {
  const buttons: PanelButton[] = [
    {
      text: '⚙️ 设置',
      onClick: () => app.settings.show(),
    },
    {
      text: '🎒 使用浆果',
      onClick: () => app.items.useAll(),
    },
    {
      text: '🌳 技能树加点',
      onClick: () => app.skillAllocationPanel.show(),
    },
    {
      text: '📜 获取任务列表',
      onClick: () => app.quest.refreshCards(),
    },
    {
      text: '🔨 物品制造',
      onClick: () => app.craftPanel.show(),
    },
  ];

  // 动态添加强化专家按钮（仅在datacache中有tavern数据时显示）
  if (dataCache.get('tavern')) {
    buttons.push({
      text: tavernExpertManager.getButtonText(),
      onClick: () => tavernExpertManager.toggle(),
    });
  }

  // 动态添加资源监控按钮（仅在启用时显示）
  const resourceButton = app.resources.getButton();
  if (resourceButton) {
    buttons.push(resourceButton);
  }

  return buttons;
};

/**
 * 初始化用户界面
 */
function initUI(): void {
  try {
    new FloatingPanel({ subButtons: getMenuButtons });
    logger.success('悬浮面板初始化完成');
  } catch (error) {
    logger.error('悬浮面板初始化失败', error);
  }
}

/**
 * 初始化功能模块
 */
function initFeatureModules(): void {
  // 挂载资源工具函数到控制台
  mountResourceUtils();

  // 初始化工具栏管理器
  app.toolbar.init();

  // 初始化战斗防护
  battleGuard.init();

  // 设置面板依赖注入
  app.settings.setResourceMonitor(app.resources);

  // 监听用户信息初始化事件，自动检查资源
  ws.once('characterInitData', (data) => {
    logger.debug('用户信息已初始化', data.payload?.data);
    void app.resources.checkResources(false);
  });

  logger.success('功能模块初始化完成');
}

/**
 * 应用主入口
 */
async function main(): Promise<void> {
  logger.info('脚本开始加载...');

  await initLogger();
  initCoreModules();
  initFeatureModules();

  logger.success('核心功能已启动');
}

// 立即初始化核心模块，避免错过早期 WebSocket 事件
void main();

// 页面加载完成后初始化 UI
window.addEventListener('load', () => {
  setTimeout(() => {
    initUI();
    logger.success('UI 初始化完成');
  }, 1000);
});
