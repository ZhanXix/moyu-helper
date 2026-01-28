/**
 * 摸鱼放置游戏辅助脚本 - 主入口文件
 *
 * 架构说明：
 * - 初始化核心模块（WebSocket、数据缓存、日志系统）
 * - 注册功能模块（任务、物品、工具栏、资源监控、制作管理）
 * - 创建用户界面（悬浮面板和设置面板）
 */

import type { PanelButton } from './types';
import { FloatingPanel, settingsPanel } from './ui';
import { CraftPanel } from './features/craft';
import { SkillAllocationPanel } from './features/skill-allocation';
import { logger, ws, dataCache, toast } from './core';
import {
  questManager,
  qualityToolbarManager,
  satietyManager,
  resourceMonitor,
  craftManager,
  battleGuard,
  tavernExpertManager,
} from './features';
import { mountResourceUtils } from './utils';
import { STORAGE_KEYS, DEFAULT_CONFIG } from './config/defaults';
import { analytics } from './utils';

/**
 * 应用模块注册表
 */
interface AppModules {
  quest: typeof questManager;
  toolbar: typeof qualityToolbarManager;
  satiety: typeof satietyManager;
  resources: typeof resourceMonitor;
  craft: typeof craftManager;
  settings: typeof settingsPanel;
  craftPanel: CraftPanel;
  skillAllocationPanel: SkillAllocationPanel;
}

