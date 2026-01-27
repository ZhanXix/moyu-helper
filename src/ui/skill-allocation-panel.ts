/**
 * 技能点分配面板
 */

import { skillAllocationManager } from '@/features/skill-allocation';
import { logger } from '@/core/logger';
import { toast } from '@/core/toast';

const STYLES = `
.mh-skill-allocation-panel{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:90%;max-width:400px;background:#fff;border-radius:16px;box-shadow:0 12px 48px rgba(0,0,0,.2);z-index:9999;padding:24px}
.mh-skill-allocation-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.mh-skill-allocation-title{font-size:20px;font-weight:600;color:#333}
.mh-skill-allocation-close{width:32px;height:32px;border:none;background:#f5f5f5;border-radius:8px;cursor:pointer;font-size:18px;color:#666;transition:all .2s}
.mh-skill-allocation-close:hover{background:#e5e5e5;color:#333}
.mh-skill-allocation-form{display:flex;flex-direction:column;gap:16px}
.mh-skill-allocation-row{display:flex;gap:12px;align-items:center}
.mh-skill-allocation-label{font-size:14px;color:#666;min-width:60px}
.mh-skill-allocation-select{flex:1;padding:8px 12px;border:1px solid #ddd;border-radius:8px;font-size:14px;cursor:pointer}
.mh-skill-allocation-btn{padding:12px 24px;border:none;border-radius:8px;background:#6366f1;color:#fff;font-size:14px;font-weight:500;cursor:pointer;transition:all .2s}
.mh-skill-allocation-btn:hover{background:#5558e3}
.mh-skill-allocation-btn:disabled{background:#ccc;cursor:not-allowed}
.mh-skill-allocation-progress{padding:12px;background:#f8f9fa;border-radius:8px;font-size:13px;color:#666;line-height:1.6;white-space:pre-line}
.mh-skill-allocation-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:9998}
`;

GM.addStyle(STYLES);

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

export class SkillAllocationPanel {
  private overlay: HTMLDivElement | null = null;
  private panel: HTMLDivElement | null = null;
  private isProcessing = false;

  show(): void {
    if (this.overlay) return;

    this.overlay = document.createElement('div');
    this.overlay.className = 'mh-skill-allocation-overlay';
    this.overlay.onclick = () => this.hide();

    this.panel = document.createElement('div');
    this.panel.className = 'mh-skill-allocation-panel';
    this.panel.onclick = (e) => e.stopPropagation();

    this.panel.innerHTML = `
      <div class="mh-skill-allocation-header">
        <div class="mh-skill-allocation-title">🌳 生活专精加点</div>
        <button class="mh-skill-allocation-close">✕</button>
      </div>
      <div class="mh-skill-allocation-form">
        <div class="mh-skill-allocation-row">
          <span class="mh-skill-allocation-label">优先级:</span>
          <select class="mh-skill-allocation-select" id="strategy">
            <option value="效率优先">效率优先</option>
            <option value="产出优先">产出优先</option>
            <option value="材料优先">材料优先</option>
            <option value="经验优先">经验优先</option>
          </select>
        </div>
        <div class="mh-skill-allocation-row">
          <span class="mh-skill-allocation-label">专精:</span>
          <select class="mh-skill-allocation-select" id="specialty">
            ${Object.entries(SPECIALTY_MAP)
              .map(([key, name]) => `<option value="${key}" ${key === 'knowledge' ? 'selected' : ''}>${name}</option>`)
              .join('')}
          </select>
        </div>
        <button class="mh-skill-allocation-btn" id="allocateBtn">开始加点</button>
        <div class="mh-skill-allocation-progress" id="progress" style="display:none"></div>
      </div>
    `;

    document.body.appendChild(this.overlay);
    document.body.appendChild(this.panel);

    this.bindEvents();
  }

  hide(): void {
    this.overlay?.remove();
    this.panel?.remove();
    this.overlay = null;
    this.panel = null;
  }

  private bindEvents(): void {
    this.panel?.querySelector('.mh-skill-allocation-close')?.addEventListener('click', () => this.hide());
    this.panel?.querySelector('#allocateBtn')?.addEventListener('click', () => void this.handleAllocate());
  }

  private async handleAllocate(): Promise<void> {
    if (this.isProcessing) return;

    const btn = this.panel?.querySelector('#allocateBtn') as HTMLButtonElement;
    const progressDiv = this.panel?.querySelector('#progress') as HTMLDivElement;

    try {
      this.isProcessing = true;
      btn.disabled = true;
      btn.textContent = '处理中...';
      progressDiv.style.display = 'block';

      const strategy = (this.panel?.querySelector('#strategy') as HTMLSelectElement).value;
      const specialty = (this.panel?.querySelector('#specialty') as HTMLSelectElement).value;

      progressDiv.textContent = '正在自动加点...';

      await skillAllocationManager.autoAllocate(strategy, specialty, 'life', (remaining, total, nodeId) => {
        const nodeName = NODE_NAME_MAP[nodeId] || nodeId;
        progressDiv.textContent = `剩余技能点: ${remaining}/${total}\n当前: ${nodeName}`;
      });

      const result = skillAllocationManager.calculateEfficiencyStats();
      if (result) {
        progressDiv.textContent = `✅ 加点完成！\n\n已用: ${result.summary.usedPoints}/${result.summary.totalPoints} | 效率: ${result.summary.totalEfficiency}\n额外产出: ${result.summary.extraRewardChance} | 返还: ${result.summary.returnChance}\n经验: ${result.summary.expBoost} | 幸运: ${result.summary.luckyLevel}`;
      } else {
        progressDiv.textContent = '✅ 加点完成！';
      }
      toast.success('技能点分配完成');
    } catch (error) {
      logger.error('加点失败', error);
      progressDiv.textContent = `❌ 加点失败: ${error instanceof Error ? error.message : '未知错误'}`;
      toast.error('加点失败');
    } finally {
      this.isProcessing = false;
      btn.disabled = false;
      btn.textContent = '开始加点';
    }
  }
}
