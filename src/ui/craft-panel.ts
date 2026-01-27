/**
 * 物品制造面板组件
 *
 * 功能说明：
 * - 提供物品选择和数量输入
 * - 实时预览依赖制造计划
 * - 触发自动制造流程
 */

import { craftManager } from '@/features/craft-manager';
import { dataCache } from '@/core';

// 样式常量
const STYLES = {
  overlay: `
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 998;
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  `,
  panel: `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 420px;
    max-height: 80vh;
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    color: #1a1a1a;
    display: none;
    flex-direction: column;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 999;
  `,
  header: `
    padding: 18px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  title: `
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
  `,
  closeBtn: `
    background: transparent;
    border: none;
    color: #666;
    font-size: 24px;
    cursor: pointer;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: all 0.2s ease;
  `,
  content: `
    padding: 20px;
    overflow-y: auto;
    flex: 1;
  `,
  formGroup: `
    margin-bottom: 16px;
  `,
  label: `
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #333;
    margin-bottom: 6px;
  `,
  select: `
    width: 100%;
    padding: 10px 12px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    font-size: 14px;
    color: #1a1a1a;
    background: #ffffff;
    transition: all 0.2s ease;
    cursor: pointer;
  `,
  input: `
    width: 100%;
    padding: 10px 12px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    font-size: 14px;
    color: #1a1a1a;
    background: #ffffff;
    transition: all 0.2s ease;
    box-sizing: border-box;
  `,
  quickAddBtns: `
    display: flex;
    gap: 8px;
    margin-top: 8px;
  `,
  quickAddBtn: `
    flex: 1;
    padding: 6px 12px;
    background: #f3f4f6;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    color: #374151;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  `,
  checkbox: `
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #333;
    cursor: pointer;
  `,
  checkboxInput: `
    width: 16px;
    height: 16px;
    cursor: pointer;
  `,
  previewCard: `
    background: #f8f9fa;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    padding: 14px;
    margin-bottom: 16px;
    min-height: 60px;
  `,
  previewTitle: `
    font-size: 13px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
  `,
  previewContent: `
    font-size: 13px;
    color: #666;
    line-height: 1.6;
  `,
  previewStep: `
    padding: 6px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  `,
  previewStepLast: `
    padding: 6px 0;
  `,
  primaryBtn: `
    width: 100%;
    padding: 12px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  `,
  kittyBtnContainer: `
    display: flex;
    gap: 8px;
    margin-top: 12px;
  `,
  kittyBtn: `
    flex: 1;
    padding: 12px;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  `,
  kittyConfigSection: `
    margin-top: 16px;
    padding: 14px;
    background: #f8f9fa;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 10px;
  `,
  kittyConfigTitle: `
    font-size: 13px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
  `,
  kittyConfigItem: `
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    font-size: 13px;
  `,
  kittyConfigLabel: `
    flex: 0 0 80px;
    color: #666;
  `,
  kittyConfigSelect: `
    flex: 1;
    padding: 6px 10px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 6px;
    font-size: 13px;
    color: #1a1a1a;
    background: #ffffff;
    cursor: pointer;
  `,
};

/**
 * 物品制造面板类
 */
export class CraftPanel {
  private overlay: HTMLDivElement | null = null;
  private panel: HTMLDivElement | null = null;
  private selectElement: HTMLSelectElement | null = null;
  private inputElement: HTMLInputElement | null = null;
  private previewElement: HTMLDivElement | null = null;
  private clearTasksCheckbox: HTMLInputElement | null = null;

  /**
   * 显示面板
   */
  show(): void {
    if (!this.overlay || !this.panel) {
      this.create();
    }

    this.overlay!.style.display = 'block';
    this.panel!.style.display = 'flex';

    // 触发重排后添加 opacity，实现动画效果
    requestAnimationFrame(() => {
      this.overlay!.style.opacity = '1';
      this.panel!.style.opacity = '1';
    });

    // 初始更新预览
    this.updatePreview();
  }

  /**
   * 隐藏面板
   */
  hide(): void {
    if (!this.overlay || !this.panel) return;

    this.overlay.style.opacity = '0';
    this.panel.style.opacity = '0';

    setTimeout(() => {
      this.overlay!.style.display = 'none';
      this.panel!.style.display = 'none';
      // 重置输入框内容
      this.resetForm();
    }, 300);
  }

