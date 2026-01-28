/**
 * 技能点分配管理器
 * 负责技能点的重置、分配等操作
 */

import { ws } from '@/core/websocket';
import { logger } from '@/core/logger';
import { sleep, analytics } from '@/utils';

interface SkillAllocationSummary {
  treeId: string;
  totalEarned: number;
  totalSpent: number;
  effectiveSpent: number;
  available: number;
  nodeLevels: Record<string, number>;
  canAllocate: Record<string, boolean>;
  unmetReasons: Record<string, string[]>;
}

interface AllocationResult {
  summary: {
    totalPoints: number;
    usedPoints: number;
    remainingPoints: number;
    totalEfficiency: string;
    expBoost: string;
    returnChance: string;
    extraRewardChance: string;
    luckyLevel: number;
  };
}

class SkillAllocationManager {
  private currentSummary: SkillAllocationSummary | null = null;

  /**
   * 重置技能点
   */
  async reset(treeId: string = 'life'): Promise<SkillAllocationSummary> {
    logger.info(`重置技能点: ${treeId}`);

    const response = await ws.sendAndListen('skillTree:reset', { treeId });

    logger.debug('重置响应:', response);

    if (response.payload?.data?.summary) {
      this.currentSummary = response.payload.data.summary;
      logger.success('技能点重置成功', this.currentSummary);
      return this.currentSummary;
    }

    throw new Error('重置失败: 未返回有效数据');
  }

  /**
   * 加点
   */
  async allocate(nodeId: string, treeId: string = 'life'): Promise<SkillAllocationSummary> {
    const response = await ws.sendAndListen('skillTree:allocate', { treeId, nodeId }, 'skillTree:summary:success');

    if (response.payload?.data?.summary) {
      this.currentSummary = response.payload.data.summary;
      return this.currentSummary;
    }

    throw new Error('加点失败: 未返回有效数据');
  }

  /**
   * 根据策略和当前状态选择下一个要加点的节点
   */
  private selectNextNode(
    summary: SkillAllocationSummary,
    strategy: string,
    specialty: string,
    luckyFirst: boolean,
  ): string | null {
    const { canAllocate, nodeLevels } = summary;
    const getLevel = (nodeId: string) => nodeLevels[nodeId] || 0;

    // 幸运优先：先加满幸运
    if (luckyFirst && canAllocate['l_lucky_basics'] && getLevel('l_lucky_basics') < 10) {
      return 'l_lucky_basics';
    }

    if (strategy === '效率优先') {
      if (canAllocate['l_efficiency_basics'] && getLevel('l_efficiency_basics') < 2) return 'l_efficiency_basics';
      if (canAllocate[`l_${specialty}_focus`] && getLevel(`l_${specialty}_focus`) < 7) return `l_${specialty}_focus`;
      if (canAllocate[`l_${specialty}_extraReward`]) return `l_${specialty}_extraReward`;
      if (canAllocate[`l_${specialty}_returnResource`]) return `l_${specialty}_returnResource`;
    } else if (strategy === '产出优先') {
      if (canAllocate['l_efficiency_basics'] && getLevel('l_efficiency_basics') < 2) return 'l_efficiency_basics';
      if (canAllocate[`l_${specialty}_focus`] && getLevel(`l_${specialty}_focus`) < 7) return `l_${specialty}_focus`;
      if (canAllocate[`l_${specialty}_extraReward`]) return `l_${specialty}_extraReward`;
    } else if (strategy === '材料优先') {
      if (canAllocate['l_efficiency_basics'] && getLevel('l_efficiency_basics') < 2) return 'l_efficiency_basics';
      if (canAllocate[`l_${specialty}_focus`] && getLevel(`l_${specialty}_focus`) < 7) return `l_${specialty}_focus`;
      if (canAllocate[`l_${specialty}_returnResource`]) return `l_${specialty}_returnResource`;
    } else if (strategy === '经验优先') {
      if (canAllocate['l_efficiency_basics'] && getLevel('l_efficiency_basics') < 2) return 'l_efficiency_basics';
      if (canAllocate[`l_${specialty}_focus`] && getLevel(`l_${specialty}_focus`) < 8) return `l_${specialty}_focus`;
      if (canAllocate[`l_${specialty}_extraExp`]) return `l_${specialty}_extraExp`;
    }

    // 尝试其他可加点的节点
    for (const [nodeId, canAdd] of Object.entries(canAllocate)) {
      if (canAdd && nodeId !== 'l_lucky_basics') return nodeId;
    }

    // 最后尝试幸运（非幸运优先模式）
    if (!luckyFirst && canAllocate['l_lucky_basics']) return 'l_lucky_basics';

    return null;
  }

