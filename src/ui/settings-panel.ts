/**
 * 设置面板组件
 *
 * 功能说明：
 * - 提供系统设置界面
 * - 支持任务队列、物品使用、资源监控配置
 * - 分类折叠显示资源项
 * - 支持清空所有设置
 */

import type { resourceMonitor } from '@/features';
import { DEFAULT_CONFIG, STORAGE_KEYS } from '@/config/defaults';
import { logger, toast } from '@/core';
import { taskQueue } from '@/utils/task-queue';

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
  card: `
    background: #f8f9fa;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    padding: 14px;
    margin-bottom: 14px;
  `,
  cardTitle: `
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 12px;
  `,
  section: `
    margin-bottom: 14px;
    overflow: hidden;
  `,
  sectionTitle: `
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 0;
    color: #333;
    letter-spacing: -0.2px;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    color: white;
    transition: all 0.2s ease;
  `,
  categoryArrow: `
    font-size: 12px;
    transition: transform 0.3s ease;
    display: inline-block;
  `,
  categoryContent: `
    overflow: hidden;
    transition: max-height 0.3s ease, opacity 0.3s ease;
    margin-top: 10px;
    padding: 0 2px;
  `,
  toggle: `
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    margin-bottom: 10px;
    transition: all 0.2s ease;
    font-size: 13px;
  `,
  checkbox: `
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #6366f1;
  `,
  resourceItem: `
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 10px;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 5px;
    margin-bottom: 5px;
    transition: all 0.2s ease;
    gap: 6px;
  `,
  resourceName: `
    flex: 1;
    font-size: 11px;
    color: #333;
  `,
  resourceControls: `
    display: flex;
    align-items: center;
    gap: 4px;
  `,
  select: `
    width: 50px;
    padding: 6px 4px;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    color: #1a1a1a;
    font-size: 12px;
    outline: none;
    transition: all 0.2s ease;
    -webkit-appearance: none;
    appearance: none;
  `,
  input: `
    width: 60px;
    padding: 4px 6px;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    color: #1a1a1a;
    font-size: 11px;
    text-align: center;
    outline: none;
    transition: all 0.2s ease;
  `,
  button: `
    padding: 11px 20px;
    background: #6366f1;
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
    margin-top: 12px;
  `,
  dangerButton: `
    padding: 11px 20px;
    background: #ef4444;
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
    margin-top: 8px;
  `,
};

/**
 * 设置面板类
 */
class SettingsPanel {
  private overlay: HTMLDivElement | null = null;
  private panel: HTMLDivElement | null = null;
  private resourceMonitor: typeof resourceMonitor | null = null;
  private eventHandlers: Map<Element, Map<string, EventListener>> = new Map();

  /**
   * 设置资源监控器引用
   */
  setResourceMonitor(monitor: typeof resourceMonitor): void {
    this.resourceMonitor = monitor;
  }

  /**
   * 显示设置面板
   */
  show(): void {
    this.create();
  }

  /**
   * 隐藏设置面板
   */
  hide(): void {
    if (!this.panel) return;
    this.overlay!.style.opacity = '0';
    this.panel.style.opacity = '0';
    setTimeout(() => {
      this.cleanup();
    }, 300);
  }

  /**
   * 清理资源
   */
  private cleanup(): void {
    // 清理事件监听器
    this.eventHandlers.forEach((handlers, element) => {
      handlers.forEach((handler, event) => {
        element.removeEventListener(event, handler);
      });
    });
    this.eventHandlers.clear();

    // 移除DOM元素
    this.overlay?.remove();
    this.panel?.remove();
    this.overlay = null;
    this.panel = null;
  }

  /**
   * 创建面板
   */
  private create(): void {
    if (this.panel) return;
    this.createOverlay();
    this.createPanel();
  }

  private createOverlay(): void {
    this.overlay = document.createElement('div');
    this.overlay.style.cssText = STYLES.overlay;
    this.overlay.addEventListener('click', () => this.hide());
    document.body.appendChild(this.overlay);
  }

  private async createPanel(): Promise<void> {
    this.panel = document.createElement('div');
    this.panel.style.cssText = STYLES.panel;

    this.panel.innerHTML = `
      <div style="${STYLES.header}">
        <h2 style="${STYLES.title}">⚙️ 设置</h2>
        <button class="mh-close-btn" style="${STYLES.closeBtn}">✕</button>
      </div>
      <div style="${STYLES.content}">
        ${await this.renderContent()}
      </div>
    `;

    this.panel.querySelector('.mh-close-btn')?.addEventListener('click', () => this.hide());
    this.bindEvents();

    document.body.appendChild(this.panel);

    this.overlay!.style.display = 'block';
    this.panel.style.display = 'flex';
    requestAnimationFrame(() => {
      this.overlay!.style.opacity = '1';
      this.panel!.style.opacity = '1';
    });
  }