  /**
   * 重置表单内容
   */
  private resetForm(): void {
    if (this.selectElement) {
      this.selectElement.value = '';
    }
    if (this.inputElement) {
      this.inputElement.value = '1';
    }
    if (this.clearTasksCheckbox) {
      this.clearTasksCheckbox.checked = true;
    }
    if (this.previewElement) {
      this.previewElement.innerHTML = '请选择物品';
    }
  }

  /**
   * 创建面板 DOM
   */
  private create(): void {
    // 创建遮罩层
    this.overlay = document.createElement('div');
    this.overlay.style.cssText = STYLES.overlay;
    this.overlay.addEventListener('click', () => this.hide());

    // 创建面板容器
    this.panel = document.createElement('div');
    this.panel.style.cssText = STYLES.panel;
    this.panel.addEventListener('click', (e) => e.stopPropagation());

    // 渲染面板内容
    this.panel.innerHTML = `
      <div style="${STYLES.header}">
        <h2 style="${STYLES.title}">🔨 物品制造</h2>
        <button class="mh-close-btn" style="${STYLES.closeBtn}">×</button>
      </div>
      <div style="${STYLES.content}">
        <div style="${STYLES.formGroup}">
          <label style="${STYLES.label}">选择物品</label>
          <select class="mh-item-select" style="${STYLES.select}">
            <option value="">-- 请选择物品 --</option>
            ${this.renderItemOptions()}
          </select>
        </div>

        <div style="${STYLES.formGroup}">
          <label style="${STYLES.label}">制造数量</label>
          <input 
            type="number" 
            class="mh-count-input" 
            style="${STYLES.input}" 
            value="1" 
            min="1" 
            step="1"
          />
          <div style="${STYLES.quickAddBtns}">
            <button class="mh-quick-add-btn" data-value="10" style="${STYLES.quickAddBtn}">+10</button>
            <button class="mh-quick-add-btn" data-value="200" style="${STYLES.quickAddBtn}">+200</button>
            <button class="mh-quick-add-btn" data-value="1000" style="${STYLES.quickAddBtn}">+1000</button>
            <button class="mh-quick-add-btn" data-value="10000" style="${STYLES.quickAddBtn}">+10000</button>
          </div>
        </div>

        <div style="${STYLES.formGroup}">
          <label style="${STYLES.checkbox}">
            <input 
              type="checkbox" 
              class="mh-clear-tasks-checkbox" 
              style="${STYLES.checkboxInput}" 
              checked
            />
            清空猫咪之前的任务
          </label>
        </div>

        <div style="${STYLES.previewCard}">
          <div style="${STYLES.previewTitle}">制造计划预览</div>
          <div class="mh-preview-content" style="${STYLES.previewContent}">
            请选择物品
          </div>
        </div>

        <button class="mh-craft-btn" style="${STYLES.primaryBtn}">
          开始制造
        </button>
        <div class="mh-kitty-craft-buttons" style="${STYLES.kittyBtnContainer}"></div>

        <div style="${STYLES.kittyConfigSection}">
          <div style="${STYLES.kittyConfigTitle}">👤 当前角色默认任务</div>
          <div style="${STYLES.kittyConfigItem}">
            <span style="${STYLES.kittyConfigLabel}">默认任务1:</span>
            <select class="mh-player-default-task-1" style="${STYLES.kittyConfigSelect}">
              <option value="">无</option>
              ${this.renderItemOptions()}
            </select>
          </div>
          <div style="${STYLES.kittyConfigItem}">
            <span style="${STYLES.kittyConfigLabel}">默认任务2:</span>
            <select class="mh-player-default-task-2" style="${STYLES.kittyConfigSelect}">
              <option value="">无</option>
              ${this.renderItemOptions()}
            </select>
          </div>
        </div>
            
        <div class="mh-kitty-config-section" style="${STYLES.kittyConfigSection}; display: none;">
          <div style="${STYLES.kittyConfigTitle}">🐱 猫咪默认任务配置</div>
          <div class="mh-kitty-config-list"></div>
        </div>
      </div>
    `;

    // 添加到 DOM
    document.body.appendChild(this.overlay);
    document.body.appendChild(this.panel);

    // 缓存元素引用
    this.selectElement = this.panel.querySelector('.mh-item-select');
    this.inputElement = this.panel.querySelector('.mh-count-input');
    this.previewElement = this.panel.querySelector('.mh-preview-content');
    this.clearTasksCheckbox = this.panel.querySelector('.mh-clear-tasks-checkbox');

    // 绑定事件
    this.bindEvents();
  }

