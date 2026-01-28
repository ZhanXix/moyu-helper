/**
 * 设置面板组件 - Preact 重构版
 *
 * 功能说明：
 * - 提供系统设置界面
 * - 支持任务队列、物品使用、资源监控配置
 * - 分类折叠显示资源项
 * - 支持清空所有设置
 */

import { render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import type { resourceMonitor } from '@/features/resource-monitor';
import type { satietyManager } from '@/features/satiety-manager';
import { DEFAULT_CONFIG, STORAGE_KEYS, type FoodType } from '@/config/defaults';
import { logger, toast } from '@/core';
import { taskQueue } from '@/utils/task-queue';
import { Modal, Card, Row, Input, Checkbox, Button, Select, Section } from './components';
import { analytics } from '@/utils';

interface ResourceConfig {
  threshold: number;
  type: 'insufficient' | 'excess';
}

interface ResourceCategory {
  name: string;
  items: Record<string, ResourceConfig | number>;
}

interface SettingsPanelProps {
  onClose: () => void;
  resourceMonitor: typeof resourceMonitor | null;
  satietyManager: typeof satietyManager | null;
}

function SettingsPanelContent({ onClose, resourceMonitor, satietyManager }: SettingsPanelProps) {
  const [batchSize, setBatchSize] = useState(DEFAULT_CONFIG.QUEST_BATCH_SIZE);
  const [taskInterval, setTaskInterval] = useState(DEFAULT_CONFIG.TASK_INTERVAL);
  const [batchDelay, setBatchDelay] = useState(DEFAULT_CONFIG.BATCH_DELAY);
  const [logLevel, setLogLevel] = useState(DEFAULT_CONFIG.LOG_LEVEL);
  const [monitorEnabled, setMonitorEnabled] = useState(DEFAULT_CONFIG.RESOURCE_MONITOR_ENABLED);
  const [autoBuyEnabled, setAutoBuyEnabled] = useState(DEFAULT_CONFIG.AUTO_BUY_BASE_RESOURCES);
  const [autoBerryEnabled, setAutoBerryEnabled] = useState(DEFAULT_CONFIG.AUTO_USE_BERRY_ENABLED);
  const [resourceCategories, setResourceCategories] = useState<ResourceCategory[]>([]);
  const [berryThreshold, setBerryThreshold] = useState(DEFAULT_CONFIG.AUTO_USE_BERRY_THRESHOLD);
  const [berryTarget, setBerryTarget] = useState(DEFAULT_CONFIG.AUTO_USE_BERRY_TARGET);
  const [berryFoodType, setBerryFoodType] = useState<FoodType>(DEFAULT_CONFIG.AUTO_USE_BERRY_FOOD_TYPE);
  const [questPrefix, setQuestPrefix] = useState(DEFAULT_CONFIG.QUEST_REQUIRED_PREFIX);
  const [questKeywords, setQuestKeywords] = useState(DEFAULT_CONFIG.QUEST_EXCLUDED_KEYWORDS);
  const [questManagerEnabled, setQuestManagerEnabled] = useState(DEFAULT_CONFIG.QUEST_MANAGER_ENABLED);
  const [battleGuardEnabled, setBattleGuardEnabled] = useState(DEFAULT_CONFIG.BATTLE_GUARD_ENABLED);
  const [qualityToolbarEnabled, setQualityToolbarEnabled] = useState(DEFAULT_CONFIG.QUALITY_TOOLBAR_ENABLED);
  const [tavernExpertEnabled, setTavernExpertEnabled] = useState(DEFAULT_CONFIG.TAVERN_EXPERT_ENABLED);
  const [craftPanelEnabled, setCraftPanelEnabled] = useState(DEFAULT_CONFIG.CRAFT_PANEL_ENABLED);
  const [skillAllocationEnabled, setSkillAllocationEnabled] = useState(DEFAULT_CONFIG.SKILL_ALLOCATION_ENABLED);

  // 加载初始数据
  useEffect(() => {
    const loadSettings = async () => {
      const loadedBatchSize = await GM.getValue(STORAGE_KEYS.QUEST_BATCH_SIZE, DEFAULT_CONFIG.QUEST_BATCH_SIZE);
      const loadedTaskInterval = await GM.getValue(STORAGE_KEYS.TASK_INTERVAL, DEFAULT_CONFIG.TASK_INTERVAL);
      const loadedBatchDelay = await GM.getValue(STORAGE_KEYS.BATCH_DELAY, DEFAULT_CONFIG.BATCH_DELAY);
      const loadedLogLevel = await GM.getValue(STORAGE_KEYS.LOG_LEVEL, DEFAULT_CONFIG.LOG_LEVEL);
      const loadedBerryThreshold = await GM.getValue(
        STORAGE_KEYS.AUTO_USE_BERRY_THRESHOLD,
        DEFAULT_CONFIG.AUTO_USE_BERRY_THRESHOLD,
      );
      const loadedBerryTarget = await GM.getValue(
        STORAGE_KEYS.AUTO_USE_BERRY_TARGET,
        DEFAULT_CONFIG.AUTO_USE_BERRY_TARGET,
      );
      const loadedQuestPrefix = await GM.getValue(
        STORAGE_KEYS.QUEST_REQUIRED_PREFIX,
        DEFAULT_CONFIG.QUEST_REQUIRED_PREFIX,
      );
      const loadedQuestKeywords = await GM.getValue(
        STORAGE_KEYS.QUEST_EXCLUDED_KEYWORDS,
        DEFAULT_CONFIG.QUEST_EXCLUDED_KEYWORDS,
      );
      const loadedBerryFoodType = await GM.getValue(
        STORAGE_KEYS.AUTO_USE_BERRY_FOOD_TYPE,
        DEFAULT_CONFIG.AUTO_USE_BERRY_FOOD_TYPE,
      );
      const loadedQuestManagerEnabled = await GM.getValue(
        STORAGE_KEYS.QUEST_MANAGER_ENABLED,
        DEFAULT_CONFIG.QUEST_MANAGER_ENABLED,
      );
      const loadedBattleGuardEnabled = await GM.getValue(
        STORAGE_KEYS.BATTLE_GUARD_ENABLED,
        DEFAULT_CONFIG.BATTLE_GUARD_ENABLED,
      );
      const loadedQualityToolbarEnabled = await GM.getValue(
        STORAGE_KEYS.QUALITY_TOOLBAR_ENABLED,
        DEFAULT_CONFIG.QUALITY_TOOLBAR_ENABLED,
      );
      const loadedTavernExpertEnabled = await GM.getValue(
        STORAGE_KEYS.TAVERN_EXPERT_ENABLED,
        DEFAULT_CONFIG.TAVERN_EXPERT_ENABLED,
      );
      const loadedCraftPanelEnabled = await GM.getValue(
        STORAGE_KEYS.CRAFT_PANEL_ENABLED,
        DEFAULT_CONFIG.CRAFT_PANEL_ENABLED,
      );
      const loadedSkillAllocationEnabled = await GM.getValue(
        STORAGE_KEYS.SKILL_ALLOCATION_ENABLED,
        DEFAULT_CONFIG.SKILL_ALLOCATION_ENABLED,
      );

      setBatchSize(loadedBatchSize);
      setTaskInterval(loadedTaskInterval);
      setBatchDelay(loadedBatchDelay);
      setLogLevel(loadedLogLevel);
      setBerryThreshold(loadedBerryThreshold);
      setBerryTarget(loadedBerryTarget);
      setQuestPrefix(loadedQuestPrefix);
      setQuestKeywords(loadedQuestKeywords);
      setBerryFoodType(loadedBerryFoodType);
      setQuestManagerEnabled(loadedQuestManagerEnabled);
      setBattleGuardEnabled(loadedBattleGuardEnabled);
      setQualityToolbarEnabled(loadedQualityToolbarEnabled);
      setTavernExpertEnabled(loadedTavernExpertEnabled);
      setCraftPanelEnabled(loadedCraftPanelEnabled);
      setSkillAllocationEnabled(loadedSkillAllocationEnabled);

      if (resourceMonitor) {
        const enabled = resourceMonitor.isEnabled();
        const autoBuy = resourceMonitor.isAutoBuyEnabled();
        const categories = resourceMonitor.getMonitoredResourcesByCategory();
        setMonitorEnabled(enabled);
        setAutoBuyEnabled(autoBuy);
        setResourceCategories(categories);
      }

      if (satietyManager) {
        const autoBerry = satietyManager.isEnabled();
        setAutoBerryEnabled(autoBerry);
      }
    };

    void loadSettings();
  }, [resourceMonitor, satietyManager]);

  const getResourceName = (id: string): string => {
    const resources = unsafeWindow.tAllGameResource;
    return resources?.[id]?.name || id;
  };

  const updateResourceConfig = (id: string, field: 'threshold' | 'type', value: number | string) => {
    setResourceCategories((prev) =>
      prev.map((category) => {
        const newItems = { ...category.items };
        if (id in newItems) {
          const config = newItems[id];
          if (typeof config === 'number') {
            newItems[id] = {
              threshold: field === 'threshold' ? (value as number) : config,
              type: field === 'type' ? (value as 'insufficient' | 'excess') : 'insufficient',
            };
          } else {
            newItems[id] = {
              ...config,
              [field]: value,
            };
          }
        }
        return { ...category, items: newItems };
      }),
    );
  };

  const handleSave = async () => {
    await GM.setValue(STORAGE_KEYS.QUEST_BATCH_SIZE, batchSize);
    await GM.setValue(STORAGE_KEYS.TASK_INTERVAL, taskInterval);
    await GM.setValue(STORAGE_KEYS.BATCH_DELAY, batchDelay);
    await GM.setValue(STORAGE_KEYS.LOG_LEVEL, logLevel);
    await GM.setValue(STORAGE_KEYS.AUTO_USE_BERRY_THRESHOLD, berryThreshold);
    await GM.setValue(STORAGE_KEYS.AUTO_USE_BERRY_TARGET, berryTarget);
    await GM.setValue(STORAGE_KEYS.AUTO_USE_BERRY_FOOD_TYPE, berryFoodType);
    await GM.setValue(STORAGE_KEYS.QUEST_REQUIRED_PREFIX, questPrefix);
    await GM.setValue(STORAGE_KEYS.QUEST_EXCLUDED_KEYWORDS, questKeywords);
    await GM.setValue(STORAGE_KEYS.QUEST_MANAGER_ENABLED, questManagerEnabled);
    await GM.setValue(STORAGE_KEYS.BATTLE_GUARD_ENABLED, battleGuardEnabled);
    await GM.setValue(STORAGE_KEYS.QUALITY_TOOLBAR_ENABLED, qualityToolbarEnabled);
    await GM.setValue(STORAGE_KEYS.TAVERN_EXPERT_ENABLED, tavernExpertEnabled);
    await GM.setValue(STORAGE_KEYS.CRAFT_PANEL_ENABLED, craftPanelEnabled);
    await GM.setValue(STORAGE_KEYS.SKILL_ALLOCATION_ENABLED, skillAllocationEnabled);

    taskQueue.setBatchSize(batchSize);
    taskQueue.setInterval(taskInterval);
    taskQueue.setBatchDelay(batchDelay);
    logger.setMinLevel(logLevel);

    if (resourceMonitor) {
      resourceMonitor.setEnabled(monitorEnabled);
      resourceMonitor.setAutoBuyEnabled(autoBuyEnabled);

      const resources: Record<string, ResourceConfig> = {};
      resourceCategories.forEach((category) => {
        Object.entries(category.items).forEach(([id, config]) => {
          if (typeof config === 'number') {
            resources[id] = { threshold: config, type: 'insufficient' };
          } else {
            resources[id] = config;
          }
        });
      });

      await resourceMonitor.setMonitoredResources(resources);
    }

    if (satietyManager) {
      await satietyManager.setEnabled(autoBerryEnabled);
      await satietyManager.setFoodType(berryFoodType);
    }

    toast.success('设置已保存');
    analytics.track('设置', '保存设置', '成功');
    window.dispatchEvent(new CustomEvent('settings-updated'));
    onClose();
  };

  const handleClearAll = async () => {
    if (!confirm('确定要清空所有设置吗？此操作不可恢复！')) return;

    await GM.setValue(STORAGE_KEYS.QUEST_BATCH_SIZE, DEFAULT_CONFIG.QUEST_BATCH_SIZE);
    await GM.setValue(STORAGE_KEYS.TASK_INTERVAL, DEFAULT_CONFIG.TASK_INTERVAL);
    await GM.setValue(STORAGE_KEYS.BATCH_DELAY, DEFAULT_CONFIG.BATCH_DELAY);
    await GM.setValue(STORAGE_KEYS.RESOURCE_MONITOR_ENABLED, DEFAULT_CONFIG.RESOURCE_MONITOR_ENABLED);
    await GM.setValue(STORAGE_KEYS.AUTO_BUY_BASE_RESOURCES, DEFAULT_CONFIG.AUTO_BUY_BASE_RESOURCES);
    await GM.setValue(STORAGE_KEYS.AUTO_USE_BERRY_ENABLED, DEFAULT_CONFIG.AUTO_USE_BERRY_ENABLED);
    await GM.setValue(STORAGE_KEYS.MONITORED_RESOURCES, {});
    await GM.setValue(STORAGE_KEYS.KITTY_DEFAULT_TASKS, {});
    await GM.setValue(STORAGE_KEYS.LOG_LEVEL, DEFAULT_CONFIG.LOG_LEVEL);
    await GM.setValue(STORAGE_KEYS.AUTO_USE_BERRY_THRESHOLD, DEFAULT_CONFIG.AUTO_USE_BERRY_THRESHOLD);
    await GM.setValue(STORAGE_KEYS.AUTO_USE_BERRY_TARGET, DEFAULT_CONFIG.AUTO_USE_BERRY_TARGET);
    await GM.setValue(STORAGE_KEYS.AUTO_USE_BERRY_FOOD_TYPE, DEFAULT_CONFIG.AUTO_USE_BERRY_FOOD_TYPE);
    await GM.setValue(STORAGE_KEYS.QUEST_REQUIRED_PREFIX, DEFAULT_CONFIG.QUEST_REQUIRED_PREFIX);
    await GM.setValue(STORAGE_KEYS.QUEST_EXCLUDED_KEYWORDS, DEFAULT_CONFIG.QUEST_EXCLUDED_KEYWORDS);
    await GM.setValue(STORAGE_KEYS.QUEST_MANAGER_ENABLED, DEFAULT_CONFIG.QUEST_MANAGER_ENABLED);
    await GM.setValue(STORAGE_KEYS.BATTLE_GUARD_ENABLED, DEFAULT_CONFIG.BATTLE_GUARD_ENABLED);
    await GM.setValue(STORAGE_KEYS.QUALITY_TOOLBAR_ENABLED, DEFAULT_CONFIG.QUALITY_TOOLBAR_ENABLED);
    await GM.setValue(STORAGE_KEYS.TAVERN_EXPERT_ENABLED, DEFAULT_CONFIG.TAVERN_EXPERT_ENABLED);
    await GM.setValue(STORAGE_KEYS.CRAFT_PANEL_ENABLED, DEFAULT_CONFIG.CRAFT_PANEL_ENABLED);
    await GM.setValue(STORAGE_KEYS.SKILL_ALLOCATION_ENABLED, DEFAULT_CONFIG.SKILL_ALLOCATION_ENABLED);

    logger.setMinLevel(DEFAULT_CONFIG.LOG_LEVEL);
    taskQueue.setBatchSize(DEFAULT_CONFIG.QUEST_BATCH_SIZE);
    taskQueue.setInterval(DEFAULT_CONFIG.TASK_INTERVAL);
    taskQueue.setBatchDelay(DEFAULT_CONFIG.BATCH_DELAY);

    if (resourceMonitor) {
      resourceMonitor.setEnabled(DEFAULT_CONFIG.RESOURCE_MONITOR_ENABLED);
      resourceMonitor.setAutoBuyEnabled(DEFAULT_CONFIG.AUTO_BUY_BASE_RESOURCES);
      await resourceMonitor.setMonitoredResources({});
    }

    if (satietyManager) {
      await satietyManager.setEnabled(DEFAULT_CONFIG.AUTO_USE_BERRY_ENABLED);
    }

    toast.success('所有设置已清空');
    analytics.track('设置', '清空设置', '成功');
    onClose();
    location.reload();
  };

  return (
    <>
      <Card title="🎯 功能开关">
        <Row>
          <Checkbox checked={craftPanelEnabled} onChange={setCraftPanelEnabled} label="物品制造" />
        </Row>
        <Row>
          <Checkbox checked={skillAllocationEnabled} onChange={setSkillAllocationEnabled} label="技能加点" />
        </Row>
        <Row>
          <Checkbox checked={tavernExpertEnabled} onChange={setTavernExpertEnabled} label="酒馆专家" />
        </Row>
        <Row>
          <Checkbox checked={battleGuardEnabled} onChange={setBattleGuardEnabled} label="战斗防护" />
        </Row>
        <Row>
          <Checkbox checked={qualityToolbarEnabled} onChange={setQualityToolbarEnabled} label="缩小生活质量图标" />
        </Row>
      </Card>

      <Card title="📜 任务管理配置">
        <Row>
          <Checkbox checked={questManagerEnabled} onChange={setQuestManagerEnabled} label="启用任务管理器" />
        </Row>
        <Row label="匹配关键字">
          <Input
            type="text"
            value={questPrefix}
            onChange={setQuestPrefix}
            placeholder="逗号分隔，例如：采集,制作,探索"
          />
        </Row>
        <Row label="排除关键字">
          <Input
            type="text"
            value={questKeywords}
            onChange={setQuestKeywords}
            placeholder="逗号分隔，例如：云絮,彩虹,种植"
          />
        </Row>
      </Card>

      <Card title="🎯 任务队列配置">
        <Row label="批次大小">
          <Input
            type="number"
            value={batchSize}
            onChange={(v) => setBatchSize(parseInt(v) || 1)}
            min={1}
            max={100}
            step={1}
          />
        </Row>
        <Row label="任务间隔(ms)">
          <Input
            type="number"
            value={taskInterval}
            onChange={(v) => setTaskInterval(parseInt(v) || 100)}
            min={100}
            max={10000}
            step={100}
          />
        </Row>
        <Row label="批次间隔(ms)">
          <Input
            type="number"
            value={batchDelay}
            onChange={(v) => setBatchDelay(parseInt(v) || 1000)}
            min={1000}
            max={60000}
            step={1000}
          />
        </Row>
      </Card>

      <Card title="🍓 饱食度管理配置">
        <Row>
          <Checkbox checked={autoBerryEnabled} onChange={setAutoBerryEnabled} label="启用饱食度管理" />
        </Row>
        <Row label="食物类型">
          <Select
            value={berryFoodType}
            onChange={(v) => setBerryFoodType(v as FoodType)}
            options={[
              { value: 'berry', label: '浆果' },
              { value: 'fish', label: '鱼' },
              { value: 'luxuryCatFood', label: '豪华猫粮' },
            ]}
          />
        </Row>
        <Row label="饱食度阈值">
          <Input
            type="number"
            value={berryThreshold}
            onChange={(v) => setBerryThreshold(parseInt(v) || 0)}
            min={0}
            step={100000}
          />
        </Row>
        <Row label="目标饱食度">
          <Input
            type="number"
            value={berryTarget}
            onChange={(v) => setBerryTarget(parseInt(v) || 0)}
            min={0}
            step={100000}
          />
        </Row>
      </Card>

      <Card title="📊 资源监控配置">
        <Row>
          <Checkbox checked={monitorEnabled} onChange={setMonitorEnabled} label="启用资源监控" />
        </Row>
        <Row>
          <Checkbox checked={autoBuyEnabled} onChange={setAutoBuyEnabled} label="自动购买基础资源" />
        </Row>

        {resourceCategories.map((category, categoryIndex) => (
          <Section key={categoryIndex} title={category.name}>
            {Object.entries(category.items).map(([id, config]) => {
              const threshold = typeof config === 'number' ? config : config.threshold;
              const type = typeof config === 'number' ? 'insufficient' : config.type;

              return (
                <div
                  key={id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '6px 10px',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '5px',
                    marginBottom: '5px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ flex: 1, fontSize: '11px', color: '#333' }}>{getResourceName(id)}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Select
                      value={type}
                      onChange={(v) => updateResourceConfig(id, 'type', v)}
                      options={[
                        { value: 'insufficient', label: '不足' },
                        { value: 'excess', label: '超过' },
                      ]}
                      style={{ width: '80px', padding: '6px 4px', fontSize: '12px' }}
                    />
                    <Input
                      type="number"
                      value={threshold}
                      onChange={(v) => updateResourceConfig(id, 'threshold', parseInt(v) || 0)}
                      min={0}
                      step={100}
                      style={{ width: '100px', padding: '4px 6px', fontSize: '11px', textAlign: 'center' }}
                    />
                  </div>
                </div>
              );
            })}
          </Section>
        ))}
      </Card>

      <Card title="🔧 调试配置">
        <Row label="日志级别">
          <Select
            value={logLevel}
            onChange={(v) => setLogLevel(v as typeof logLevel)}
            options={[
              { value: 'none', label: '不显示日志' },
              { value: 'error', label: '错误' },
              { value: 'warn', label: '警告' },
              { value: 'success', label: '成功' },
              { value: 'info', label: '信息' },
              { value: 'debug', label: '调试' },
            ]}
          />
        </Row>
      </Card>

      <div
        style={{
          position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px 0',
          background: '#ffffff',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          marginTop: '20px',
          display: 'flex',
          gap: '8px',
        }}
      >
        <Button variant="danger" onClick={handleClearAll} style={{ flex: 1 }}>
          清空所有设置
        </Button>
        <Button onClick={handleSave} style={{ flex: 1 }}>
          保存设置
        </Button>
      </div>
    </>
  );
}

/**
 * 设置面板类
 */
class SettingsPanel {
  private container: HTMLDivElement | null = null;
  private resourceMonitor: typeof resourceMonitor | null = null;
  private satietyManager: typeof satietyManager | null = null;
  private isOpen = false;

  setResourceMonitor(monitor: typeof resourceMonitor): void {
    this.resourceMonitor = monitor;
  }

  setSatietyManager(manager: typeof satietyManager): void {
    this.satietyManager = manager;
  }

  show(): void {
    if (this.isOpen) return;
    this.isOpen = true;
    analytics.track('界面', '打开面板', '设置面板');

    if (!this.container) {
      this.container = document.createElement('div');
      document.body.appendChild(this.container);
    }

    render(
      <Modal isOpen={true} onClose={() => this.hide()} title="⚙️ 设置" contentStyle={{ paddingBottom: 0 }}>
        <SettingsPanelContent
          onClose={() => this.hide()}
          resourceMonitor={this.resourceMonitor}
          satietyManager={this.satietyManager}
        />
      </Modal>,
      this.container,
    );
  }

  hide(): void {
    if (!this.isOpen) return;
    this.isOpen = false;

    if (this.container) {
      render(null, this.container);
    }
  }
}

export const settingsPanel = new SettingsPanel();