  /**
   * 渲染面板内容
   */
  private async renderContent(): Promise<string> {
    const enabled = this.resourceMonitor?.isEnabled() ?? DEFAULT_CONFIG.RESOURCE_MONITOR_ENABLED;
    const resources = this.resourceMonitor?.getMonitoredResourcesByCategory() ?? [];
    const batchSize = await GM.getValue(STORAGE_KEYS.QUEST_BATCH_SIZE, DEFAULT_CONFIG.QUEST_BATCH_SIZE);
    const taskInterval = await GM.getValue(STORAGE_KEYS.TASK_INTERVAL, DEFAULT_CONFIG.TASK_INTERVAL);
    const skillBookUseCount = await GM.getValue(STORAGE_KEYS.ITEM_USE_COUNT, DEFAULT_CONFIG.ITEM_USE_COUNT);
    const consoleLogEnabled = await GM.getValue(STORAGE_KEYS.CONSOLE_LOG_ENABLED, DEFAULT_CONFIG.CONSOLE_LOG_ENABLED);

    return `
      <div style="${STYLES.card}">
        <div style="${STYLES.cardTitle}">🎯 任务队列配置</div>
        <div style="${STYLES.toggle}">
          <span>批次大小</span>
          <input 
            type="number" 
            id="batch-size" 
            value="${batchSize}"
            min="1"
            max="100"
            step="1"
            style="${STYLES.input}"
          >
        </div>
        <div style="${STYLES.toggle}">
          <span>任务间隔(秒)</span>
          <input 
            type="number" 
            id="task-interval" 
            value="${taskInterval}"
            min="0.1"
            max="10"
            step="0.1"
            style="${STYLES.input}"
          >
        </div>
      </div>

      <div style="${STYLES.card}">
        <div style="${STYLES.cardTitle}">🎒 物品使用配置</div>
        <div style="${STYLES.toggle}">
          <span>使用次数</span>
          <input 
            type="number" 
            id="item-use-count" 
            value="${skillBookUseCount}"
            min="1"
            max="100"
            step="1"
            style="${STYLES.input}"
          >
        </div>
      </div>

      <div style="${STYLES.card}">
        <div style="${STYLES.cardTitle}">🔍 调试配置</div>
        <div style="${STYLES.toggle}">
          <span>开启控制台打印</span>
          <input type="checkbox" id="console-log-enabled" ${consoleLogEnabled ? 'checked' : ''} style="${STYLES.checkbox}">
        </div>
      </div>

      <div style="${STYLES.card}">
        <div style="${STYLES.cardTitle}">📊 资源监控配置</div>
        <div style="${STYLES.toggle}">
          <span>启用资源监控</span>
          <input type="checkbox" id="monitor-enabled" ${enabled ? 'checked' : ''} style="${STYLES.checkbox}">
        </div>

        ${resources
          .map(
            (category, index) => `
          <div style="${STYLES.section}">
            <div class="mh-category-header" style="${STYLES.sectionTitle}" data-category="${index}">
              <span class="mh-category-arrow" style="font-size: 12px; transition: transform 0.3s ease;">▶</span>
              <span>${category.name}</span>
            </div>
            <div class="mh-category-content" style="${STYLES.categoryContent}; max-height: 0; opacity: 0;">
              ${Object.entries(category.items)
                .map(([id, config]) => {
                  const resource = this.getResourceName(id);
                  const threshold = typeof config === 'number' ? config : config.threshold;
                  const type = typeof config === 'number' ? 'insufficient' : config.type;
                  return `
                  <div class="mh-resource-item-container" style="${STYLES.resourceItem}">
                    <span style="${STYLES.resourceName}">${resource}</span>
                    <div style="${STYLES.resourceControls}">
                      <select 
                        class="mh-resource-type" 
                        data-id="${id}"
                        style="${STYLES.select}"
                      >
                        <option value="insufficient" ${type === 'insufficient' ? 'selected' : ''}>不足</option>
                        <option value="excess" ${type === 'excess' ? 'selected' : ''}>超过</option>
                      </select>
                      <input 
                        type="number" 
                        class="mh-resource-input" 
                        data-id="${id}" 
                        value="${threshold}"
                        min="0"
                        step="100"
                        style="${STYLES.input}"
                      >
                    </div>
                  </div>
                `;
                })
                .join('')}
            </div>
          </div>
        `,
          )
          .join('')}
      </div>

      <button class="mh-save-btn" style="${STYLES.button}">保存设置</button>
      <button class="mh-clear-btn" style="${STYLES.dangerButton}">清空所有设置</button>
    `;
  }

  private getResourceName(id: string): string {
    const resources = (unsafeWindow as any).tAllGameResource;
    return resources?.[id]?.name || id;
  }

