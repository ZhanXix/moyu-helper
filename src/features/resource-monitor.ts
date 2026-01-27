/**
 * 资源监控器
 * 监控游戏内资源库存，自动检测资源不足或过量并提醒
 */

import { logger, toast, dataCache } from '@/core';
import type { PanelButton, Inventory } from '@/types';
import { DEFAULT_CONFIG, STORAGE_KEYS, DEFAULT_RESOURCES } from '@/config/defaults';
import type { MonitorType, ResourceConfig, ResourceCategory } from '@/config/defaults';

interface ResourceItem {
  name: string;
  count: number;
  threshold: number;
  type?: MonitorType;
}

class ResourceMonitor {
  private resources: Record<string, ResourceConfig>;
  private enabled = false;
  private readonly storageKeys = {
    RESOURCES: STORAGE_KEYS.MONITORED_RESOURCES,
    ENABLED: STORAGE_KEYS.RESOURCE_MONITOR_ENABLED,
  };

  constructor() {
    this.resources = this.flattenCategories(DEFAULT_RESOURCES);
    void this.init();
  }

  private async init(): Promise<void> {
    try {
      this.enabled = await GM.getValue(this.storageKeys.ENABLED, DEFAULT_CONFIG.RESOURCE_MONITOR_ENABLED);
      this.resources = await this.loadResources();
      logger.success('资源监控器初始化完成');
    } catch (error) {
      logger.error('加载资源监控配置失败', error);
    }
  }

  private flattenCategories(categories: ResourceCategory[]): Record<string, ResourceConfig> {
    return categories.reduce((acc, cat) => ({ ...acc, ...cat.items }), {});
  }

  private async loadResources(): Promise<Record<string, ResourceConfig>> {
    const saved = await GM.getValue(this.storageKeys.RESOURCES, null);
    if (!saved) return this.flattenCategories(DEFAULT_RESOURCES);

    try {
      const savedData = JSON.parse(saved);
      const defaults = this.flattenCategories(DEFAULT_RESOURCES);

      if (this.hasConfigChanged(savedData, defaults)) {
        logger.info('检测到默认配置变更，合并新资源项');
        const merged = this.mergeResources(savedData, defaults);
        await GM.setValue(this.storageKeys.RESOURCES, JSON.stringify(merged));
        return merged;
      }

      return savedData;
    } catch (error) {
      logger.error('解析资源配置失败，使用默认配置', error);
      return this.flattenCategories(DEFAULT_RESOURCES);
    }
  }

  private hasConfigChanged(saved: Record<string, ResourceConfig>, defaults: Record<string, ResourceConfig>): boolean {
    const savedKeys = Object.keys(saved).sort();
    const defaultKeys = Object.keys(defaults).sort();
    return JSON.stringify(savedKeys) !== JSON.stringify(defaultKeys);
  }

  private mergeResources(
    saved: Record<string, ResourceConfig>,
    defaults: Record<string, ResourceConfig>,
  ): Record<string, ResourceConfig> {
    const merged = { ...defaults };
    for (const key of Object.keys(saved)) {
      if (key in merged) {
        merged[key] = saved[key];
      }
    }
    return merged;
  }

  async checkResources(persistent: boolean = true): Promise<void> {
    if (!this.enabled) {
      logger.debug('资源监控未启用');
      return;
    }

    try {
      const inventory = await dataCache.getAsync('inventory', true);
      this.performCheck(inventory, true, persistent);
    } catch (error) {
      logger.error('获取库存数据失败', error);
      toast.error('获取库存数据失败，请稍后重试');
    }
  }

  private performCheck(inventory: Inventory, showAlert: boolean, persistent: boolean = true): void {
    const gameResources = (unsafeWindow as any).tAllGameResource;
    if (!gameResources) {
      logger.warn('游戏资源数据未加载');
      return;
    }

    const problematicItems = this.findProblematicItems(inventory, gameResources);
    const insufficientCount = problematicItems.filter((item) => item.type === 'insufficient').length;
    const excessCount = problematicItems.filter((item) => item.type === 'excess').length;

    logger.info(`资源检查完成: ${insufficientCount} 项不足, ${excessCount} 项超过`);

    if (showAlert) {
      if (problematicItems.length > 0) {
        this.showAlert(problematicItems, persistent);
      } else {
        toast.success('✅ 所有资源充足，无需补充', 3000);
      }
    }
  }

  private findProblematicItems(inventory: Inventory, gameResources: any): ResourceItem[] {
    const items: ResourceItem[] = [];

    for (const [id, config] of Object.entries(this.resources)) {
      const count = inventory[id]?.count || 0;
      const isProblematic = config.type === 'insufficient' ? count < config.threshold : count > config.threshold;

      if (isProblematic) {
        items.push({
          name: gameResources[id]?.name || id,
          count,
          threshold: config.threshold,
          type: config.type,
        });
      }
    }

    return items;
  }