  /**
   * 渲染物品选项
   */
  private renderItemOptions(): string {
    const items = craftManager.getCraftItems();
    return items
      .map((item) => `<option value="${item.id}">${craftManager.getDisplayName(item.name)}</option>`)
      .join('');
  }

  /**
   * 更新制造计划预览
   */
  private async updatePreview(): Promise<void> {
    if (!this.selectElement || !this.inputElement || !this.previewElement) {
      return;
    }

    const itemId = this.selectElement.value;
    const count = parseInt(this.inputElement.value) || 1;

    if (!itemId) {
      this.previewElement.innerHTML = '请选择物品';
      return;
    }

    // 构建完整计划
    const plan = (craftManager as any).buildPlan(itemId, count);

    if (plan.length === 0) {
      this.previewElement.innerHTML = '⚠️ 无法计算制造计划';
      return;
    }

    // 过滤库存充足的任务
    const optimized = await (craftManager as any).optimizePlan(plan, itemId);

    if (optimized.length === 0) {
      this.previewElement.innerHTML = '✅ 库存充足，无需制造';
      return;
    }

    // 渲染计划步骤
    const stepsHTML = optimized
      .map((step: any, index: number) => {
        const isLast = index === optimized.length - 1;
        const style = isLast ? STYLES.previewStepLast : STYLES.previewStep;
        return `<div style="${style}">${index + 1}. ${step.name} ×${step.count}</div>`;
      })
      .join('');

    this.previewElement.innerHTML = stepsHTML;
  }

  /**
   * 绑定事件监听
   */
  private bindEvents(): void {
    // 关闭按钮
    this.panel?.querySelector('.mh-close-btn')?.addEventListener('click', () => {
      this.hide();
    });

    // 物品选择变化 - 实时更新预览
    this.selectElement?.addEventListener('change', () => {
      void this.updatePreview();
    });

    // 数量输入变化 - 实时更新预览
    this.inputElement?.addEventListener('input', () => {
      void this.updatePreview();
    });

    // 快速增加按钮
    this.panel?.querySelectorAll('.mh-quick-add-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const value = parseInt((btn as HTMLElement).dataset.value || '0');
        if (this.inputElement) {
          const current = parseInt(this.inputElement.value) || 0;
          this.inputElement.value = String(current + value);
          void this.updatePreview();
        }
      });

      btn.addEventListener('mouseenter', (e) => {
        (e.target as HTMLElement).style.background = '#e5e7eb';
        (e.target as HTMLElement).style.borderColor = '#6366f1';
      });

