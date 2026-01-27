/**
 * 酒馆专家管理器
 * 快速启用/禁用强化专家猫猫
 */

import { logger, toast, ws, dataCache } from '@/core';
import type { TavernExpert } from '@/types/game-data';

class TavernExpertManager {
  private isLoading = false;

  async toggle(): Promise<void> {
    if (this.isLoading) {
      toast.warning('操作进行中，请稍候...');
      return;
    }

    this.isLoading = true;

    try {
      const tavern: TavernExpert[] = await dataCache.getAsync('tavern');
      const enhanceExpert = tavern.find((expert) => expert.type === 'enhanceExpert');

      if (!enhanceExpert) {
        await ws.sendAndListen('tavern:hireExpert', { catId: 'enhanceExpert', hours: 1 });
        toast.success('✅ 强化专家已启用');
      } else if (enhanceExpert.state === 'WORKING') {
        await ws.sendAndListen('tavern:pause', { catId: 'enhanceExpert' });
        toast.success('✅ 强化专家已暂停');
      } else {
        await ws.sendAndListen('tavern:resume', { catId: 'enhanceExpert' });
        toast.success('✅ 强化专家已恢复');
      }

      const res = await ws.sendAndListen('tavern:getMyExperts');
      console.log('🚀 ~ TavernExpertManager ~ toggle ~ res :', res);
    } catch (error) {
      logger.error('切换强化专家状态失败', error);
      toast.error('操作失败，请稍后重试');
    } finally {
      this.isLoading = false;
    }
  }

  getButtonText(): string {
    try {
      if (!dataCache.get('tavern')) return '🐱 强化专家';

      const tavern: TavernExpert[] = (dataCache as any).caches.tavern.data || [];
      const enhanceExpert = tavern.find((expert) => expert.type === 'enhanceExpert');

      if (!enhanceExpert) return '🐱 启用强化专家';
      if (enhanceExpert.state === 'WORKING') return '🐱 暂停强化专家';
      return '🐱 恢复强化专家';
    } catch {
      return '🐱 强化专家';
    }
  }
}

export const tavernExpertManager = new TavernExpertManager();