  /**
   * 添加事件监听器（带追踪）
   */
  private addEventListener(element: Element, event: string, handler: EventListener): void {
    element.addEventListener(event, handler);
    if (!this.eventHandlers.has(element)) {
      this.eventHandlers.set(element, new Map());
    }
    this.eventHandlers.get(element)!.set(event, handler);
  }

  /**
   * 绑定事件监听器
   */
  private bindEvents(): void {
    if (!this.panel) return;

    const closeBtn = this.panel.querySelector<HTMLButtonElement>('.mh-close-btn');
    if (closeBtn) {
      this.addEventListener(closeBtn, 'mouseenter', (e) => {
        (e.target as HTMLElement).style.background = 'rgba(0, 0, 0, 0.05)';
      });
      this.addEventListener(closeBtn, 'mouseleave', (e) => {
        (e.target as HTMLElement).style.background = 'transparent';
      });
    }

    const saveBtn = this.panel.querySelector<HTMLButtonElement>('.mh-save-btn');
    if (saveBtn) {
      this.addEventListener(saveBtn, 'mouseenter', (e) => {
        const el = e.target as HTMLElement;
        el.style.transform = 'translateY(-2px)';
        el.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.3)';
        el.style.background = '#5558e3';
      });
      this.addEventListener(saveBtn, 'mouseleave', (e) => {
        const el = e.target as HTMLElement;
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = 'none';
        el.style.background = '#6366f1';
      });
      this.addEventListener(saveBtn, 'click', () => this.saveSettings());
    }

    const clearBtn = this.panel.querySelector<HTMLButtonElement>('.mh-clear-btn');
    if (clearBtn) {
      this.addEventListener(clearBtn, 'mouseenter', (e) => {
        const el = e.target as HTMLElement;
        el.style.transform = 'translateY(-2px)';
        el.style.boxShadow = '0 8px 24px rgba(239, 68, 68, 0.3)';
        el.style.background = '#dc2626';
      });
      this.addEventListener(clearBtn, 'mouseleave', (e) => {
        const el = e.target as HTMLElement;
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = 'none';
        el.style.background = '#ef4444';
      });
      this.addEventListener(clearBtn, 'click', () => this.clearAllSettings());
    }

