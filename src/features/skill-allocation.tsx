/**
 * 技能点分配功能模块
 * 包含技能点分配管理器和面板
 * 
 * 2026/1/29 参照鱼类自动化养殖技术交流群文件 天赋加点2.js 重写 
 * 由于重置专精点的时候经常收不到响应，所以需要进入专精页面提取剩余技能点，无法在页面外使用该功能
 */

import { render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { STORAGE_KEYS, DEFAULT_SKILL_ALLOCATION } from '@/config/defaults';
import type { SkillAllocationSummary, AllocationResult } from '@/types/features';
import { ws, logger, toast } from '@/core';
import { sleep, analytics } from '@/utils';
import { Modal, FormGroup, Select, Checkbox, Button } from '@/ui/components';

// ==================== 常量 ====================

export const SPECIALTY_MAP: Record<string, string> = {
  mining: '采矿',
  mysterious: '炼金',
  collecting: '采集',
  knowledge: '自我提升',
  forging: '锻造',
  exploring: '探索',
  manufacturing: '制造',
  cooking: '烹饪',
  farmingAnimal: '养殖',
  farmingPlant: '种植',
  sewing: '缝纫',
  specialManufacture: '特种制造',
  fishing: '钓鱼',
};

export const NODE_NAME_MAP: Record<string, string> = {
  l_efficiency_basics: '效率基础',
  l_lucky_basics: '幸运',
  l_mining_focus: '采矿专精',
  l_mining_extraReward: '采矿额外产出',
  l_mining_returnResource: '采矿返还消耗',
  l_mining_extraExp: '采矿额外经验',
  l_mysterious_focus: '炼金专精',
  l_mysterious_extraReward: '炼金额外产出',
  l_mysterious_returnResource: '炼金返还消耗',
  l_mysterious_extraExp: '炼金额外经验',
  l_collecting_focus: '采集专精',
  l_collecting_extraReward: '采集额外产出',
  l_collecting_returnResource: '采集返还消耗',
  l_collecting_extraExp: '采集额外经验',
  l_knowledge_focus: '自我提升专精',
  l_knowledge_extraReward: '自我提升额外产出',
  l_knowledge_returnResource: '自我提升返还消耗',
  l_knowledge_extraExp: '自我提升额外经验',
  l_forging_focus: '锻造专精',
  l_forging_extraReward: '锻造额外产出',
  l_forging_returnResource: '锻造返还消耗',
  l_forging_extraExp: '锻造额外经验',
  l_exploring_focus: '探索专精',
  l_exploring_extraReward: '探索额外产出',
  l_exploring_returnResource: '探索返还消耗',
  l_exploring_extraExp: '探索额外经验',
  l_manufacturing_focus: '制造专精',
  l_manufacturing_extraReward: '制造额外产出',
  l_manufacturing_returnResource: '制造返还消耗',
  l_manufacturing_extraExp: '制造额外经验',
  l_cooking_focus: '烹饪专精',
  l_cooking_extraReward: '烹饪额外产出',
  l_cooking_returnResource: '烹饪返还消耗',
  l_cooking_extraExp: '烹饪额外经验',
  l_farmingAnimal_focus: '养殖专精',
  l_farmingAnimal_extraReward: '养殖额外产出',
  l_farmingAnimal_returnResource: '养殖返还消耗',
  l_farmingAnimal_extraExp: '养殖额外经验',
  l_farmingPlant_focus: '种植专精',
  l_farmingPlant_extraReward: '种植额外产出',
  l_farmingPlant_returnResource: '种植返还消耗',
  l_farmingPlant_extraExp: '种植额外经验',
  l_sewing_focus: '缝纫专精',
  l_sewing_extraReward: '缝纫额外产出',
  l_sewing_returnResource: '缝纫返还消耗',
  l_sewing_extraExp: '缝纫额外经验',
  l_specialManufacture_focus: '特种制造专精',
  l_specialManufacture_extraReward: '特种制造额外产出',
  l_specialManufacture_returnResource: '特种制造返还消耗',
  l_specialManufacture_extraExp: '特种制造额外经验',
  l_fishing_focus: '钓鱼专精',
  l_fishing_extraReward: '钓鱼额外产出',
  l_fishing_returnResource: '钓鱼返还消耗',
  l_fishing_extraExp: '钓鱼额外经验',
};

// ==================== 天赋节点定义 ====================

interface TalentNode {
  id: string;
  name: string;
  tier: number;
  maxLevel: number;
  getCost: (level: number) => number;
  unlockRequirement?: { nodeId: string; level: number };
}

// ==================== 加点策略计算函数 ====================

function calculateTalentAllocation(
  totalPoints: number,
  luckyFirst: boolean,
  strategy: string,
  specialty: string
): { allocation: Record<string, number>; summary: AllocationResult['summary'] } {
  const allocation: Record<string, number> = {};

  // 定义基础节点
  const baseNodes: TalentNode[] = [
    { id: 'l_efficiency_basics', name: '效率基础', tier: 1, maxLevel: 20, getCost: (level) => 1 + Math.floor(level / 4) },
    { id: 'l_lucky_basics', name: '幸运', tier: 1, maxLevel: 10, getCost: () => 15 },
  ];

  // 定义专精节点
  const getSpecialtyNodes = (spec: string): TalentNode[] => [
    {
      id: `l_${spec}_focus`,
      name: '专精',
      tier: 2,
      maxLevel: 10,
      getCost: (level) => 1 + Math.floor(level / 2),
      unlockRequirement: { nodeId: 'l_efficiency_basics', level: 2 },
    },
    {
      id: `l_${spec}_extraReward`,
      name: '额外产出',
      tier: 3,
      maxLevel: 10,
      getCost: (level) => 4 + Math.floor(level / 2),
      unlockRequirement: { nodeId: `l_${spec}_focus`, level: 7 },
    },
    {
      id: `l_${spec}_returnResource`,
      name: '返还消耗',
      tier: 3,
      maxLevel: 10,
      getCost: (level) => 4 + Math.floor(level / 2),
      unlockRequirement: { nodeId: `l_${spec}_focus`, level: 7 },
    },
    {
      id: `l_${spec}_extraExp`,
      name: '额外经验',
      tier: 3,
      maxLevel: 10,
      getCost: (level) => 4 + Math.floor(level / 2),
      unlockRequirement: { nodeId: `l_${spec}_focus`, level: 8 },
    },
  ];

  const allNodes: TalentNode[] = [...baseNodes, ...getSpecialtyNodes(specialty)];

  // 初始化所有节点等级为0
  allNodes.forEach((node) => {
    allocation[node.id] = 0;
  });

  let remainingPoints = totalPoints;

  // 计算升级所需点数
  const getUpgradeCost = (nodeId: string, currentLevel: number): number => {
    const node = allNodes.find((n) => n.id === nodeId);
    if (!node) return Infinity;

    if (node.id === 'l_lucky_basics') return 15;
    if (node.id === 'l_efficiency_basics') return 1 + Math.floor(currentLevel / 4);
    if (node.id.includes('_focus')) return 1 + Math.floor(currentLevel / 2);
    return 4 + Math.floor(currentLevel / 2);
  };

  // 检查节点是否可以升级
  const canUpgrade = (nodeId: string, currentLevel: number): boolean => {
    const node = allNodes.find((n) => n.id === nodeId);
    if (!node) return false;

    if (currentLevel >= node.maxLevel) return false;

    // 检查解锁条件
    if (node.unlockRequirement) {
      const requiredNode = allocation[node.unlockRequirement.nodeId];
      if (requiredNode < node.unlockRequirement.level) {
        return false;
      }
    }

    return true;
  };

  // 尝试升级一个节点
  const tryUpgradeNode = (nodeId: string): boolean => {
    if (!canUpgrade(nodeId, allocation[nodeId])) {
      return false;
    }

    const cost = getUpgradeCost(nodeId, allocation[nodeId]);
    if (cost <= remainingPoints) {
      allocation[nodeId]++;
      remainingPoints -= cost;
      return true;
    }

    return false;
  };

  // 幸运节点加点
  const allocateLucky = () => {
    while (allocation['l_lucky_basics'] < 10) {
      const cost = getUpgradeCost('l_lucky_basics', allocation['l_lucky_basics']);
      if (remainingPoints >= cost) {
        allocation['l_lucky_basics']++;
        remainingPoints -= cost;
      } else {
        break;
      }
    }
  };

  // 计算节点升级的效率提升
  const getEfficiencyPerPoint = (nodeId: string, currentLevel: number): number => {
    if (!canUpgrade(nodeId, currentLevel)) return 0;

    const cost = getUpgradeCost(nodeId, currentLevel);
    let efficiencyGain = 0;

    if (nodeId === 'l_efficiency_basics') {
      efficiencyGain = 0.003;
    } else if (nodeId.includes('_focus')) {
      efficiencyGain = 0.005;
    } else if (nodeId.includes('_extraReward')) {
      efficiencyGain = 0.001;
    } else if (nodeId.includes('_returnResource')) {
      efficiencyGain = 0.00066;
    } else if (nodeId.includes('_extraExp')) {
      efficiencyGain = 0;
    }

    return efficiencyGain / cost;
  };

  // 产出优先策略
  const allocateOutputFirst = () => {
    if (totalPoints < 22) {
      allocateEfficiencyFirst();
      return;
    }

    // 阶段1: 解锁专精效率节点
    if (allocation['l_efficiency_basics'] < 2) {
      while (allocation['l_efficiency_basics'] < 2 && remainingPoints > 0) {
        if (!tryUpgradeNode('l_efficiency_basics')) {
          break;
        }
      }
    }

    // 阶段2: 点专精效率到7级
    while (allocation[`l_${specialty}_focus`] < 7 && remainingPoints > 0) {
      if (!tryUpgradeNode(`l_${specialty}_focus`)) {
        break;
      }
    }

    // 阶段3: 所有点数投入额外产出
    while (remainingPoints > 0 && allocation[`l_${specialty}_extraReward`] < 10) {
      if (canUpgrade(`l_${specialty}_extraReward`, allocation[`l_${specialty}_extraReward`])) {
        if (!tryUpgradeNode(`l_${specialty}_extraReward`)) {
          break;
        }
      } else {
        break;
      }
    }

    // 阶段4: 剩余点数按效率优先级分配
    allocateRemainingPointsByEfficiency(['_extraReward', '_extraExp']);

    // 阶段5: 如果还有剩余点数，投入经验获取节点
    if (remainingPoints > 0) {
      tryAllocateExpNode();
    }
  };

  // 材料节省优先策略
  const allocateMaterialFirst = () => {
    if (totalPoints < 22) {
      allocateEfficiencyFirst();
      return;
    }

    // 阶段1: 解锁专精效率节点
    if (allocation['l_efficiency_basics'] < 2) {
      while (allocation['l_efficiency_basics'] < 2 && remainingPoints > 0) {
        if (!tryUpgradeNode('l_efficiency_basics')) {
          break;
        }
      }
    }

    // 阶段2: 点专精效率到7级
    while (allocation[`l_${specialty}_focus`] < 7 && remainingPoints > 0) {
      if (!tryUpgradeNode(`l_${specialty}_focus`)) {
        break;
      }
    }

    // 阶段3: 所有点数投入返还材料
    while (remainingPoints > 0 && allocation[`l_${specialty}_returnResource`] < 10) {
      if (canUpgrade(`l_${specialty}_returnResource`, allocation[`l_${specialty}_returnResource`])) {
        if (!tryUpgradeNode(`l_${specialty}_returnResource`)) {
          break;
        }
      } else {
        break;
      }
    }

    // 阶段4: 剩余点数按产出效率优先策略
    allocateRemainingPointsByEfficiency(['_returnResource', '_extraExp']);

    // 阶段5: 如果还有剩余点数，投入经验获取节点
    if (remainingPoints > 0) {
      tryAllocateExpNode();
    }
  };

  const allocateRemainingPointsByEfficiency = (excludeNodes: string[] = []) => {
    let upgraded = true;

    while (remainingPoints > 0 && upgraded) {
      upgraded = false;

      const upgradeableNodes = allNodes
        .filter((node) => {
          if (node.id === 'l_lucky_basics') return false;
          if (excludeNodes.some((exclude) => node.id.includes(exclude))) return false;
          if (!canUpgrade(node.id, allocation[node.id])) return false;

          return true;
        })
        .map((node) => {
          const cost = getUpgradeCost(node.id, allocation[node.id]);
          const efficiency = getEfficiencyPerPoint(node.id, allocation[node.id]);
          return {
            id: node.id,
            efficiencyPerPoint: efficiency,
            cost: cost,
            efficiency: efficiency * cost,
          };
        })
        .filter((node) => node.efficiencyPerPoint > 0 && node.cost <= remainingPoints)
        .sort((a, b) => {
          if (b.efficiencyPerPoint !== a.efficiencyPerPoint) {
            return b.efficiencyPerPoint - a.efficiencyPerPoint;
          }
          return b.efficiency - a.efficiency;
        });

      if (upgradeableNodes.length === 0) {
        break;
      }

      const bestNode = upgradeableNodes[0];

      if (canUpgrade(bestNode.id, allocation[bestNode.id])) {
        const cost = getUpgradeCost(bestNode.id, allocation[bestNode.id]);

        if (cost <= remainingPoints) {
          allocation[bestNode.id]++;
          remainingPoints -= cost;
          upgraded = true;
        }
      }

      if (!upgraded) {
        break;
      }
    }

    // 如果还有剩余点数，尝试寻找更便宜的升级
    if (remainingPoints > 0) {
      const affordableNodes = allNodes
        .filter((node) => {
          if (node.id === 'l_lucky_basics') return false;
          if (excludeNodes.some((exclude) => node.id.includes(exclude))) return false;
          if (!canUpgrade(node.id, allocation[node.id])) return false;

          const cost = getUpgradeCost(node.id, allocation[node.id]);
          return cost <= remainingPoints;
        })
        .sort((a, b) => {
          const costA = getUpgradeCost(a.id, allocation[a.id]);
          const costB = getUpgradeCost(b.id, allocation[b.id]);
          return costA - costB;
        });

      if (affordableNodes.length > 0) {
        const cheapestNode = affordableNodes[0];
        const cost = getUpgradeCost(cheapestNode.id, allocation[cheapestNode.id]);

        if (cost <= remainingPoints) {
          allocation[cheapestNode.id]++;
          remainingPoints -= cost;
        }
      }
    }
  };

  // 尝试为经验获取节点加点
  const tryAllocateExpNode = () => {
    const expNodeId = `l_${specialty}_extraExp`;

    if (allocation[expNodeId] >= 10) {
      return;
    }

    if (allocation[`l_${specialty}_focus`] < 8) {
      while (allocation[`l_${specialty}_focus`] < 8 && remainingPoints > 0) {
        if (!tryUpgradeNode(`l_${specialty}_focus`)) {
          break;
        }
      }
    }

    if (allocation[`l_${specialty}_focus`] >= 8) {
      while (remainingPoints > 0 && allocation[expNodeId] < 10) {
        if (!tryUpgradeNode(expNodeId)) {
          break;
        }
      }
    }
  };

  const allocateEfficiencyFirst = () => {
    // 阶段1: 基础效率至少2级
    while (allocation['l_efficiency_basics'] < 2 && remainingPoints > 0) {
      if (!tryUpgradeNode('l_efficiency_basics')) {
        break;
      }
    }

    // 阶段2: 如果总点数>=22，解锁专精7级
    if (totalPoints >= 22) {
      while (allocation[`l_${specialty}_focus`] < 7 && remainingPoints > 0) {
        if (!tryUpgradeNode(`l_${specialty}_focus`)) {
          break;
        }
      }

      if (allocation[`l_${specialty}_focus`] >= 7 && allocation[`l_${specialty}_extraReward`] === 0 && remainingPoints > 0) {
        tryUpgradeNode(`l_${specialty}_extraReward`);
      }

      if (totalPoints >= 28) {
        if (allocation[`l_${specialty}_focus`] >= 7 && allocation[`l_${specialty}_returnResource`] === 0 && remainingPoints > 0) {
          tryUpgradeNode(`l_${specialty}_returnResource`);
        }
      }
    }

    // 阶段3: 剩余点数按效率优先级分配
    allocateRemainingPointsByEfficiency(['_extraExp']);

    // 阶段4: 如果还有剩余点数，投入经验获取节点
    if (remainingPoints > 0) {
      tryAllocateExpNode();
    }
  };

  const allocateExperienceFirst = () => {
    if (totalPoints < 24) {
      allocateEfficiencyFirst();
      return;
    }

    // 阶段1: 解锁额外经验节点
    if (allocation['l_efficiency_basics'] < 2) {
      while (allocation['l_efficiency_basics'] < 2 && remainingPoints > 0) {
        if (!tryUpgradeNode('l_efficiency_basics')) {
          break;
        }
      }
    }

    // 阶段2: 点专精效率到8级
    while (allocation[`l_${specialty}_focus`] < 8 && remainingPoints > 0) {
      if (!tryUpgradeNode(`l_${specialty}_focus`)) {
        break;
      }
    }

    // 阶段3: 所有点数投入额外经验
    while (remainingPoints > 0 && allocation[`l_${specialty}_extraExp`] < 10) {
      if (canUpgrade(`l_${specialty}_extraExp`, allocation[`l_${specialty}_extraExp`])) {
        if (!tryUpgradeNode(`l_${specialty}_extraExp`)) {
          break;
        }
      } else {
        break;
      }
    }

    // 阶段4: 剩余点数按产出效率优先策略
    allocateRemainingPointsByEfficiency(['_returnResource', '_extraExp']);
  };

  // 主加点逻辑
  if (luckyFirst) {
    allocateLucky();
  }

  switch (strategy) {
    case '效率优先':
      allocateEfficiencyFirst();
      break;
    case '产出优先':
      allocateOutputFirst();
      break;
    case '材料优先':
      allocateMaterialFirst();
      break;
    case '经验优先':
      allocateExperienceFirst();
      break;
    default:
      allocateEfficiencyFirst();
  }

  if (!luckyFirst) {
    allocateLucky();
  }

  // 最终优化：如果还有剩余点数，尝试升级任何节点
  if (remainingPoints > 0) {
    // 优先尝试升级幸运
    while (allocation['l_lucky_basics'] < 10) {
      const cost = getUpgradeCost('l_lucky_basics', allocation['l_lucky_basics']);
      if (remainingPoints >= cost) {
        allocation['l_lucky_basics']++;
        remainingPoints -= cost;
      } else {
        break;
      }
    }

    const allRemainingNodes = allNodes
      .filter((node) => canUpgrade(node.id, allocation[node.id]))
      .map((node) => ({
        id: node.id,
        cost: getUpgradeCost(node.id, allocation[node.id]),
      }))
      .filter((node) => node.cost <= remainingPoints)
      .sort((a, b) => a.cost - b.cost);

    for (const node of allRemainingNodes) {
      if (remainingPoints >= node.cost) {
        allocation[node.id]++;
        remainingPoints -= node.cost;
      }
    }
  }

  // 移除等级为0的节点
  const result: Record<string, number> = {};
  Object.keys(allocation).forEach((nodeId) => {
    if (allocation[nodeId] > 0) {
      result[nodeId] = allocation[nodeId];
    }
  });

  // 计算效率统计
  let totalEfficiency = 0;

  if (allocation['l_efficiency_basics']) {
    totalEfficiency += 0.03 + 0.003 * allocation['l_efficiency_basics'];
  }

  const focusKey = `l_${specialty}_focus`;
  if (allocation[focusKey]) {
    totalEfficiency += 0.01 + 0.005 * allocation[focusKey];
  }

  const extraRewardKey = `l_${specialty}_extraReward`;
  if (allocation[extraRewardKey]) {
    const extraRewardProb = 0.008 + 0.002 * allocation[extraRewardKey];
    totalEfficiency += extraRewardProb * 0.5;
  }

  const returnKey = `l_${specialty}_returnResource`;
  if (allocation[returnKey]) {
    const returnProb = 0.008 + 0.002 * allocation[returnKey];
    totalEfficiency += returnProb * 0.33;
  }

  const expKey = `l_${specialty}_extraExp`;
  const expBoost = allocation[expKey] ? 0.01 + 0.003 * allocation[expKey] : 0;

  // 计算实际消耗的技能点（每次升级的成本累加）
  const usedPoints = Object.entries(result).reduce((sum, [nodeId, targetLevel]) => {
    let cost = 0;
    for (let level = 0; level < targetLevel; level++) {
      cost += getUpgradeCost(nodeId, level);
    }
    return sum + cost;
  }, 0);

  const returnChance = allocation[returnKey] ? ((0.008 + 0.002 * allocation[returnKey]) * 100).toFixed(2) + '%' : '0.00%';
  const extraRewardChance = allocation[extraRewardKey] ? ((0.008 + 0.002 * allocation[extraRewardKey]) * 100).toFixed(2) + '%' : '0.00%';

  return {
    allocation: result,
    summary: {
      totalPoints,
      usedPoints,
      remainingPoints: totalPoints - usedPoints,
      totalEfficiency: (totalEfficiency * 100).toFixed(2) + '%',
      expBoost: (expBoost * 100).toFixed(2) + '%',
      returnChance,
      extraRewardChance,
      luckyLevel: allocation['l_lucky_basics'] || 0,
    },
  };
}

// ==================== 技能分配管理器 ====================

class SkillAllocationManager {
  private currentSummary: SkillAllocationSummary | null = null;

  async reset(treeId: string = 'life'): Promise<SkillAllocationSummary> {
    logger.info(`重置技能点: ${treeId}`);
    // 先发送重置消息，再等待 `skillTree:reset:success` 事件，超时后回退到从 DOM 读取
    const timeoutMs = 10000;

    // 先准备监听器 promise
    const listenPromise = ws.awaitOnce('skillTree:reset:success');

    // 发送重置请求（不等待响应）
    try {
      await ws.send('skillTree:reset', { treeId });
    } catch (err) {
      logger.warn('发送重置消息失败（可能尚未连接），继续等待事件', err);
    }

    let response: any = null;
    try {
      response = await Promise.race([
        listenPromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('重置超时')), timeoutMs)),
      ]);
      logger.debug('重置响应事件:', response);
    } catch (err: any) {
      logger.error('重置等待超时或失败', err);

      // 尝试短时监听延迟到达的响应以便排查
      try {
        const unsub = ws.once('skillTree:reset:success', (data) => {
          logger.warn('检测到延迟到达的重置响应', data);
          toast.info('检测到延迟到达的重置响应，已记录日志');
          unsub();
        });
        setTimeout(() => unsub(), 5000);
      } catch (e) {
        logger.debug('延迟响应监听注册失败', e);
      }

      // 回退：尝试从页面 DOM 中解析可用点数（参考天赋加点2.js 的做法）
      const derived = this.deriveSummaryFromDOM();
      if (derived) {
        this.currentSummary = derived;
        logger.warn('使用 DOM 回退获取到可用点数', this.currentSummary);
        return this.currentSummary;
      }

      throw err;
    }

    // 如果响应包含 summary，则直接使用；否则也回退到 DOM
    if (response?.payload?.data?.summary) {
      this.currentSummary = response.payload.data.summary as SkillAllocationSummary;
      logger.success('技能点重置成功', this.currentSummary);
      return this.currentSummary;
    }

    const derived2 = this.deriveSummaryFromDOM();
    if (derived2) {
      this.currentSummary = derived2;
      logger.warn('重置未返回 summary，使用 DOM 回退获取', this.currentSummary);
      return this.currentSummary;
    }

    throw new Error('重置失败: 未返回有效数据');
  }

  async allocate(nodeId: string, treeId: string = 'life'): Promise<SkillAllocationSummary> {
    const timeoutMs = 8000;
    const responsePromise = ws.sendAndListen('skillTree:allocate', { treeId, nodeId }, 'skillTree:summary:success');
    let response: any;
    try {
      response = await Promise.race([
        responsePromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('加点超时')), timeoutMs)),
      ]);
    } catch (err: any) {
      logger.error('加点请求超时或失败', err);

      if (err && /超时/.test(String(err.message || ''))) {
        try {
          const lateEvent = 'skillTree:summary:success';
          const unsub = ws.once(lateEvent, (data) => {
            logger.warn('检测到延迟到达的加点响应', data);
            toast.info('检测到延迟到达的加点响应，已记录日志');
            unsub();
          });
          setTimeout(() => unsub(), 5000);
        } catch (err) {
          logger.debug('延迟响应监听注册失败', err);
        }
      }

      throw err;
    }

    if (response.payload?.data?.summary) {
      this.currentSummary = response.payload.data.summary as SkillAllocationSummary;
      await sleep(30);
      return this.currentSummary;
    }

    throw new Error('加点失败: 未返回有效数据');
  }

  async autoAllocate(
    strategy: string,
    specialty: string,
    luckyFirst: boolean = false,
    treeId: string = 'life',
    onProgress?: (remaining: number, total: number, nodeId: string) => void,
  ): Promise<AllocationResult | null> {
    logger.info(`开始自动加点: 策略=${strategy}, 专精=${specialty}, 幸运优先=${luckyFirst}`);

    try {
      let summary = await this.reset(treeId);
      const totalPoints = summary.available;

      // 计算加点方案
      const result = calculateTalentAllocation(totalPoints, luckyFirst, strategy, specialty);

      // 按优先级执行加点
      const baseEfficiencyNodes: string[] = [];
      const specialtyFocusNodes: string[] = [];
      const otherNodes: string[] = [];

      Object.entries(result.allocation).forEach(([nodeId, targetLevel]) => {
        if (targetLevel === 0) return;

        if (nodeId === 'l_lucky_basics') {
          baseEfficiencyNodes.unshift(nodeId);
        } else if (nodeId === 'l_efficiency_basics') {
          baseEfficiencyNodes.push(nodeId);
        } else if (nodeId.includes('_focus')) {
          specialtyFocusNodes.push(nodeId);
        } else {
          otherNodes.push(nodeId);
        }
      });

      const orderedNodes = [...baseEfficiencyNodes, ...specialtyFocusNodes, ...otherNodes];

      let totalUsedPoints = 0;

      // 等待一下，让用户看到"正在计算加点方案..."的提示
      await sleep(300);

      // 显示第一个要加的节点
      if (orderedNodes.length > 0) {
        const firstNodeId = orderedNodes[0];
        const firstNodeName = NODE_NAME_MAP[firstNodeId] || firstNodeId;
        onProgress?.(totalPoints - totalUsedPoints, totalPoints, firstNodeName);
      }

      // 按照优先级顺序执行加点
      for (const nodeId of orderedNodes) {
        const targetLevel = result.allocation[nodeId];
        if (!targetLevel || targetLevel === 0) continue;

        let nodeCompletedUpgrades = 0;

        while (nodeCompletedUpgrades < targetLevel) {
          const batchSize = Math.min(targetLevel - nodeCompletedUpgrades, 5);
          let successCount = 0;
          let batchUsedPoints = 0;

          for (let i = 0; i < batchSize; i++) {
            try {
              const currentLevel = nodeCompletedUpgrades + i;
              // 计算升级成本
              let cost: number;
              if (nodeId === 'l_lucky_basics') {
                cost = 15;
              } else if (nodeId === 'l_efficiency_basics') {
                cost = 1 + Math.floor(currentLevel / 4);
              } else if (nodeId.includes('_focus')) {
                cost = 1 + Math.floor(currentLevel / 2);
              } else {
                cost = 4 + Math.floor(currentLevel / 2);
              }

              await this.allocate(nodeId, treeId);
              successCount++;
              batchUsedPoints += cost;
              await sleep(200);
            } catch (error) {
              logger.warn(`加点失败: ${nodeId}`, error);
            }
          }

          totalUsedPoints += batchUsedPoints;
          nodeCompletedUpgrades += successCount;

          const nodeName = NODE_NAME_MAP[nodeId] || nodeId;
          onProgress?.(totalPoints - totalUsedPoints, totalPoints, nodeName);

          await sleep(500);
        }
      }

      logger.success(`自动加点完成: 总点数=${totalPoints}, 剩余=${totalPoints - totalUsedPoints}`);
      analytics.track('技能分配', '自动加点', `${strategy}-${specialty}`);

      return { allocation: result.allocation, summary: result.summary };
    } catch (error) {
      logger.error('加点失败', error);
      throw error;
    }
  }

  getCurrentSummary(): SkillAllocationSummary | null {
    return this.currentSummary;
  }

  // 从页面 DOM 中尝试解析当前生活专精的可用点数，返回一个最小的 SkillAllocationSummary 或 null
  private deriveSummaryFromDOM(): SkillAllocationSummary | null {
    try {
      const allToolbars = document.querySelectorAll('.toolbar');
      let toolbar: Element | null = null;
      allToolbars.forEach((tb) => {
        const title = tb.querySelector('h3');
        if (title && title.textContent && title.textContent.includes('生活')) {
          toolbar = tb;
        }
      });

      if (!toolbar) return null;

      const small = (toolbar as Element).querySelector('small');
      if (!small || !small.textContent) return null;

      const text = small.textContent.trim();
      const match = text.match(/(\d[\d,]*)/);
      const available = match ? parseInt(match[1].replace(/,/g, '')) : NaN;
      if (isNaN(available)) return null;

      const summary: SkillAllocationSummary = {
        treeId: 'life',
        totalEarned: 0,
        totalSpent: 0,
        effectiveSpent: 0,
        available,
        nodeLevels: {},
        canAllocate: {},
        unmetReasons: {},
      };

      return summary;
    } catch (err) {
      logger.debug('从 DOM 解析可用点数失败', err);
      return null;
    }
  }
}

