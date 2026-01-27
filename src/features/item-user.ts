/**
 * 物品管理器
 * 批量使用游戏物品
 */

import { logger, toast, ws } from '@/core';
import { DEFAULT_CONFIG, STORAGE_KEYS } from '@/config/defaults';

class ItemManager {
  private progress: any = null;
  private isRunning = false;

  async useAll(): Promise<void> {
    if (this.isRunning) {
      toast.warning('物品使用进行中，请稍候...');
      return;
    }

    this.isRunning = true;
    this.progress = toast.progress('开始使用物品...');

    try {
      const count = await GM.getValue(STORAGE_KEYS.ITEM_USE_COUNT, DEFAULT_CONFIG.ITEM_USE_COUNT);
      logger.info(`开始使用浆果，循环次数: ${count}`);

      let successCount = 0;
      let failedCount = 0;

      for (let i = 0; i < count; i++) {
        this.progress.update(`使用浆果: ${i + 1}/${count}`);

        const success = await this.useItem('berry', 100000);
        if (success) {
          successCount++;
        } else {
          failedCount++;
        }
      }

      this.progress.hide();
      this.progress = null;

      if (failedCount > 0) {
        toast.warning(`浆果使用完成！成功: ${successCount}, 失败: ${failedCount}`);
      } else {
        toast.success(`✅ 浆果使用完成！成功: ${successCount}/${count}`);
      }

      logger.success(`浆果使用完成: 成功 ${successCount}, 失败 ${failedCount}`);
    } catch (error) {
      logger.error('物品使用失败', error);
      this.progress?.hide();
      this.progress = null;
      toast.error('物品使用失败，请稍后重试');
    } finally {
      this.isRunning = false;
    }
  }

  private async useItem(itemId: string, multiple: number): Promise<boolean> {
    try {
      await ws.sendAndListen('effectAction:useItem', { itemId, multiple });
      return true;
    } catch (error) {
      logger.error(`使用物品失败: ${itemId}`, error);
      return false;
    }
  }
}

export const itemManager = new ItemManager();
