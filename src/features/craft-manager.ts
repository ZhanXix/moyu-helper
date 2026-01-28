/**
 * 制造管理器
 * 基于配置自动计算依赖并执行制造任务
 */

import { DEFAULT_CRAFT_ITEMS } from '@/config/craft-items';
import { logger } from '@/core/logger';
import { toast } from '@/core/toast';
import { ws } from '@/core/websocket';
import { dataCache } from '@/core/data-cache';
import type { CraftItem, CraftItemCategory } from '@/types';
import { analytics } from '@/utils';

interface CraftStep {
  name: string;
  actionId: string;
  count: number;
}

class CraftManager {
  private categories = DEFAULT_CRAFT_ITEMS;
  private running = false;
  private progressToast: any = null;

  getCraftCategories(): CraftItemCategory[] {
    return this.categories;
  }

  getCraftItems(): CraftItem[] {
    return this.categories.flatMap((category) => category.items);
  }

  getDisplayName(name: string): string {
    const result = name.replace(/^(制作|酿造|缝制|熬制|烹饪|种植)/, '');
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

  private buildPlan(actionId: string, targetCount: number): CraftStep[] {
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

  private async optimizePlan(plan: CraftStep[], targetActionId: string): Promise<CraftStep[]> {
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

  async craftWithDependencies(actionId: string, count: number): Promise<void> {
    if (this.running) {
      toast.warning('制造任务进行中');
      return;
    }

    this.running = true;

    try {
      toast.info('正在计算制造计划...');
      const plan = this.buildPlan(actionId, count);
      if (plan.length === 0) return;

      const optimized = await this.optimizePlan(plan, actionId);
      if (optimized.length === 0) {
        toast.info('无需制造');
        return;
      }

      // 删除所有现有任务
      let actionQueue = await dataCache.getAsync('actionQueue');
      if (actionQueue.length > 0) {
        this.progressToast = toast.progress(`清空任务队列 [0/${actionQueue.length}]`);
        for (let i = actionQueue.length - 1; i >= 0; i--) {
          const expectedLength = actionQueue.length - 1;
          this.progressToast?.update(`清空任务队列 [${actionQueue.length - i}/${actionQueue.length}]`);
          await ws.sendAndWaitEvent(
            'removeTaskFromQueue',
            i,
            'actionQueueUpdated',
            (queue: any[]) => queue.length === expectedLength,
          );
          actionQueue = await dataCache.getAsync('actionQueue');
        }
      } else {
        this.progressToast = toast.progress('准备制造...');
      }

      for (let i = 0; i < optimized.length; i++) {
        const step = optimized[i];
        this.progressToast?.update(`[${i + 1}/${optimized.length}] ${step.name} ×${step.count}`);

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

      // 添加默认任务
      this.progressToast?.update('添加默认任务...');
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

      this.progressToast?.hide();
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
      if (plan.length === 0) return;

      const optimized = await this.optimizePlan(plan, actionId);
      if (optimized.length === 0) {
        toast.info(`🐱 ${kittyName} 无需制造`);
        return;
      }

      // 最多只添加2个任务
      const tasks = optimized.slice(0, 2);
      this.progressToast = toast.progress(`🐱 ${kittyName} 准备制造...`);

      if (clearTasks) {
        const data = await ws.sendAndListen('kitty:getAllTask', { kittyUuid });
        const existingTasks = data.payload.data.taskQueue;

        for (let i = existingTasks.length - 1; i >= 0; i--) {
          await ws.sendAndListen('kitty:removeTask', { kittyUuid, index: i });
        }
      }

      // 添加制造任务
      for (let i = 0; i < tasks.length; i++) {
        const step = tasks[i];
        this.progressToast?.update(`🐱 ${kittyName} [${i + 1}/${tasks.length}] ${step.name} ×${step.count}`);

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

      // 添加默认任务（作为第三个任务）
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
