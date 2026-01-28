/**
 * 物品制造面板组件 - Preact 重构版
 *
 * 功能说明：
 * - 提供物品选择和数量输入
 * - 实时预览依赖制造计划
 * - 触发自动制造流程
 */

import { render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { craftManager } from '@/features/craft-manager';
import { dataCache } from '@/core';
import { Modal, Card, FormGroup, Select, Input, Checkbox, Button, Row } from './components';
import { analytics } from '@/utils';

interface CraftPanelProps {
  onClose: () => void;
}

function CraftPanelContent({ onClose }: CraftPanelProps) {
  const [selectedItem, setSelectedItem] = useState('');
  const [count, setCount] = useState(1);
  const [clearTasks, setClearTasks] = useState(true);
  const [preview, setPreview] = useState('请选择物品');
  const [kitties, setKitties] = useState<any[]>([]);
  const [playerDefaultTasks, setPlayerDefaultTasks] = useState<string[]>(['reading', 'cutBamboo']);
  const [kittyDefaultTasks, setKittyDefaultTasks] = useState<Record<number, string>>({
    0: 'exploreNewArea',
    1: 'pearlCultivation',
  });

  // 获取物品选项（分组结构）
  const itemOptions = craftManager.getCraftCategories().map((category) => ({
    label: category.label,
    value: category.value,
    options: category.items.map((item) => ({
      value: item.actionId,
      label: item.label,
    })),
  }));

  // 加载初始数据
  useEffect(() => {
    const loadData = async () => {
      try {
        const userInfo = await dataCache.getAsync('userInfo');
        setKitties(userInfo.kittyInfo || []);
      } catch {
        setKitties([]);
      }

      const savedPlayerTasks = await GM.getValue('player_default_tasks', ['reading', 'cutBamboo']);
      const savedKittyTasks = await GM.getValue('kitty_default_tasks', {
        0: 'exploreNewArea',
        1: 'pearlCultivation',
      });

      setPlayerDefaultTasks(savedPlayerTasks);
      setKittyDefaultTasks(savedKittyTasks);
    };

    void loadData();
  }, []);

  // 更新预览
  useEffect(() => {
    const updatePreview = async () => {
      if (!selectedItem) {
        setPreview('请选择物品');
        return;
      }

      const plan = (craftManager as any).buildPlan(selectedItem, count);
      if (plan.length === 0) {
        setPreview('⚠️ 无法计算制造计划');
        return;
      }

      const optimized = await (craftManager as any).optimizePlan(plan, selectedItem);
      if (optimized.length === 0) {
        setPreview('✅ 库存充足，无需制造');
        return;
      }

      const stepsHTML = optimized
        .map((step: any, index: number) => `${index + 1}. ${step.name} ×${step.count}`)
        .join('\n');
      setPreview(stepsHTML);
    };

    void updatePreview();
  }, [selectedItem, count]);

  const handleQuickAdd = (value: number) => {
    setCount((prev) => prev + value);
  };

  const handleCraft = async () => {
    if (!selectedItem) return;
    onClose();
    analytics.track('界面', '打开制造面板', '开始制造');
    await craftManager.craftWithDependencies(selectedItem, count);
  };

  const handleKittyCraft = async (kittyUuid: string, kittyName: string, kittyIndex: number) => {
    if (!selectedItem) return;
    onClose();
    analytics.track('界面', '打开制造面板', `猫咪制造-${kittyName}`);
    await craftManager.craftWithKitty(kittyUuid, kittyName, kittyIndex, selectedItem, count, clearTasks);
  };

  const handlePlayerDefaultTaskChange = async (index: number, value: string) => {
    const newTasks = [...playerDefaultTasks];
    newTasks[index] = value;
    setPlayerDefaultTasks(newTasks);
    await GM.setValue('player_default_tasks', newTasks);
  };

  const handleKittyDefaultTaskChange = async (kittyIndex: number, actionId: string) => {
    const newTasks = { ...kittyDefaultTasks };
    if (actionId) {
      newTasks[kittyIndex] = actionId;
    } else {
      delete newTasks[kittyIndex];
    }
    setKittyDefaultTasks(newTasks);
    await GM.setValue('kitty_default_tasks', newTasks);
  };

  // 获取行动选项（分组结构）
  const actionOptions = craftManager.getCraftCategories().map((category) => ({
    label: category.label,
    value: category.value,
    options: category.items.map((item) => ({
      value: item.actionId,
      label: item.label,
    })),
  }));

  return (
    <>
      <FormGroup label="选择物品">
        <Select value={selectedItem} onChange={setSelectedItem} options={itemOptions} placeholder="-- 请选择物品 --" />
      </FormGroup>

      <FormGroup label="制造数量">
        <Input type="number" value={count} onChange={(v) => setCount(parseInt(v) || 1)} min={1} step={1} />
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          {[10, 200, 1000, 10000].map((value) => (
            <Button
              key={value}
              variant="secondary"
              onClick={() => handleQuickAdd(value)}
              style={{ flex: 1, padding: '6px 12px', fontSize: '12px' }}
            >
              +{value}
            </Button>
          ))}
        </div>
      </FormGroup>

      <FormGroup>
        <Checkbox checked={clearTasks} onChange={setClearTasks} label="清空猫咪之前的任务" />
      </FormGroup>

      <Card title="制造计划预览" style={{ minHeight: '60px' }}>
        <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{preview}</div>
      </Card>

      <Button onClick={handleCraft}>开始制造</Button>

      {kitties.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          {kitties.map((kitty, index) => (
            <Button
              key={kitty.uuid}
              variant="kitty"
              onClick={() => handleKittyCraft(kitty.uuid, kitty.name || `猫咪${index + 1}`, index)}
              style={{ flex: 1, padding: '12px' }}
            >
              🐱 {kitty.name || `猫咪${index + 1}`}
            </Button>
          ))}
        </div>
      )}

      <Card title="👤 当前角色默认任务" style={{ marginTop: '16px' }}>
        <Row label="默认任务1:">
          <Select
            value={playerDefaultTasks[0] || ''}
            onChange={(v) => handlePlayerDefaultTaskChange(0, v)}
            options={[{ value: '', label: '无' }, ...actionOptions]}
            style={{ flex: 1 }}
          />
        </Row>
        <Row label="默认任务2:">
          <Select
            value={playerDefaultTasks[1] || ''}
            onChange={(v) => handlePlayerDefaultTaskChange(1, v)}
            options={[{ value: '', label: '无' }, ...actionOptions]}
            style={{ flex: 1 }}
          />
        </Row>
      </Card>

      {kitties.length > 0 && (
        <Card title="🐱 猫咪默认任务配置" style={{ marginTop: '0' }}>
          {kitties.map((kitty, index) => {
            const kittyName = kitty.name || `猫咪${index + 1}`;
            const defaultTask = kittyDefaultTasks[index] || '';

            return (
              <Row key={kitty.uuid} label={`${kittyName}:`}>
                <Select
                  value={defaultTask}
                  onChange={(v) => handleKittyDefaultTaskChange(index, v)}
                  options={[{ value: '', label: '无' }, ...actionOptions]}
                  style={{ flex: 1 }}
                />
              </Row>
            );
          })}
        </Card>
      )}
    </>
  );
}

/**
 * 物品制造面板类
 */
export class CraftPanel {
  private container: HTMLDivElement | null = null;
  private isOpen = false;

  show(): void {
    if (this.isOpen) return;
    this.isOpen = true;
    analytics.track('界面', '打开面板', '制造面板');

    if (!this.container) {
      this.container = document.createElement('div');
      document.body.appendChild(this.container);
    }

    render(
      <Modal isOpen={true} onClose={() => this.hide()} title="🔨 物品制造">
        <CraftPanelContent onClose={() => this.hide()} />
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