  /**
   * 自动加点：重置后根据策略循环加点直到点数用完
   */
  async autoAllocate(
    strategy: string,
    specialty: string,
    luckyFirst: boolean = false,
    treeId: string = 'life',
    onProgress?: (remaining: number, total: number, nodeId: string) => void,
  ): Promise<void> {
    logger.info(`开始自动加点: 策略=${strategy}, 专精=${specialty}, 幸运优先=${luckyFirst}`);

    // 1. 重置技能点
    let summary = await this.reset(treeId);
    const totalPoints = summary.available;

    // 2. 循环加点直到点数为0
    while (summary.available > 0) {
      // 3. 根据策略选择下一个加点节点
      const nextNode = this.selectNextNode(summary, strategy, specialty, luckyFirst);

      if (!nextNode) {
        logger.warn('没有可加点的节点，停止加点');
        break;
      }

      logger.debug(`加点: ${nextNode}, 剩余点数: ${summary.available}`);

      // 4. 加点并等待返回新的summary
      summary = await this.allocate(nextNode, treeId);

      onProgress?.(summary.available, totalPoints, nextNode);

      await sleep(500);
    }

    logger.success(`自动加点完成: 总点数=${totalPoints}, 剩余=${summary.available}`);
    analytics.track('技能分配', '自动加点', `${strategy}-${specialty}`);
  }

  /**
   * 计算当前状态的效率统计
   */
  calculateEfficiencyStats(): AllocationResult | null {
    if (!this.currentSummary) return null;

    const { nodeLevels, totalEarned, available } = this.currentSummary;
    const usedPoints = totalEarned - available;

    // 查找专精类型
    let specialty = '';
    for (const nodeId of Object.keys(nodeLevels)) {
      const match = nodeId.match(/^l_(\w+)_focus$/);
      if (match && nodeLevels[nodeId] > 0) {
        specialty = match[1];
        break;
      }
    }

    const efficiency = this.calculateEfficiency(nodeLevels, specialty);

    return {
      summary: {
        totalPoints: totalEarned,
        usedPoints,
        remainingPoints: available,
        totalEfficiency: (efficiency.total * 100).toFixed(2) + '%',
        expBoost: (efficiency.exp * 100).toFixed(2) + '%',
        returnChance: (efficiency.return * 100).toFixed(2) + '%',
        extraRewardChance: (efficiency.reward * 100).toFixed(2) + '%',
        luckyLevel: nodeLevels['l_lucky_basics'] || 0,
      },
    };
  }

  private calculateEfficiency(allocation: Record<string, number>, specialty: string) {
    let total = 0;

    if (allocation['l_efficiency_basics']) {
      total += 0.03 + 0.003 * allocation['l_efficiency_basics'];
    }

    if (allocation[`l_${specialty}_focus`]) {
      total += 0.01 + 0.005 * allocation[`l_${specialty}_focus`];
    }

    const reward = allocation[`l_${specialty}_extraReward`]
      ? 0.008 + 0.002 * allocation[`l_${specialty}_extraReward`]
      : 0;

    const returnChance = allocation[`l_${specialty}_returnResource`]
      ? 0.008 + 0.002 * allocation[`l_${specialty}_returnResource`]
      : 0;

    const exp = allocation[`l_${specialty}_extraExp`] ? 0.01 + 0.003 * allocation[`l_${specialty}_extraExp`] : 0;

    return { total, reward, return: returnChance, exp };
  }

  getCurrentSummary(): SkillAllocationSummary | null {
    return this.currentSummary;
  }
}

export const skillAllocationManager = new SkillAllocationManager();
