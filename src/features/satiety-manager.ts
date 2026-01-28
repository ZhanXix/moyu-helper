/**
 * 饱食度管理器
 * 自动监控饱食度并使用食物
 */

import { logger, toast, dataCache, ws } from '@/core';
import { STORAGE_KEYS, DEFAULT_CONFIG, type FoodType } from '@/config/defaults';
import { analytics } from '@/utils';

class SatietyManager {
  private isInitialized = false;
  private isChecking = false;
  private enabled = false;
  private foodType: FoodType = 'berry';

  async init(): Promise<void> {
    if (this.isInitialized) return;

    this.enabled = await GM.getValue(STORAGE_KEYS.AUTO_USE_BERRY_ENABLED, DEFAULT_CONFIG.AUTO_USE_BERRY_ENABLED);
    this.foodType = await GM.getValue(STORAGE_KEYS.AUTO_USE_BERRY_FOOD_TYPE, DEFAULT_CONFIG.AUTO_USE_BERRY_FOOD_TYPE);

    dataCache.getAsync('inventory').then(() => {
      this.checkAndUseFood();
    });

    ws.on('dispatchInventoryInfo', () => {
      this.checkAndUseFood();
    });

    this.isInitialized = true;
    logger.success('饱食度管理器初始化完成');
  }

  private async checkAndUseFood(): Promise<void> {
    if (this.isChecking || !this.enabled) return;
    this.isChecking = true;

    try {
      const inventory = await dataCache.getAsync('inventory');
      const satiety = inventory['__satiety'];

      if (!satiety) return;

      const threshold = await GM.getValue(STORAGE_KEYS.AUTO_USE_BERRY_THRESHOLD, DEFAULT_CONFIG.AUTO_USE_BERRY_THRESHOLD);
      const target = await GM.getValue(STORAGE_KEYS.AUTO_USE_BERRY_TARGET, DEFAULT_CONFIG.AUTO_USE_BERRY_TARGET);
      const currentSatiety = satiety.count;

      if (currentSatiety < threshold) {
        let remaining = target - currentSatiety;
        let totalUsed = 0;
        
        while (remaining > 0) {
          const useAmount = Math.min(remaining, 100000);
          await ws.sendAndListen('effectAction:useItem', { itemId: this.foodType, multiple: useAmount });
          totalUsed += useAmount;
          remaining -= useAmount;
        }
        
        const foodName = this.foodType === 'berry' ? '浆果' : this.foodType === 'fish' ? '鱼' : '豪华猫粮';
        logger.info(`当前饱食度: ${currentSatiety}, 已使用${foodName}: ${totalUsed}`);
        toast.success(`✅ 已使用 ${totalUsed} ${foodName}`);
        analytics.track('饱食度', '自动使用食物', `${foodName}x${totalUsed}`);
      }
    } catch (error) {
      logger.error('检查饱食度失败', error);
    } finally {
      this.isChecking = false;
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  async setEnabled(enabled: boolean): Promise<void> {
    this.enabled = enabled;
    await GM.setValue(STORAGE_KEYS.AUTO_USE_BERRY_ENABLED, enabled);
    logger.info(`饱食度管理已${enabled ? '启用' : '禁用'}`);
  }

  getFoodType(): FoodType {
    return this.foodType;
  }

  async setFoodType(foodType: FoodType): Promise<void> {
    this.foodType = foodType;
    await GM.setValue(STORAGE_KEYS.AUTO_USE_BERRY_FOOD_TYPE, foodType);
    const foodName = foodType === 'berry' ? '浆果' : foodType === 'fish' ? '鱼' : '豪华猫粮';
    logger.info(`食物类型已设置为: ${foodName}`);
  }
}

export const satietyManager = new SatietyManager();
