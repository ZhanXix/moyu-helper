/**
 * 技能点分配面板 - Preact 重构版
 */

import { render } from 'preact';
import { useState } from 'preact/hooks';
import { skillAllocationManager } from '@/features/skill-allocation';
import { logger } from '@/core/logger';
import { toast } from '@/core/toast';
import { Modal, FormGroup, Select, Checkbox, Button } from './components';
import { analytics } from '@/utils';

const SPECIALTY_MAP: Record<string, string> = {
  knowledge: '自我提升',
  farmingAnimal: '养殖',
  collecting: '采集',
  mining: '采矿',
  fishing: '钓鱼',
  farmingPlant: '种植',
  cooking: '烹饪',
  manufacturing: '制造',
  forging: '锻造',
  sewing: '缝纫',
  exploring: '探索',
  mysterious: '炼金',
  specialManufacture: '特殊制造',
};

const NODE_NAME_MAP: Record<string, string> = {
  l_efficiency_basics: '基础效率',
  l_lucky_basics: '幸运',
  l_farmingAnimal_focus: '养殖专注',
  l_collecting_focus: '采集专注',
  l_mining_focus: '采矿专注',
  l_fishing_focus: '钓鱼专注',
  l_farmingPlant_focus: '种植专注',
  l_cooking_focus: '烹饪专注',
  l_manufacturing_focus: '制造专注',
  l_forging_focus: '锻造专注',
  l_sewing_focus: '缝纫专注',
  l_knowledge_focus: '自我提升专注',
  l_exploring_focus: '探索专注',
  l_mysterious_focus: '炼金专注',
  l_specialManufacture_focus: '特殊制造专注',
  l_farmingAnimal_extraReward: '养殖额外产出',
  l_collecting_extraReward: '采集额外产出',
  l_mining_extraReward: '采矿额外产出',
  l_fishing_extraReward: '钓鱼额外产出',
  l_farmingPlant_extraReward: '种植额外产出',
  l_cooking_extraReward: '烹饪额外产出',
  l_manufacturing_extraReward: '制造额外产出',
  l_forging_extraReward: '锻造额外产出',
  l_sewing_extraReward: '缝纫额外产出',
  l_knowledge_extraReward: '自我提升额外产出',
  l_exploring_extraReward: '探索额外产出',
  l_mysterious_extraReward: '炼金额外产出',
  l_specialManufacture_extraReward: '特殊制造额外产出',
  l_farmingAnimal_returnResource: '养殖返还材料',
  l_collecting_returnResource: '采集返还材料',
  l_mining_returnResource: '采矿返还材料',
  l_fishing_returnResource: '钓鱼返还材料',
  l_farmingPlant_returnResource: '种植返还材料',
  l_cooking_returnResource: '烹饪返还材料',
  l_manufacturing_returnResource: '制造返还材料',
  l_forging_returnResource: '锻造返还材料',
  l_sewing_returnResource: '缝纫返还材料',
  l_knowledge_returnResource: '自我提升返还材料',
  l_exploring_returnResource: '探索返还材料',
  l_mysterious_returnResource: '炼金返还材料',
  l_specialManufacture_returnResource: '特殊制造返还材料',
  l_farmingAnimal_extraExp: '养殖额外经验',
  l_collecting_extraExp: '采集额外经验',
  l_mining_extraExp: '采矿额外经验',
  l_fishing_extraExp: '钓鱼额外经验',
  l_farmingPlant_extraExp: '种植额外经验',
  l_cooking_extraExp: '烹饪额外经验',
  l_manufacturing_extraExp: '制造额外经验',
  l_forging_extraExp: '锻造额外经验',
  l_sewing_extraExp: '缝纫额外经验',
  l_knowledge_extraExp: '自我提升额外经验',
  l_exploring_extraExp: '探索额外经验',
  l_mysterious_extraExp: '炼金额外经验',
  l_specialManufacture_extraExp: '特殊制造额外经验',
};

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

/**
 * 技能点分配面板类
 */
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
    }
  }
}
