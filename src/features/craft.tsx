/**
 * 制造功能模块
 * 包含制造管理器和制造面板
 */

import { render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import DEFAULT_CRAFT_ITEMS from '@/config/craft-items.json';
import { logger, toast, ws, dataCache } from '@/core';
import type { CraftItem, CraftItemCategory } from '@/types';
import { Modal, Card, FormGroup, Select, Input, Checkbox, Button, Row } from '@/ui/components';
import { analytics } from '@/utils';

interface CraftStep {
  name: string;
  actionId: string;
  count: number;
}

// ==================== 制造管理器 ====================

class CraftManager {
  private categories = DEFAULT_CRAFT_ITEMS;
  private running = false;
  private progressToast: any = null;

  private ensureProgressToast(message: string): any {
    if (!this.progressToast) {
      this.progressToast = toast.progress(message);
    } else {
      this.progressToast.update(message);
    }
    return this.progressToast;
  }

  getCraftCategories(): CraftItemCategory[] {
    return this.categories;
  }

  getCraftItems(): CraftItem[] {
    return this.categories.flatMap((category) => category.items);
  }

  getDisplayName(name: string): string {
    const result = name.replace(/^(制作|酿造|缝制|熬制|烹饪|种植|锻造|熔炼|开采|烧制)/, '');
    return result || name;
  }

  calculateCraftPlan(actionId: string, targetCount: number): Array<{ itemName: string; count: number }> {
    const plan = this.buildPlan(actionId, targetCount);
    return plan.map((step) => ({ itemName: step.name, count: step.count }));
  }

  private findByActionId(actionId: string): CraftItem | undefined {
    for (const category of this.categories) {
      const item = category.items.find((item) => item.actionId === actionId);
      if (item) return item;
    }
    return undefined;
  }

  private findByRewardId(rewardId: string): CraftItem | undefined {
    for (const category of this.categories) {
      const item = category.items.find((item) => item.rewards.some((r) => r.itemId === rewardId));
      if (item) return item;
    }
    return undefined;
  }

  buildPlan(actionId: string, targetCount: number): CraftStep[] {
    const item = this.findByActionId(actionId);
    if (!item) {
      toast.error('未找到制造配方');
      return [];
    }

    const needs = new Map<string, number>();
    const plan: CraftStep[] = [];
    const visited = new Set<string>();

    const calculate = (id: string, count: number) => {
      if (visited.has(id)) return;
      visited.add(id);

      const current = this.findByActionId(id);
      if (!current) return;

      needs.set(id, (needs.get(id) || 0) + count);

      if (current.dependencies) {
        for (const dep of current.dependencies) {
          const producer = this.findByRewardId(dep.itemId);
          if (producer) {
            const reward = producer.rewards.find((r) => r.itemId === dep.itemId)!;
            const times = Math.ceil((dep.count * count) / reward.count);
            calculate(producer.actionId, times);
          }
        }
      }
    };

    const sort = (id: string) => {
      const current = this.findByActionId(id);
      if (!current || plan.some((p) => p.actionId === id)) return;

      if (current.dependencies) {
        for (const dep of current.dependencies) {
          const producer = this.findByRewardId(dep.itemId);
          if (producer) sort(producer.actionId);
        }
      }

      const count = needs.get(id) || 0;
      if (count > 0) {
        plan.push({ name: current.label, actionId: id, count });
      }
    };

    calculate(actionId, targetCount);
    visited.clear();
    sort(actionId);

    return plan;
  }

  async optimizePlan(plan: CraftStep[], targetActionId: string): Promise<CraftStep[]> {
    try {
      const inventory = await dataCache.getAsync('inventory', true);
      const optimized: CraftStep[] = [];
      const resourceNeeds = new Map<string, number>();

      for (let i = plan.length - 1; i >= 0; i--) {
        const step = plan[i];
        const item = this.findByActionId(step.actionId);
        if (!item) continue;

        const mainReward = item.rewards[0];
        if (!mainReward) continue;

        let count = step.count;

        if (step.actionId !== targetActionId) {
          const stock = inventory[mainReward.itemId]?.count || 0;
          const need = resourceNeeds.get(mainReward.itemId) || 0;
          const netNeed = Math.max(0, need - stock);
          count = Math.ceil(netNeed / mainReward.count);

          if (count <= 0) {
            logger.info(`跳过 ${step.name}（库存充足）`);
            continue;
          }
        }

        optimized.unshift({ ...step, count });

        if (item.dependencies) {
          for (const dep of item.dependencies) {
            resourceNeeds.set(dep.itemId, (resourceNeeds.get(dep.itemId) || 0) + dep.count * count);
          }
        }
      }

      return optimized;
    } catch {
      return plan;
    }
  }

  async clearPlayerTasks(): Promise<void> {
    let actionQueue = await dataCache.getAsync('actionQueue');
    if (actionQueue.length > 0) {
      const totalCount = actionQueue.length;
      this.ensureProgressToast(`正在清空任务 (0/${totalCount})`);
      for (let i = actionQueue.length - 1; i >= 0; i--) {
        const expectedLength = actionQueue.length - 1;
        this.progressToast.update(`正在清空任务 (${totalCount - i}/${totalCount})`);
        await ws.sendAndWaitEvent(
          'removeTaskFromQueue',
          i,
          'actionQueueUpdated',
          (queue: any[]) => queue.length === expectedLength,
        );
        actionQueue = await dataCache.getAsync('actionQueue');
      }
    }
  }

  async clearKittyTasks(kittyUuid: string, kittyName: string): Promise<void> {
    const data = await ws.sendAndListen('kitty:getAllTask', { kittyUuid });
    const existingTasks = data.payload.data.taskQueue;

    if (existingTasks.length > 0) {
      const totalCount = existingTasks.length;
      this.ensureProgressToast(`正在清空 ${kittyName} 的任务 (0/${totalCount})`);
      for (let i = existingTasks.length - 1; i >= 0; i--) {
        this.progressToast.update(`正在清空 ${kittyName} 的任务 (${totalCount - i}/${totalCount})`);
        await ws.sendAndListen('kitty:removeTask', { kittyUuid, index: i });
      }
    }
  }

  async craftWithDependencies(actionId: string, count: number, clearTasks = true): Promise<void> {
    if (this.running) {
      toast.warning('制造任务进行中');
      return;
    }

    this.running = true;

    try {
      toast.info('正在计算制造计划...');
      const plan = this.buildPlan(actionId, count);
      if (plan.length === 0) {
        this.progressToast?.hide();
        return;
      }

      const optimized = await this.optimizePlan(plan, actionId);
      if (optimized.length === 0) {
        toast.info('无需制造');
        this.progressToast?.hide();
        return;
      }

      if (clearTasks) {
        await this.clearPlayerTasks();
      }

      this.ensureProgressToast('正在添加制造任务...');

      for (let i = 0; i < optimized.length; i++) {
        const step = optimized[i];
        this.progressToast.update(`正在添加 ${step.name} ×${step.count} (${i + 1}/${optimized.length})`);

        await ws.sendAndWaitEvent(
          'addTaskToQueue',
          {
            actionId: step.actionId,
            repeatCount: step.count,
            currentRepeat: 0,
            createTime: Date.now(),
          },
          'actionQueueUpdated',
          () => true,
        );
      }

      this.progressToast.update('正在添加默认任务...');
      const defaultTasks = await GM.getValue('player_default_tasks', ['reading', 'cutBamboo']);
      for (const taskId of defaultTasks) {
        if (taskId) {
          await ws.sendAndWaitEvent(
            'addTaskToQueue',
            {
              actionId: taskId,
              repeatCount: 999999,
              currentRepeat: 0,
              createTime: Date.now(),
            },
            'actionQueueUpdated',
            () => true,
          );
        }
      }

      this.progressToast.hide();
      toast.success(`已提交 ${optimized.length} 个制造任务`);
      analytics.track('制造', '玩家制造', `${optimized.length}个任务`);
    } catch (error) {
      logger.error('制造失败', error);
      toast.error('制造失败');
      this.progressToast?.hide();
    } finally {
      this.running = false;
    }
  }

  async craftWithKitty(
    kittyUuid: string,
    kittyName: string,
    kittyIndex: number,
    actionId: string,
    count: number,
    clearTasks = true,
  ): Promise<void> {
    if (this.running) {
      toast.warning('制造任务进行中');
      return;
    }

    this.running = true;

    try {
      const plan = this.buildPlan(actionId, count);
      if (plan.length === 0) {
        this.progressToast?.hide();
        return;
      }

      const optimized = await this.optimizePlan(plan, actionId);
      if (optimized.length === 0) {
        toast.info(`🐱 ${kittyName} 无需制造`);
        this.progressToast?.hide();
        return;
      }

      const tasks = optimized.slice(0, 2);
      this.ensureProgressToast(`正在为 ${kittyName} 安排制造任务...`);

      if (clearTasks) {
        await this.clearKittyTasks(kittyUuid, kittyName);
      }

      for (let i = 0; i < tasks.length; i++) {
        const step = tasks[i];
        this.progressToast?.update(`正在为 ${kittyName} 添加 ${step.name} ×${step.count} (${i + 1}/${tasks.length})`);

        await ws.sendAndListen('kitty:addTask', {
          kittyUuid,
          task: {
            actionId: step.actionId,
            repeatCount: step.count,
            currentRepeat: 0,
            createTime: Date.now(),
          },
        });
      }

      const defaultTask = await this.getKittyDefaultTask(kittyIndex);
      let addedDefaultTask = false;
      if (defaultTask && tasks.length < 3) {
        await ws.sendAndListen('kitty:addTask', {
          kittyUuid,
          task: {
            actionId: defaultTask,
            repeatCount: 999999,
            currentRepeat: 0,
            createTime: Date.now(),
          },
        });
        addedDefaultTask = true;
      }

      this.progressToast?.hide();
      const taskCount = addedDefaultTask ? tasks.length + 1 : tasks.length;
      toast.success(`🐱 ${kittyName} 已提交 ${taskCount} 个任务`);
      analytics.track('制造', '猫咪制造', `${taskCount}个任务`);
    } catch (error) {
      logger.error(`🐱 ${kittyName} 制造失败`, error);
      toast.error('制造失败');
      this.progressToast?.hide();
    } finally {
      this.running = false;
    }
  }

  async getKittyDefaultTask(kittyIndex: number): Promise<string | null> {
    const defaultKittyTasks: Record<number, string> = { 0: 'exploreNewArea', 1: 'pearlCultivation' };
    const tasks = await GM.getValue('kitty_default_tasks', defaultKittyTasks);
    return tasks[kittyIndex] || null;
  }

  async setKittyDefaultTask(kittyIndex: number, actionId: string): Promise<void> {
    const tasks = await GM.getValue('kitty_default_tasks', {});
    tasks[kittyIndex] = actionId;
    await GM.setValue('kitty_default_tasks', tasks);
  }
}

export const craftManager = new CraftManager();

// ==================== 制造面板 ====================

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

  const itemOptions = craftManager.getCraftCategories().map((category) => ({
    label: category.label,
    value: category.value,
    options: category.items.map((item) => ({
      value: item.actionId,
      label: item.label,
    })),
  }));

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

  useEffect(() => {
    const updatePreview = async () => {
      if (!selectedItem) {
        setPreview('请选择物品');
        return;
      }

      const plan = craftManager.buildPlan(selectedItem, count);
      if (plan.length === 0) {
        setPreview('⚠️ 无法计算制造计划');
        return;
      }

      const optimized = await craftManager.optimizePlan(plan, selectedItem);
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
    if (!selectedItem) {
      toast.warning('请先选择要制造的物品');
      return;
    }
    onClose();
    analytics.track('界面', '打开制造面板', '开始制造');
    await craftManager.craftWithDependencies(selectedItem, count, clearTasks);
  };

  const handleKittyCraft = async (kittyUuid: string, kittyName: string, kittyIndex: number) => {
    if (!selectedItem) {
      toast.warning('请先选择要制造的物品');
      return;
    }
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

  const actionOptions = craftManager.getCraftCategories().map((category) => ({
    label: category.label,
    value: category.value,
    options: category.items.map((item) => ({
      value: item.actionId,
      label: item.label,
    })),
  }));

  const handleClearPlayerTasks = async () => {
    try {
      const actionQueue = await dataCache.getAsync('actionQueue');
      if (actionQueue.length === 0) {
        toast.info('任务队列已为空');
        return;
      }
      await craftManager.clearPlayerTasks();
      toast.success('✅ 已清空当前角色任务');
    } catch (error) {
      logger.error('清空当前角色任务失败', error);
      toast.error('清空任务失败');
    }
  };

  const handleClearKittyTasks = async (kittyUuid: string, kittyName: string) => {
    try {
      const data = await ws.sendAndListen('kitty:getAllTask', { kittyUuid });
      const existingTasks = data.payload.data.taskQueue;

      if (existingTasks.length === 0) {
        toast.info(`${kittyName} 任务队列已为空`);
        return;
      }

      await craftManager.clearKittyTasks(kittyUuid, kittyName);
      toast.success(`✅ 已清空 ${kittyName} 的任务`);
    } catch (error) {
      logger.error(`清空 ${kittyName} 任务失败`, error);
      toast.error('清空任务失败');
    }
  };

  return (
    <>
      <FormGroup label="选择物品">
        <Select value={selectedItem} onChange={setSelectedItem} options={itemOptions} placeholder="-- 请选择物品 --" />
      </FormGroup>

      <FormGroup label="制造数量">
        <Input type="number" value={count} onChange={(v) => setCount(parseInt(v) || 1)} min={1} step={1} />
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          {[10, 100, 1000, 10000].map((value) => (
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

      <Card title="🗑️ 清空任务" style={{ margin: '16px 0' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="secondary" onClick={handleClearPlayerTasks} style={{ flex: 1, padding: '8px 12px' }}>
            主角色
          </Button>
          {kitties.map((kitty, index) => (
            <Button
              key={kitty.uuid}
              variant="secondary"
              onClick={() => handleClearKittyTasks(kitty.uuid, kitty.name || `猫咪${index + 1}`)}
              style={{ flex: 1, padding: '8px 12px' }}
            >
              🐱 {kitty.name || `猫咪${index + 1}`}
            </Button>
          ))}
        </div>
      </Card>

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