  private showAlert(items: ResourceItem[], persistent: boolean = true): void {
    const categorized = this.categorizeItems(items);
    const insufficientCount = items.filter((item) => item.type === 'insufficient').length;
    const excessCount = items.filter((item) => item.type === 'excess').length;
    const content = this.buildAlertHTML(insufficientCount, excessCount, categorized);

    if (persistent) {
      toast.confirm(content);
    } else {
      toast.warning(content, 5000);
    }
  }

  private categorizeItems(items: ResourceItem[]): Array<{ name: string; items: ResourceItem[] }> {
    const gameResources = (unsafeWindow as any).tAllGameResource;
    if (!gameResources) return [];

    const result: Array<{ name: string; items: ResourceItem[] }> = [];

    for (const category of DEFAULT_RESOURCES) {
      const categoryItems = items.filter((item) => {
        const itemId = Object.keys(gameResources).find((id) => gameResources[id]?.name === item.name);
        return itemId && itemId in category.items;
      });

      if (categoryItems.length > 0) {
        result.push({ name: category.name, items: categoryItems });
      }
    }

    return result;
  }

  private buildAlertHTML(
    insufficientCount: number,
    excessCount: number,
    categories: Array<{ name: string; items: ResourceItem[] }>,
  ): string {
    const title =
      insufficientCount > 0 && excessCount > 0
        ? `⚠️ 资源监控警告 (${insufficientCount}项不足, ${excessCount}项超过)`
        : insufficientCount > 0
          ? `⚠️ 资源不足警告 (${insufficientCount}项)`
          : `📦 资源超过警告 (${excessCount}项)`;

    const categoryHTML = categories
      .map(
        (cat) => `
        <div style="margin-bottom: 8px;">
          <div style="font-size: 13px; font-weight: 600; color: #666; margin-bottom: 4px;">${cat.name}</div>
          <div class="resource-grid">
            ${cat.items
              .map((item) => {
                const diff = item.type === 'insufficient' ? item.threshold - item.count : item.count - item.threshold;
                const diffText = item.type === 'insufficient' ? `-${diff}` : `+${diff}`;
                return `<div class="resource-item">${item.name}: ${item.count}/${item.threshold} (${diffText})</div>`;
              })
              .join('')}
          </div>
        </div>
      `,
      )
      .join('');

    return `
      <style>
        .resource-grid { display: flex; flex-wrap: wrap; gap: 4px; padding-left: 12px; }
        .resource-item { width: calc(50% - 2px); box-sizing: border-box; font-size: 12px; }
        @media (max-width: 768px) { .resource-item { width: 100%; } }
      </style>
      <div style="text-align: left;">
        <div style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">${title}</div>
        ${categoryHTML}
      </div>
    `;
  }

  getButton(): PanelButton | null {
    return this.enabled ? { text: '📦 查看库存', onClick: () => void this.checkResources() } : null;
  }

  getMonitoredResources(): Record<string, ResourceConfig> {
    return { ...this.resources };
  }

  getMonitoredResourcesWithNames(): Array<{ id: string; name: string; threshold: number; type: MonitorType }> {
    const gameResources = (unsafeWindow as any).tAllGameResource;
    if (!gameResources) return [];

    return Object.entries(this.resources).map(([id, config]) => ({
      id,
      name: gameResources[id]?.name || id,
      threshold: config.threshold,
      type: config.type,
    }));
  }

  getMonitoredResourcesByCategory(): ResourceCategory[] {
    const gameResources = (unsafeWindow as any).tAllGameResource;
    if (!gameResources) return [];

    return DEFAULT_RESOURCES.map((category) => ({
      name: category.name,
      items: Object.fromEntries(
        Object.keys(category.items).map((id) => [id, this.resources[id] ?? category.items[id]]),
      ),
    }));
  }

  async setMonitoredResources(resources: Record<string, ResourceConfig>): Promise<void> {
    this.resources = resources;
    await GM.setValue(this.storageKeys.RESOURCES, JSON.stringify(resources));
    logger.info('资源配置已更新');
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  async setEnabled(enabled: boolean): Promise<void> {
    if (this.enabled === enabled) return;

    this.enabled = enabled;
    await GM.setValue(this.storageKeys.ENABLED, enabled);
    logger.info(`资源监控已${enabled ? '启用' : '禁用'}`);

    // 触发设置更新事件
    window.dispatchEvent(new Event('settings-updated'));
  }
}

export const resourceMonitor = new ResourceMonitor();