export const skillAllocationManager = new SkillAllocationManager();

// ==================== 技能分配面板 ====================

function SkillAllocationPanelContent() {
  const [specialty, setSpecialty] = useState('knowledge');
  const [strategy, setStrategy] = useState('产出优先');
  const [luckyFirst, setLuckyFirst] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState('');
  const [showProgress, setShowProgress] = useState(false);
  

  // 加载保存的设置
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const loadedSpecialty = await GM.getValue<string>(
          STORAGE_KEYS.SKILL_ALLOCATION_SPECIALTY,
          DEFAULT_SKILL_ALLOCATION.SPECIALTY,
        );
        const loadedStrategy = await GM.getValue<string>(
          STORAGE_KEYS.SKILL_ALLOCATION_STRATEGY,
          DEFAULT_SKILL_ALLOCATION.STRATEGY,
        );
        const loadedLuckyFirst = await GM.getValue<boolean>(
          STORAGE_KEYS.SKILL_ALLOCATION_LUCKY_FIRST,
          DEFAULT_SKILL_ALLOCATION.LUCKY_FIRST,
        );

        setSpecialty(loadedSpecialty);
        setStrategy(loadedStrategy);
        setLuckyFirst(loadedLuckyFirst);
      } catch (error) {
        logger.warn('加载设置失败', error);
      }
    };
    loadSettings();
  }, []);

  const handleSpecialtyChange = async (value: string) => {
    setSpecialty(value);
    try {
      await GM.setValue(STORAGE_KEYS.SKILL_ALLOCATION_SPECIALTY, value);
    } catch (error) {
      logger.warn('保存设置失败: specialty', error);
    }
  };

  const handleStrategyChange = async (value: string) => {
    setStrategy(value);
    try {
      await GM.setValue(STORAGE_KEYS.SKILL_ALLOCATION_STRATEGY, value);
    } catch (error) {
      logger.warn('保存设置失败: strategy', error);
    }
  };

  const handleLuckyFirstChange = async (value: boolean) => {
    setLuckyFirst(value);
    try {
      await GM.setValue(STORAGE_KEYS.SKILL_ALLOCATION_LUCKY_FIRST, value);
    } catch (error) {
      logger.warn('保存设置失败: luckyFirst', error);
    }
  };

  const specialtyOptions = Object.entries(SPECIALTY_MAP).map(([key, name]) => ({
    value: key,
    label: name,
  }));

  const strategyOptions = [
    { value: '效率优先', label: '效率优先' },
    { value: '产出优先', label: '产出优先' },
    { value: '材料优先', label: '材料优先' },
    { value: '经验优先', label: '经验优先' },
  ];

  const handleAllocate = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      setShowProgress(true);
      setProgress('正在计算加点方案...');

      await new Promise((resolve) => setTimeout(resolve, 500));

      const result = await skillAllocationManager.autoAllocate(
        strategy,
        specialty,
        luckyFirst,
        'life',
        (remaining, total, nodeId) => {
          const nodeName = NODE_NAME_MAP[nodeId] || nodeId;
          setProgress(`剩余技能点: ${remaining}/${total}\n当前: ${nodeName}`);
        },
      );

      if (result) {
        const allocationDetails = Object.entries(result.allocation)
          .map(([nodeId, level]) => `${NODE_NAME_MAP[nodeId] || nodeId}: ${level}`)
          .join('\n');
        setProgress(
          `✅ 加点完成！\n\n已使用技能点：${result.summary.usedPoints}/${result.summary.totalPoints}\n\n${allocationDetails}`,
        );
      } else {
        setProgress('❌ 加点失败');
      }

      toast.success('技能点分配完成');

      // 加点完成后等待1秒再恢复按钮
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      logger.error('加点失败', error);
      const msg = error instanceof Error ? error.message : '未知错误';
      setProgress(`❌ 加点失败: ${msg}`);
      toast.error(`加点失败: ${msg}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <FormGroup label="专精:">
        <Select value={specialty} onChange={handleSpecialtyChange} options={specialtyOptions} />
      </FormGroup>

      <FormGroup label="优先级:">
        <Select value={strategy} onChange={handleStrategyChange} options={strategyOptions} />
      </FormGroup>

      <FormGroup>
        <Checkbox checked={luckyFirst} onChange={handleLuckyFirstChange} label="幸运优先" style={{ fontWeight: '600' }} />
      </FormGroup>

      {isInSkillTreePage() ? (
        <Button onClick={handleAllocate} disabled={isProcessing}>
          {isProcessing ? '处理中...' : '开始加点'}
        </Button>
      ) : (
        <Button disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>
          请先进入生活专精页面
        </Button>
      )}

      {showProgress && (
        <div
          style={{
            padding: '12px',
            background: '#f8f9fa',
            borderRadius: '8px',
            fontSize: '13px',
            color: '#666',
            lineHeight: '1.6',
            whiteSpace: 'pre-line',
            marginTop: '12px',
          }}
        >
          {progress}
        </div>
      )}
    </>
  );
}

// 检查是否在专精页面
const isInSkillTreePage = (): boolean => {
  const skillTreeTab = document.getElementById('tab-skillTree');
  if (!skillTreeTab) return false;
  return skillTreeTab.classList.contains('is-active');
};

export class SkillAllocationPanel {
  private container: HTMLDivElement | null = null;
  private isOpen = false;

  show(): void {
    if (this.isOpen) return;
    this.isOpen = true;
    analytics.track('界面', '打开面板', '技能分配面板');

    if (!this.container) {
      this.container = document.createElement('div');
      document.body.appendChild(this.container);
    }

    render(
      <Modal isOpen={true} onClose={() => this.hide()} title="🌳 生活专精加点" contentStyle={{ paddingBottom: 0 }}>
        <SkillAllocationPanelContent />
      </Modal>,
      this.container,
    );
  }

  hide(): void {
    if (!this.isOpen) return;
    this.isOpen = false;

    if (this.container) {
      render(null, this.container);
      this.container.remove();
      this.container = null;
    }
  }
}