    // 类别折叠功能
    this.panel.querySelectorAll('.mh-category-header').forEach((header) => {
      this.addEventListener(header, 'click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const content = target.nextElementSibling as HTMLElement;
        const arrow = target.querySelector('.mh-category-arrow') as HTMLElement;
        const isCollapsed = content.style.maxHeight === '0px' || !content.style.maxHeight;

        if (isCollapsed) {
          content.style.maxHeight = content.scrollHeight + 'px';
          content.style.opacity = '1';
          arrow.style.transform = 'rotate(90deg)';
        } else {
          content.style.maxHeight = '0';
          content.style.opacity = '0';
          arrow.style.transform = 'rotate(0deg)';
        }
      });

      this.addEventListener(header, 'mouseenter', (e) => {
        (e.currentTarget as HTMLElement).style.filter = 'brightness(1.05)';
      });
      this.addEventListener(header, 'mouseleave', (e) => {
        (e.currentTarget as HTMLElement).style.filter = 'brightness(1)';
      });
    });

    // 资源项hover效果
    this.panel.querySelectorAll('.mh-resource-item-container').forEach((item) => {
      this.addEventListener(item, 'mouseenter', (e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = '#f9fafb';
        el.style.borderColor = '#6366f1';
        el.style.boxShadow = '0 2px 8px rgba(99, 102, 241, 0.15)';
      });
      this.addEventListener(item, 'mouseleave', (e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = 'white';
        el.style.borderColor = '#e5e7eb';
        el.style.boxShadow = 'none';
      });
    });

    // 输入框聚焦效果
    this.panel.querySelectorAll<HTMLInputElement>('.mh-resource-input').forEach((input) => {
      this.addEventListener(input, 'focus', (e) => {
        const el = e.target as HTMLElement;
        el.style.borderColor = '#6366f1';
        el.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
      });
      this.addEventListener(input, 'blur', (e) => {
        const el = e.target as HTMLElement;
        el.style.borderColor = 'rgba(0, 0, 0, 0.12)';
        el.style.boxShadow = 'none';
      });
    });

    // 类型选择器聚焦效果
    this.panel.querySelectorAll<HTMLSelectElement>('.mh-resource-type').forEach((select) => {
      this.addEventListener(select, 'focus', (e) => {
        const el = e.target as HTMLElement;
        el.style.borderColor = '#6366f1';
        el.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
      });
      this.addEventListener(select, 'blur', (e) => {
        const el = e.target as HTMLElement;
        el.style.borderColor = 'rgba(0, 0, 0, 0.12)';
        el.style.boxShadow = 'none';
      });
    });
  }

  /**
   * 保存设置
   */
  private async saveSettings(): Promise<void> {
    if (!this.panel) return;

    const batchSizeInput = this.panel.querySelector<HTMLInputElement>('#batch-size');
    const taskIntervalInput = this.panel.querySelector<HTMLInputElement>('#task-interval');
    const skillBookUseCountInput = this.panel.querySelector<HTMLInputElement>('#item-use-count');

    if (batchSizeInput) {
      const batchSize = parseInt(batchSizeInput.value) || DEFAULT_CONFIG.QUEST_BATCH_SIZE;
      await GM.setValue(STORAGE_KEYS.QUEST_BATCH_SIZE, batchSize);
      taskQueue.setBatchSize(batchSize);
    }

    if (taskIntervalInput) {
      const interval = parseFloat(taskIntervalInput.value) || DEFAULT_CONFIG.TASK_INTERVAL;
      await GM.setValue(STORAGE_KEYS.TASK_INTERVAL, interval);
      taskQueue.setInterval(Math.round(interval * 1000));
    }

    if (skillBookUseCountInput) {
      const useCount = parseInt(skillBookUseCountInput.value) || DEFAULT_CONFIG.ITEM_USE_COUNT;
      await GM.setValue(STORAGE_KEYS.ITEM_USE_COUNT, useCount);
    }

    const consoleLogEnabledInput = this.panel.querySelector<HTMLInputElement>('#console-log-enabled');
    if (consoleLogEnabledInput) {
      const enabled = consoleLogEnabledInput.checked;
      await GM.setValue(STORAGE_KEYS.CONSOLE_LOG_ENABLED, enabled);
      logger.setEnabled(enabled);
    }

    if (this.resourceMonitor) {
      const monitorEnabled = this.panel.querySelector<HTMLInputElement>('#monitor-enabled');
      if (monitorEnabled) {
        this.resourceMonitor.setEnabled(monitorEnabled.checked);
      }

      const inputs = this.panel.querySelectorAll<HTMLInputElement>('.mh-resource-input');
      const typeSelects = this.panel.querySelectorAll<HTMLSelectElement>('.mh-resource-type');
      const resources: Record<string, { threshold: number; type: 'insufficient' | 'excess' }> = {};

      inputs.forEach((input) => {
        const id = input.dataset.id;
        if (id) {
          const typeSelect = Array.from(typeSelects).find((select) => select.dataset.id === id);
          const type = (typeSelect?.value as 'insufficient' | 'excess') || 'insufficient';
          resources[id] = {
            threshold: parseInt(input.value) || 0,
            type: type,
          };
        }
      });

      await this.resourceMonitor.setMonitoredResources(resources);
    }

    toast.success('设置已保存');

    // 触发菜单刷新事件
    window.dispatchEvent(new CustomEvent('settings-updated'));

    this.hide();
  }

  /**
   * 清空所有设置
   */
  private async clearAllSettings(): Promise<void> {
    if (!confirm('确定要清空所有设置吗？此操作不可恢复！')) return;

    await GM.setValue(STORAGE_KEYS.QUEST_BATCH_SIZE, DEFAULT_CONFIG.QUEST_BATCH_SIZE);
    await GM.setValue(STORAGE_KEYS.TASK_INTERVAL, DEFAULT_CONFIG.TASK_INTERVAL);
    await GM.setValue(STORAGE_KEYS.ITEM_USE_COUNT, DEFAULT_CONFIG.ITEM_USE_COUNT);
    await GM.setValue(STORAGE_KEYS.RESOURCE_MONITOR_ENABLED, DEFAULT_CONFIG.RESOURCE_MONITOR_ENABLED);
    await GM.setValue(STORAGE_KEYS.MONITORED_RESOURCES, {});
    await GM.setValue(STORAGE_KEYS.KITTY_DEFAULT_TASKS, {});
    await GM.setValue(STORAGE_KEYS.CONSOLE_LOG_ENABLED, DEFAULT_CONFIG.CONSOLE_LOG_ENABLED);
    logger.setEnabled(DEFAULT_CONFIG.CONSOLE_LOG_ENABLED);

    taskQueue.setBatchSize(DEFAULT_CONFIG.QUEST_BATCH_SIZE);
    taskQueue.setInterval(DEFAULT_CONFIG.TASK_INTERVAL * 1000);

    if (this.resourceMonitor) {
      this.resourceMonitor.setEnabled(DEFAULT_CONFIG.RESOURCE_MONITOR_ENABLED);
      await this.resourceMonitor.setMonitoredResources({});
    }

    toast.success('所有设置已清空');

    this.hide();
    location.reload();
  }
}

export const settingsPanel = new SettingsPanel();
