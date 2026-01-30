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
import { type FoodType, QUEST_TASK_TYPES } from '@/config/defaults';
import { appConfig } from '@/config/gm-settings';
import { toast, eventBus, EVENTS } from '@/core';
import { Modal, Card, Row, Input, Checkbox, Button, Select, Section } from './components';
import { getResourceDetail } from '@/utils';

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
  const [settings, setSettings] = useState<Record<string, any> | null>(null);
  const [resourceCategories, setResourceCategories] = useState<ResourceCategory[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => (prev ? { ...prev, [key]: value } : null));
  };

  // 加载初始数据
  useEffect(() => {
    const loadSettings = async () => {
      const loadedSettings = await Promise.all(
        Object.values(appConfig).map(async (setting) => [setting.key, await setting.get()] as const),
      );
      setSettings(Object.fromEntries(loadedSettings));

      if (resourceMonitor) {
        setResourceCategories(resourceMonitor.getMonitoredResourcesByCategory());
      }
    };

    void loadSettings();
  }, [resourceMonitor, satietyManager]);

  // 加载中显示
  if (!settings) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>加载中...</div>;
  }

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
    await Promise.all(Object.values(appConfig).map((setting) => setting.set(settings[setting.key] as never)));

    if (resourceMonitor) {
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

    toast.success('设置已保存');
    eventBus.emit(EVENTS.SETTINGS_UPDATED);
    onClose();
  };

  const handleClearAll = async () => {
    if (!confirm('确定要清空所有设置吗？此操作不可恢复！')) return;

    await Promise.all(Object.values(appConfig).map((setting) => setting.reset()));

    if (resourceMonitor) {
      await resourceMonitor.setMonitoredResources({});
    }

    toast.success('所有设置已清空');
    eventBus.emit(EVENTS.SETTINGS_UPDATED);
    onClose();
    location.reload();
  };

  return (
    <>
      <Card title="🎯 功能开关">
        <Row>
          <Checkbox
            checked={settings[appConfig.CRAFT_PANEL_ENABLED.key]}
            onChange={(v) => updateSetting(appConfig.CRAFT_PANEL_ENABLED.key, v)}
            label="物品制造 - 批量制造物品，自动计算依赖"
          />
        </Row>
        <Row>
          <Checkbox
            checked={settings[appConfig.SKILL_ALLOCATION_ENABLED.key]}
            onChange={(v) => updateSetting(appConfig.SKILL_ALLOCATION_ENABLED.key, v)}
            label="技能加点 - 快速分配技能点"
          />
        </Row>
        <Row>
          <Checkbox
            checked={settings[appConfig.TAVERN_EXPERT_ENABLED.key]}
            onChange={(v) => updateSetting(appConfig.TAVERN_EXPERT_ENABLED.key, v)}
            label="酒馆专家 - 自动刷新酒馆任务"
          />
        </Row>
        <Row>
          <Checkbox
            checked={settings[appConfig.QUICK_ALCHEMY_ENABLED.key]}
            onChange={(v) => updateSetting(appConfig.QUICK_ALCHEMY_ENABLED.key, v)}
            label="快速炼金 - 快速炼制战利品精华"
          />
        </Row>
        <Row>
          <Checkbox
            checked={settings[appConfig.BATTLE_GUARD_ENABLED.key]}
            onChange={(v) => updateSetting(appConfig.BATTLE_GUARD_ENABLED.key, v)}
            label="战斗防护 - 自动禁用战斗功能"
          />
        </Row>
        <Row>
          <Checkbox
            checked={settings[appConfig.QUALITY_TOOLBAR_ENABLED.key]}
            onChange={(v) => updateSetting(appConfig.QUALITY_TOOLBAR_ENABLED.key, v)}
            label="缩小生活质量图标 - 优化界面显示"
          />
        </Row>
      </Card>

      <Card title="📜 任务管理配置">
        <Row>
          <Checkbox
            checked={settings[appConfig.QUEST_MANAGER_ENABLED.key]}
            onChange={(v) => updateSetting(appConfig.QUEST_MANAGER_ENABLED.key, v)}
            label="启用任务管理器"
          />
        </Row>
        <Row label="金币限制">
          <Input
            type="number"
            value={settings[appConfig.QUEST_GOLD_LIMIT.key]}
            onChange={(v) =>
              updateSetting(appConfig.QUEST_GOLD_LIMIT.key, Number(v) || appConfig.QUEST_GOLD_LIMIT.defaultValue)
            }
            min={0}
            step={250}
          />
        </Row>

        <div style={{ marginTop: '15px' }}>
          <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>选择要保留的任务类型:</div>
          {Object.entries(QUEST_TASK_TYPES).map(([category, tasks]) => (
            <div
              key={category}
              style={{ marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 12px',
                  background: '#f5f5f5',
                  cursor: 'pointer',
                  gap: '8px',
                }}
                onClick={() =>
                  setExpandedCategories((prev) => ({
                    ...prev,
                    [category]: !prev[category],
                  }))
                }
              >
                <Checkbox
                  checked={tasks.every((t) => settings[appConfig.QUEST_SELECTED_TASKS.key]?.[category]?.[t])}
                  onChange={(checked) => {
                    updateSetting(appConfig.QUEST_SELECTED_TASKS.key, {
                      ...settings[appConfig.QUEST_SELECTED_TASKS.key],
                      [category]: tasks.reduce((acc, t) => ({ ...acc, [t]: checked }), {}),
                    });
                  }}
                  onClick={(e) => e.stopPropagation()}
                  style={{ margin: 0 }}
                />
                <span style={{ flex: 1 }}>{category}</span>
                <span style={{ fontSize: '12px', color: '#666' }}>{expandedCategories[category] ? '▼' : '▶'}</span>
              </div>

              {expandedCategories[category] && (
                <div style={{ padding: '8px 12px 8px 32px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {tasks.map((task) => (
                    <Checkbox
                      key={task}
                      checked={settings[appConfig.QUEST_SELECTED_TASKS.key]?.[category]?.[task] || false}
                      onChange={(checked) => {
                        updateSetting(appConfig.QUEST_SELECTED_TASKS.key, {
                          ...settings[appConfig.QUEST_SELECTED_TASKS.key],
                          [category]: {
                            ...settings[appConfig.QUEST_SELECTED_TASKS.key]?.[category],
                            [task]: checked,
                          },
                        });
                      }}
                      label={task}
                      style={{ margin: 0 }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card title="🎯 任务队列配置">
        <Row label="批次大小">
          <Input
            type="number"
            value={settings[appConfig.QUEST_BATCH_SIZE.key]}
            onChange={(v) => updateSetting(appConfig.QUEST_BATCH_SIZE.key, parseInt(v) || 1)}
            min={1}
            max={100}
            step={1}
          />
        </Row>
        <Row label="任务间隔(ms)">
          <Input
            type="number"
            value={settings[appConfig.TASK_INTERVAL.key]}
            onChange={(v) => updateSetting(appConfig.TASK_INTERVAL.key, parseInt(v) || 100)}
            min={100}
            max={10000}
            step={100}
          />
        </Row>
        <Row label="批次间隔(ms)">
          <Input
            type="number"
            value={settings[appConfig.BATCH_DELAY.key]}
            onChange={(v) => updateSetting(appConfig.BATCH_DELAY.key, parseInt(v) || 1000)}
            min={1000}
            max={60000}
            step={1000}
          />
        </Row>
      </Card>

      <Card title="🎒 饱食度管理配置">
        <Row>
          <Checkbox
            checked={settings[appConfig.AUTO_USE_BERRY_ENABLED.key]}
            onChange={(v) => updateSetting(appConfig.AUTO_USE_BERRY_ENABLED.key, v)}
            label="启用饱食度管理"
          />
        </Row>
        <Row label="食物类型">
          <Select
            value={settings[appConfig.AUTO_USE_BERRY_FOOD_TYPE.key]}
            onChange={(v) => updateSetting(appConfig.AUTO_USE_BERRY_FOOD_TYPE.key, v as FoodType)}
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
            value={settings[appConfig.AUTO_USE_BERRY_THRESHOLD.key]}
            onChange={(v) => updateSetting(appConfig.AUTO_USE_BERRY_THRESHOLD.key, parseInt(v) || 0)}
            min={0}
            step={100000}
          />
        </Row>
        <Row label="目标饱食度">
          <Input
            type="number"
            value={settings[appConfig.AUTO_USE_BERRY_TARGET.key]}
            onChange={(v) => updateSetting(appConfig.AUTO_USE_BERRY_TARGET.key, parseInt(v) || 0)}
            min={0}
            step={100000}
          />
        </Row>
      </Card>

      <Card title="📊 资源监控配置">
        <Row>
          <Checkbox
            checked={settings[appConfig.RESOURCE_MONITOR_ENABLED.key]}
            onChange={(v) => updateSetting(appConfig.RESOURCE_MONITOR_ENABLED.key, v)}
            label="启用资源监控"
          />
        </Row>
        <Row>
          <Checkbox
            checked={settings[appConfig.AUTO_BUY_BASE_RESOURCES.key]}
            onChange={(v) => updateSetting(appConfig.AUTO_BUY_BASE_RESOURCES.key, v)}
            label="自动购买基础资源"
          />
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
                  <span style={{ flex: 1, fontSize: '11px', color: '#333' }}>{getResourceDetail(id)?.name}</span>
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
            value={settings[appConfig.LOG_LEVEL.key]}
            onChange={(v) => updateSetting(appConfig.LOG_LEVEL.key, v)}
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
