/**
 * 任务管理器
 * 自动刷新和执行游戏任务
 */

import { toast, ws, logger } from '@/core';
import { DEFAULT_CONFIG, STORAGE_KEYS } from '@/config/defaults';
import { analytics } from '@/utils';

interface Quest {
  uuid: string;
  title: string;
  actionMainType: string;
  status: string;
  target: {
    actionId: string;
    count: number;
    current: number;
  };
}

interface QuestManagerConfig {
  excludedKeywords: string[];
  requiredPrefix: string;
}

class QuestManager {
  private config: QuestManagerConfig = {
    excludedKeywords: [],
    requiredPrefix: '',
  };

  async init(): Promise<void> {
    const prefix = await GM.getValue(STORAGE_KEYS.QUEST_REQUIRED_PREFIX, DEFAULT_CONFIG.QUEST_REQUIRED_PREFIX);
    const keywords = await GM.getValue(STORAGE_KEYS.QUEST_EXCLUDED_KEYWORDS, DEFAULT_CONFIG.QUEST_EXCLUDED_KEYWORDS);
    this.config.requiredPrefix = prefix;
    this.config.excludedKeywords = keywords.split(',').map((k) => k.trim()).filter(Boolean);
  }

  private isValidQuest(quest: Quest): boolean {
    return (
      quest.title.startsWith(this.config.requiredPrefix) &&
      !this.config.excludedKeywords.some((keyword) => quest.title.includes(keyword))
    );
  }

  private async fetchQuests(): Promise<Quest[]> {
    const res = await ws.sendAndListen('quest:list');
    return res.payload.data || [];
  }

  private async completeAllQuests(quests: Quest[]): Promise<Quest[]> {
    const hasCompletedQuests = quests.some((q) => q.status !== 'PENDING');
    if (hasCompletedQuests) {
      await ws.send('quest:completeAll');
      await new Promise((r) => setTimeout(r, 500));
      return this.fetchQuests();
    }
    return quests;
  }

  private async rerollQuest(quest: Quest): Promise<Quest> {
    let current = quest;
    let attempts = 0;
    const maxAttempts = 50; // 防止无限循环

    while (!this.isValidQuest(current) && attempts < maxAttempts) {
      attempts++;
      const res = await ws.sendAndListen('quest:reroll', { questUuid: current.uuid });
      const updated = res.payload?.data?.newQuest;

      if (!updated?.title) {
        logger.warn(`任务刷新失败，保留原任务: ${current.title}`);
        break;
      }

      current = updated;
    }

    if (attempts >= maxAttempts) {
      logger.warn(`任务刷新达到最大尝试次数: ${quest.title}`);
    }

    return current;
  }

  private deduplicateQuests(quests: Quest[]): Quest[] {
    const map = new Map<string, Quest>();

    quests.forEach((quest) => {
      const id = quest.target.actionId;
      const existing = map.get(id);

      if (!existing || quest.target.count > existing.target.count) {
        map.set(id, quest);
      }
    });

    return Array.from(map.values());
  }

  private async startQuests(quests: Quest[]): Promise<void> {
    if (quests.length === 0) {
      logger.info('没有需要执行的任务');
      return;
    }

    for (const quest of quests) {
      await ws.send('task:immediatelyStart', {
        actionId: quest.target.actionId,
        repeatCount: quest.target.count,
        currentRepeat: 0,
        createTime: Date.now(),
      });
    }

    toast.success(`✅ 已添加 ${quests.length} 个任务到执行队列`);
    logger.success(`已添加 ${quests.length} 个任务`);
    analytics.track('任务', '刷新任务', `${quests.length}个`);
  }

  async refreshCards(): Promise<void> {
    await this.init();

    // 首次运行提示
    const isFirstRun = await GM.getValue(STORAGE_KEYS.QUEST_FIRST_RUN, true);
    if (isFirstRun) {
      return new Promise((resolve) => {
        toast.confirm(
          `<strong>任务自动刷新说明</strong><br><br>
          • 自动提交已完成的任务<br>
          • 刷新不符合条件的任务（前缀: ${this.config.requiredPrefix}）<br>
          • 排除关键词: ${this.config.excludedKeywords.join('、') || '无'}<br>
          • 自动去重并添加到执行队列<br><br>
          <small>可在设置中修改筛选条件</small>`,
          async () => {
            await GM.setValue(STORAGE_KEYS.QUEST_FIRST_RUN, false);
            await this.executeRefresh();
            resolve();
          }
        );
      });
    }

    await this.executeRefresh();
  }

  private async executeRefresh(): Promise<void> {
    const progress = toast.progress('正在获取任务列表...');

    try {
      let quests = await this.fetchQuests();

      // 提交已完成的任务
      if (quests.some((q) => q.status !== 'PENDING')) {
        progress.update('检测到已完成任务，正在提交...');
        quests = await this.completeAllQuests(quests);
      }

      // 筛选需要刷新的任务
      const toReroll = quests.filter((q) => q.status === 'PENDING' && !this.isValidQuest(q));

      if (toReroll.length === 0) {
        progress.update('所有任务已满足条件，开始执行...');
        const validQuests = quests.filter((q) => q.status === 'PENDING' && this.isValidQuest(q));
        const uniqueQuests = this.deduplicateQuests(validQuests);
        await this.startQuests(uniqueQuests);
        progress.hide();
        return;
      }

      // 刷新不符合条件的任务
      progress.update(`需要刷新 ${toReroll.length} 个任务`);
      for (let i = 0; i < toReroll.length; i++) {
        progress.update(`[${i + 1}/${toReroll.length}] 刷新中: ${toReroll[i].title}`);
        await this.rerollQuest(toReroll[i]);
      }

      // 获取最终任务列表并执行
      progress.update('任务刷新完成，开始执行...');
      const finalQuests = await this.fetchQuests();
      const validQuests = finalQuests.filter((q) => q.status === 'PENDING' && this.isValidQuest(q));
      const uniqueQuests = this.deduplicateQuests(validQuests);

      await this.startQuests(uniqueQuests);
      progress.hide();
    } catch (error) {
      logger.error('任务处理失败', error);
      progress.hide();
      toast.error('任务处理失败，请稍后重试');
    }
  }
}

export const questManager = new QuestManager();