      btn.addEventListener('mouseleave', (e) => {
        (e.target as HTMLElement).style.background = '#f3f4f6';
        (e.target as HTMLElement).style.borderColor = 'rgba(0, 0, 0, 0.08)';
      });
    });

    // 开始制造按钮
    this.panel?.querySelector('.mh-craft-btn')?.addEventListener('click', () => {
      this.handleCraft();
    });

    // 渲染猫咪制造按钮
    this.renderKittyButtons();

    // 绑定当前角色默认任务配置
    this.bindPlayerDefaultTask();
  }

  /**
   * 渲染猫咪制造按钮
   */
  private async renderKittyButtons(): Promise<void> {
    const container = this.panel?.querySelector('.mh-kitty-craft-buttons');
    const configSection = this.panel?.querySelector('.mh-kitty-config-section') as HTMLElement;
    const configList = this.panel?.querySelector('.mh-kitty-config-list');
    if (!container || !configSection || !configList) return;

    try {
      const userInfo = await dataCache.getAsync('userInfo');
      const kitties = userInfo.kittyInfo || [];

      if (kitties.length === 0) {
        container.innerHTML = '';
        configSection.style.display = 'none';
        return;
      }

      const buttonsHTML = kitties
        .map(
          (kitty: any, index: number) => `
          <button 
            class="mh-kitty-craft-btn" 
            data-kitty-uuid="${kitty.uuid}"
            data-kitty-name="${kitty.name || `猫咪${index + 1}`}"
            data-kitty-index="${index}"
            style="${STYLES.kittyBtn}"
          >
            🐱 ${kitty.name || `猫咪${index + 1}`}
          </button>
        `,
        )
        .join('');

      container.innerHTML = buttonsHTML;

      // 绑定猫咪按钮事件
      container.querySelectorAll('.mh-kitty-craft-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const uuid = (btn as HTMLElement).dataset.kittyUuid!;
          const name = (btn as HTMLElement).dataset.kittyName!;
          const index = parseInt((btn as HTMLElement).dataset.kittyIndex!);
          this.handleKittyCraft(uuid, name, index);
        });
      });

      // 渲染猫咪配置
      await this.renderKittyConfig(kitties, configList);
      configSection.style.display = 'block';
    } catch {
      container.innerHTML = '';
      configSection.style.display = 'none';
    }
  }

  /**
   * 渲染猫咪默认任务配置
   */
  private async renderKittyConfig(kitties: any[], container: Element): Promise<void> {
    const items = craftManager.getCraftItems();
    const defaultKittyTasks: Record<number, string> = { 0: 'exploreNewArea', 1: 'pearlCultivation' };
    const savedTasks = await GM.getValue('kitty_default_tasks', defaultKittyTasks);

    const configHTML = kitties
      .map((kitty: any, index: number) => {
        const kittyName = kitty.name || `猫咪${index + 1}`;
        const defaultTask = savedTasks[index] || '';

        return `
          <div style="${STYLES.kittyConfigItem}">
            <span style="${STYLES.kittyConfigLabel}">${kittyName}:</span>
            <select 
              class="mh-kitty-default-task" 
              data-kitty-index="${index}"
              style="${STYLES.kittyConfigSelect}"
            >
              <option value="">无</option>
              ${items
                .map(
                  (item) => `
                <option value="${item.actionId}" ${item.actionId === defaultTask ? 'selected' : ''}>
                  ${craftManager.getDisplayName(item.name)}
                </option>
              `,
                )
                .join('')}
            </select>
          </div>
        `;
      })
      .join('');

    container.innerHTML = configHTML;

    // 绑定配置变更事件
    container.querySelectorAll('.mh-kitty-default-task').forEach((select) => {
      select.addEventListener('change', async (e) => {
        const target = e.target as HTMLSelectElement;
        const index = parseInt(target.dataset.kittyIndex!);
        const actionId = target.value;

        const tasks = await GM.getValue('kitty_default_tasks', defaultKittyTasks);
        if (actionId) {
          tasks[index] = actionId;
        } else {
          delete tasks[index];
        }
        await GM.setValue('kitty_default_tasks', tasks);
      });
    });
  }

  /**
   * 处理猫咪制造操作
   */
  private async handleKittyCraft(kittyUuid: string, kittyName: string, kittyIndex: number): Promise<void> {
    if (!this.selectElement || !this.inputElement) return;

    const itemId = this.selectElement.value;
    const count = parseInt(this.inputElement.value) || 1;
    const clearTasks = this.clearTasksCheckbox?.checked ?? true;

    if (!itemId) return;

    this.hide();
    await craftManager.craftWithKitty(kittyUuid, kittyName, kittyIndex, itemId, count, clearTasks);
  }

  /**
   * 处理制造操作
   */
  private async handleCraft(): Promise<void> {
    if (!this.selectElement || !this.inputElement) {
      return;
    }

    const itemId = this.selectElement.value;
    const count = parseInt(this.inputElement.value) || 1;

    if (!itemId) {
      return;
    }

    // 隐藏面板
    this.hide();

    // 执行制造
    await craftManager.craftWithDependencies(itemId, count);
  }

  /**
   * 绑定当前角色默认任务配置
   */
  private async bindPlayerDefaultTask(): Promise<void> {
    const select1 = this.panel?.querySelector('.mh-player-default-task-1') as HTMLSelectElement;
    const select2 = this.panel?.querySelector('.mh-player-default-task-2') as HTMLSelectElement;
    if (!select1 || !select2) return;

    const savedTasks = await GM.getValue('player_default_tasks', ['reading', 'cutBamboo']);
    select1.value = savedTasks[0] || '';
    select2.value = savedTasks[1] || '';

    select1.addEventListener('change', async () => {
      const tasks = await GM.getValue('player_default_tasks', ['reading', 'cutBamboo']);
      tasks[0] = select1.value;
      await GM.setValue('player_default_tasks', tasks);
    });

    select2.addEventListener('change', async () => {
      const tasks = await GM.getValue('player_default_tasks', ['reading', 'cutBamboo']);
      tasks[1] = select2.value;
      await GM.setValue('player_default_tasks', tasks);
    });
  }
}
