/**
 * 技能点分配功能模块
 * 包含技能点分配管理器和面板
 */

import { render } from 'preact';
import { useState } from 'preact/hooks';
import { ws, logger, toast } from '@/core';
import { sleep, analytics } from '@/utils';
import { Modal, FormGroup, Select, Checkbox, Button } from '@/ui/components';

// ==================== 类型定义 ====================

export interface SkillAllocationSummary {
  treeId: string;
  totalEarned: number;
  totalSpent: number;
  effectiveSpent: number;
  available: number;
  nodeLevels: Record<string, number>;
  canAllocate: Record<string, boolean>;
  unmetReasons: Record<string, string[]>;
}

export interface AllocationResult {
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

// ==================== 常量 ====================

export const SPECIALTY_MAP: Record<string, string> = {
  knowledge: '知识',
  craft: '制作',
  brew: '酿造',
  sew: '缝制',
  cook: '烹饪',
  boil: '熬制',
  plant: '种植',
};

export const NODE_NAME_MAP: Record<string, string> = {
  l_efficiency_basics: '效率基础',
  l_lucky_basics: '幸运基础',
  l_knowledge_focus: '知识专精',
  l_knowledge_extraReward: '知识额外产出',
  l_knowledge_returnResource: '知识返还材料',
  l_knowledge_extraExp: '知识额外经验',
  l_craft_focus: '制作专精',
  l_craft_extraReward: '制作额外产出',
  l_craft_returnResource: '制作返还材料',
  l_craft_extraExp: '制作额外经验',
  l_brew_focus: '酿造专精',
  l_brew_extraReward: '酿造额外产出',
  l_brew_returnResource: '酿造返还材料',
  l_brew_extraExp: '酿造额外经验',
  l_sew_focus: '缝制专精',
  l_sew_extraReward: '缝制额外产出',
  l_sew_returnResource: '缝制返还材料',
  l_sew_extraExp: '缝制额外经验',
  l_cook_focus: '烹饪专精',
  l_cook_extraReward: '烹饪额外产出',
  l_cook_returnResource: '烹饪返还材料',
  l_cook_extraExp: '烹饪额外经验',
  l_boil_focus: '熬制专精',
  l_boil_extraReward: '熬制额外产出',
  l_boil_returnResource: '熬制返还材料',
  l_boil_extraExp: '熬制额外经验',
  l_plant_focus: '种植专精',
  l_plant_extraReward: '种植额外产出',
  l_plant_returnResource: '种植返还材料',
  l_plant_extraExp: '种植额外经验',
};

// ==================== 技能分配管理器 ====================

class SkillAllocationManager {
  private currentSummary: SkillAllocationSummary | null = null;

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

  async allocate(nodeId: string, treeId: string = 'life'): Promise<SkillAllocationSummary> {
    const response = await ws.sendAndListen('skillTree:allocate', { treeId, nodeId }, 'skillTree:summary:success');

    if (response.payload?.data?.summary) {
      this.currentSummary = response.payload.data.summary;
      return this.currentSummary;
    }

    throw new Error('加点失败: 未返回有效数据');
  }

  private selectNextNode(
    summary: SkillAllocationSummary,
    strategy: string,
    specialty: string,
    luckyFirst: boolean,
  ): string | null {
    const { canAllocate, nodeLevels } = summary;
    const getLevel = (nodeId: string) => nodeLevels[nodeId] || 0;

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

    for (const [nodeId, canAdd] of Object.entries(canAllocate)) {
      if (canAdd && nodeId !== 'l_lucky_basics') return nodeId;
    }

    if (!luckyFirst && canAllocate['l_lucky_basics']) return 'l_lucky_basics';

    return null;
  }

  async autoAllocate(
    strategy: string,
    specialty: string,
    luckyFirst: boolean = false,
    treeId: string = 'life',
    onProgress?: (remaining: number, total: number, nodeId: string) => void,
  ): Promise<void> {
    logger.info(`开始自动加点: 策略=${strategy}, 专精=${specialty}, 幸运优先=${luckyFirst}`);

    let summary = await this.reset(treeId);
    const totalPoints = summary.available;

    while (summary.available > 0) {
      const nextNode = this.selectNextNode(summary, strategy, specialty, luckyFirst);

      if (!nextNode) {
        logger.warn('没有可加点的节点，停止加点');
        break;
      }

      logger.debug(`加点: ${nextNode}, 剩余点数: ${summary.available}`);

      summary = await this.allocate(nextNode, treeId);

      onProgress?.(summary.available, totalPoints, nextNode);

      await sleep(500);
    }

    logger.success(`自动加点完成: 总点数=${totalPoints}, 剩余=${summary.available}`);
    analytics.track('技能分配', '自动加点', `${strategy}-${specialty}`);
  }

  calculateEfficiencyStats(): AllocationResult | null {
    if (!this.currentSummary) return null;

    const { nodeLevels, totalEarned, available } = this.currentSummary;
    const usedPoints = totalEarned - available;

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

// ==================== 技能分配面板 ====================

function SkillAllocationPanelContent() {
  const [specialty, setSpecialty] = useState('knowledge');
  const [strategy, setStrategy] = useState('效率优先');
  const [luckyFirst, setLuckyFirst] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState('');
  const [showProgress, setShowProgress] = useState(false);

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
      setProgress('正在自动加点...');

      await skillAllocationManager.autoAllocate(strategy, specialty, luckyFirst, 'life', (remaining, total, nodeId) => {
        const nodeName = NODE_NAME_MAP[nodeId] || nodeId;
        setProgress(`剩余技能点: ${remaining}/${total}\n当前: ${nodeName}`);
      });

      const result = skillAllocationManager.calculateEfficiencyStats();
      if (result) {
        setProgress(
          `✅ 加点完成！\n\n已用: ${result.summary.usedPoints}/${result.summary.totalPoints} | 效率: ${result.summary.totalEfficiency}\n额外产出: ${result.summary.extraRewardChance} | 返还: ${result.summary.returnChance}\n经验: ${result.summary.expBoost} | 幸运: ${result.summary.luckyLevel}`,
        );
      } else {
        setProgress('✅ 加点完成！');
      }
      toast.success('技能点分配完成');
    } catch (error) {
      logger.error('加点失败', error);
      setProgress(`❌ 加点失败: ${error instanceof Error ? error.message : '未知错误'}`);
      toast.error('加点失败');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <FormGroup label="专精:">
        <Select value={specialty} onChange={setSpecialty} options={specialtyOptions} />
      </FormGroup>

      <FormGroup label="优先级:">
        <Select value={strategy} onChange={setStrategy} options={strategyOptions} />
      </FormGroup>

      <FormGroup>
        <Checkbox checked={luckyFirst} onChange={setLuckyFirst} label="幸运优先" style={{ fontWeight: '600' }} />
      </FormGroup>

      <Button onClick={handleAllocate} disabled={isProcessing}>
        {isProcessing ? '处理中...' : '开始加点'}
      </Button>

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
      <Modal isOpen={true} onClose={() => this.hide()} title="🌳 生活专精加点">
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