const app: AppModules = {
  quest: questManager,
  toolbar: qualityToolbarManager,
  satiety: satietyManager,
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
  const logLevel = await GM.getValue(STORAGE_KEYS.LOG_LEVEL, DEFAULT_CONFIG.LOG_LEVEL);
  logger.setMinLevel(logLevel);
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
const getMenuButtons = async (): Promise<PanelButton[]> => {
  const buttons: PanelButton[] = [
    {
      text: '⚙️ 脚本设置',
      onClick: () => app.settings.show(),
      order: 999,
    },
  ];

  // 读取功能开关
  const questManagerEnabled = await GM.getValue(
    STORAGE_KEYS.QUEST_MANAGER_ENABLED,
    DEFAULT_CONFIG.QUEST_MANAGER_ENABLED,
  );
  const craftPanelEnabled = await GM.getValue(STORAGE_KEYS.CRAFT_PANEL_ENABLED, DEFAULT_CONFIG.CRAFT_PANEL_ENABLED);
  const skillAllocationEnabled = await GM.getValue(
    STORAGE_KEYS.SKILL_ALLOCATION_ENABLED,
    DEFAULT_CONFIG.SKILL_ALLOCATION_ENABLED,
  );
  const tavernExpertEnabled = await GM.getValue(
    STORAGE_KEYS.TAVERN_EXPERT_ENABLED,
    DEFAULT_CONFIG.TAVERN_EXPERT_ENABLED,
  );

  // 技能加点
  if (skillAllocationEnabled) {
    buttons.push({
      text: '🌳 技能加点',
      onClick: () => app.skillAllocationPanel.show(),
      order: 4,
    });
  }

  // 任务管理
  if (questManagerEnabled) {
    buttons.push({
      text: '📜 刷新任务',
      onClick: () => app.quest.refreshCards(),
      order: 2,
    });
  }

  // 物品制造
  if (craftPanelEnabled) {
    buttons.push({
      text: '🔨 物品制造',
      onClick: () => app.craftPanel.show(),
      order: 1,
    });
  }

  // 动态添加强化专家按钮（仅在datacache中有tavern数据且启用时显示）
  if (tavernExpertEnabled && dataCache.get('tavern')) {
    buttons.push({
      text: tavernExpertManager.getButtonText(),
      onClick: () => tavernExpertManager.toggle(),
      order: 6,
    });
  }

  // 动态添加资源监控按钮（仅在启用时显示）
  const resourceButton = app.resources.getButton();
  if (resourceButton) {
    buttons.push({ ...resourceButton, order: 3 });
  }

  return buttons.sort((a, b) => (b.order ?? -1) - (a.order ?? -1));
};

/**
 * 初始化用户界面
 */
async function initUI(): Promise<void> {
  try {
    new FloatingPanel({ subButtons: getMenuButtons });
    logger.success('悬浮面板初始化完成');
    await checkAndNotifyNoFeatures();
  } catch (error) {
    logger.error('悬浮面板初始化失败', error);
  }
}

/**
 * 检查是否启用了任何功能，如果没有则提示用户
 */
async function checkAndNotifyNoFeatures(): Promise<void> {
  const craftPanelEnabled = await GM.getValue(STORAGE_KEYS.CRAFT_PANEL_ENABLED, DEFAULT_CONFIG.CRAFT_PANEL_ENABLED);
  const skillAllocationEnabled = await GM.getValue(
    STORAGE_KEYS.SKILL_ALLOCATION_ENABLED,
    DEFAULT_CONFIG.SKILL_ALLOCATION_ENABLED,
  );
  const tavernExpertEnabled = await GM.getValue(
    STORAGE_KEYS.TAVERN_EXPERT_ENABLED,
    DEFAULT_CONFIG.TAVERN_EXPERT_ENABLED,
  );
  const battleGuardEnabled = await GM.getValue(STORAGE_KEYS.BATTLE_GUARD_ENABLED, DEFAULT_CONFIG.BATTLE_GUARD_ENABLED);
  const questManagerEnabled = await GM.getValue(
    STORAGE_KEYS.QUEST_MANAGER_ENABLED,
    DEFAULT_CONFIG.QUEST_MANAGER_ENABLED,
  );
  const monitorEnabled = await GM.getValue(
    STORAGE_KEYS.RESOURCE_MONITOR_ENABLED,
    DEFAULT_CONFIG.RESOURCE_MONITOR_ENABLED,
  );
  const autoBerryEnabled = await GM.getValue(
    STORAGE_KEYS.AUTO_USE_BERRY_ENABLED,
    DEFAULT_CONFIG.AUTO_USE_BERRY_ENABLED,
  );

  const hasAnyFeatureEnabled =
    craftPanelEnabled ||
    skillAllocationEnabled ||
    tavernExpertEnabled ||
    battleGuardEnabled ||
    questManagerEnabled ||
    monitorEnabled ||
    autoBerryEnabled;

  if (!hasAnyFeatureEnabled) {
    toast.info('💡 当前未启用任何功能，请点击右下角浮动按钮进行配置', 3000);
  }
}

/**
 * 初始化功能模块
 */
async function initFeatureModules(): Promise<void> {
  // 挂载资源工具函数到控制台
  mountResourceUtils();

  // 读取功能开关配置
  const battleGuardEnabled = await GM.getValue(STORAGE_KEYS.BATTLE_GUARD_ENABLED, DEFAULT_CONFIG.BATTLE_GUARD_ENABLED);
  const qualityToolbarEnabled = await GM.getValue(
    STORAGE_KEYS.QUALITY_TOOLBAR_ENABLED,
    DEFAULT_CONFIG.QUALITY_TOOLBAR_ENABLED,
  );

  // 初始化工具栏管理器
  if (qualityToolbarEnabled) {
    app.toolbar.init();
  }

  // 初始化战斗防护
  if (battleGuardEnabled) {
    battleGuard.init();
  }

  // 初始化饱食度管理器
  app.satiety.init();

  // 设置面板依赖注入
  app.settings.setResourceMonitor(app.resources);
  app.settings.setSatietyManager(app.satiety);

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

  analytics.init();
  await initLogger();
  initCoreModules();
  await initFeatureModules();

  logger.success('核心功能已启动');
}

/**
 * 等待指定元素出现
 */
function waitForElement(selector: string): Promise<Element> {
  return new Promise((resolve) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

// 立即初始化核心模块，避免错过早期 WebSocket 事件
void main();

// 等待 .user-dropdown 元素出现后初始化 UI
void waitForElement('.user-dropdown').then(async () => {
  await initUI();
  analytics.track('脚本', '启动', `v${GM.info.script.version}`);
  logger.success('UI 初始化完成');
});
