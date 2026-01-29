/**
 * 监控类型
 * - insufficient: 资源不足监控（低于阈值时报警）
 * - excess: 资源过量监控（高于阈值时报警）
 */
export type MonitorType = 'insufficient' | 'excess';

/**
 * 食物类型
 */
export type FoodType = 'berry' | 'fish' | 'luxuryCatFood';

/**
 * 资源配置接口
 */
export interface ResourceConfig {
  threshold: number;
  type: MonitorType;
}

/**
 * 资源分类接口
 */
export interface ResourceCategory {
  name: string;
  items: Record<string, ResourceConfig>;
}

/**
 * 应用配置接口
 */
export interface AppConfig {
  QUEST_BATCH_SIZE: number;
  TASK_INTERVAL: number;
  BATCH_DELAY: number;
  RESOURCE_MONITOR_ENABLED: boolean;
  AUTO_BUY_BASE_RESOURCES: boolean;
  AUTO_USE_BERRY_ENABLED: boolean;
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error' | 'success' | 'none';
  AUTO_USE_BERRY_THRESHOLD: number;
  AUTO_USE_BERRY_TARGET: number;
  AUTO_USE_BERRY_FOOD_TYPE: FoodType;
  QUEST_GOLD_LIMIT: number;
  QUEST_DEFAULT_SELECTED_TASKS: Record<string, Record<string, boolean>>;
  QUEST_MANAGER_ENABLED: boolean;
  BATTLE_GUARD_ENABLED: boolean;
  QUALITY_TOOLBAR_ENABLED: boolean;
  TAVERN_EXPERT_ENABLED: boolean;
  CRAFT_PANEL_ENABLED: boolean;
  SKILL_ALLOCATION_ENABLED: boolean;
  QUICK_ALCHEMY_ENABLED: boolean;
}

/**
 * 默认配置常量
 */
export const DEFAULT_CONFIG: Readonly<AppConfig> = {
  // 任务队列配置
  QUEST_BATCH_SIZE: 20, // 每批任务数量
  TASK_INTERVAL: 300, // 任务间隔（毫秒）
  BATCH_DELAY: 5000, // 批次间隔（毫秒）

  // 资源监控配置
  RESOURCE_MONITOR_ENABLED: false, // 默认关闭资源监控
  AUTO_BUY_BASE_RESOURCES: false, // 默认关闭自动购买基础资源

  // 日志级别配置
  LOG_LEVEL: 'none', // 默认不显示日志

  // 自动使用浆果配置
  AUTO_USE_BERRY_ENABLED: false, // 默认关闭自动使用浆果
  AUTO_USE_BERRY_THRESHOLD: 500000, // 饱食度低于此值时自动使用浆果
  AUTO_USE_BERRY_TARGET: 600000, // 使用浆果后的目标饱食度
  AUTO_USE_BERRY_FOOD_TYPE: 'berry', // 使用的食物类型

  // 任务管理器配置
  QUEST_MANAGER_ENABLED: false, // 默认关闭任务管理器
  QUEST_GOLD_LIMIT: 10000, // 任务刷新金币限制
  QUEST_DEFAULT_SELECTED_TASKS: {
    采集: {
      采蘑菇: true,
      采浆果: true,
      采草药: true,
      采集花草: true,
      采蜂蜜: true,
      砍树: true,
      砍竹子: true,
      捡贝壳: true,
      挖沙: true,
    },
  },

  // 功能开关
  BATTLE_GUARD_ENABLED: false, // 默认关闭战斗防护
  QUALITY_TOOLBAR_ENABLED: false, // 默认关闭缩小生活质量图标
  TAVERN_EXPERT_ENABLED: false, // 默认关闭酒馆专家
  CRAFT_PANEL_ENABLED: false, // 默认关闭物品制造
  SKILL_ALLOCATION_ENABLED: false, // 默认关闭技能加点
  QUICK_ALCHEMY_ENABLED: false, // 默认关闭快速炼金
};

/**
 * 技能分配默认配置
 */
export const DEFAULT_SKILL_ALLOCATION = {
  SPECIALTY: 'knowledge', // 默认专精：自我提升
  STRATEGY: '产出优先', // 默认策略：产出优先
  LUCKY_FIRST: true, // 默认幸运优先
};

/**
 * 存储键名常量
 */
export const STORAGE_KEYS = {
  QUEST_BATCH_SIZE: 'quest_batch_size',
  TASK_INTERVAL: 'task_interval',
  BATCH_DELAY: 'batch_delay',
  RESOURCE_MONITOR_ENABLED: 'resource_monitor_enabled',
  AUTO_BUY_BASE_RESOURCES: 'auto_buy_base_resources',
  AUTO_USE_BERRY_ENABLED: 'auto_use_berry_enabled',
  MONITORED_RESOURCES: 'monitored_resources',
  KITTY_DEFAULT_TASKS: 'kitty_default_tasks',
  LOG_LEVEL: 'log_level',
  AUTO_USE_BERRY_THRESHOLD: 'auto_use_berry_threshold',
  AUTO_USE_BERRY_TARGET: 'auto_use_berry_target',
  AUTO_USE_BERRY_FOOD_TYPE: 'auto_use_berry_food_type',
  QUEST_MANAGER_ENABLED: 'quest_manager_enabled',
  BATTLE_GUARD_ENABLED: 'battle_guard_enabled',
  QUALITY_TOOLBAR_ENABLED: 'quality_toolbar_enabled',
  TAVERN_EXPERT_ENABLED: 'tavern_expert_enabled',
  CRAFT_PANEL_ENABLED: 'craft_panel_enabled',
  SKILL_ALLOCATION_ENABLED: 'skill_allocation_enabled',
  QUEST_GOLD_LIMIT: 'quest_gold_limit',
  QUEST_SELECTED_TASKS: 'quest_selected_tasks',
  QUEST_FIRST_RUN: 'quest_first_run',
  SKILL_ALLOCATION_SPECIALTY: 'skill_allocation_specialty',
  SKILL_ALLOCATION_STRATEGY: 'skill_allocation_strategy',
  SKILL_ALLOCATION_LUCKY_FIRST: 'skill_allocation_lucky_first',
  QUICK_ALCHEMY_ENABLED: 'quick_alchemy_enabled',
} as const;

/**
 * 猫咪默认任务配置
 */
export const DEFAULT_KITTY_TASKS: Record<string, string> = {};

/**
 * 默认监控资源配置
 */
export const DEFAULT_RESOURCES: ResourceCategory[] = [
  {
    name: '基础资源',
    items: {
      berry: { threshold: DEFAULT_CONFIG.AUTO_USE_BERRY_TARGET, type: 'insufficient' },
      fish: { threshold: 100000, type: 'insufficient' },
      wood: { threshold: 1000000, type: 'insufficient' },
      stone: { threshold: 1000000, type: 'insufficient' },
      coal: { threshold: 1000000, type: 'insufficient' },
    },
  },
  {
    name: '制作材料',
    items: {
      paper: { threshold: 500, type: 'insufficient' },
      book: { threshold: 100, type: 'insufficient' },
      pencil: { threshold: 5, type: 'insufficient' },
    },
  },
  {
    name: '食物',
    items: {
      simpleSalad: { threshold: 2000, type: 'insufficient' },
      fishSoup: { threshold: 96, type: 'insufficient' },
      ryeBread: { threshold: 288, type: 'insufficient' },
      custardPudding: { threshold: 96, type: 'insufficient' },
      cloudFluffCandy: { threshold: 96, type: 'insufficient' },
    },
  },
  {
    name: '饮品',
    items: {
      berryWine: { threshold: 192, type: 'insufficient' },
      dawnBlossomWine: { threshold: 48, type: 'insufficient' },
      windBellWine: { threshold: 48, type: 'insufficient' },
    },
  },
  {
    name: '种子',
    items: {
      berrySeed: { threshold: 500, type: 'insufficient' },
      grapeSeed: { threshold: 500, type: 'insufficient' },
      ryeSeed: { threshold: 500, type: 'insufficient' },
      dawnBlossomSeed: { threshold: 500, type: 'insufficient' },
      windBellHerbSeed: { threshold: 500, type: 'insufficient' },
    },
  },
  {
    name: '猫咪用品',
    items: {
      autoFeeder: { threshold: 3, type: 'insufficient' },
      scratchingPost: { threshold: 3, type: 'insufficient' },
      cashmereToy: { threshold: 3, type: 'insufficient' },
      silkKittyNest: { threshold: 3, type: 'insufficient' },
      silkCurtain: { threshold: 3, type: 'insufficient' },
    },
  },
  {
    name: '其他',
    items: {
      nutrientEssence: { threshold: 10000, type: 'insufficient' },
      moonPearl: { threshold: 5, type: 'excess' },
      cutePoint: { threshold: 120, type: 'excess' },
    },
  },
];

/**
 * 任务类型分类配置
 */
export const QUEST_TASK_TYPES: Record<string, string[]> = {
  采集: [
    '种植',
    '种植葡萄',
    '种植黑麦',
    '采蘑菇',
    '采浆果',
    '采草药',
    '采集花草',
    '采蜂蜜',
    '砍树',
    '砍竹子',
    '捡贝壳',
    '挖沙',
    '收集云絮',
    '收集彩虹碎片',
  ],
  钓鱼: ['钓鱼', '捞鱼', '猫咪捕鱼', '深海捕鱼', '神秘钓鱼'],
  烹饪: [
    '制作野草沙拉',
    '制作野果拼盘',
    '熬制鱼汤',
    '炖蘑菇汤',
    '制作猫薄荷饼干',
    '制作猫咪零食',
    '烤制浆果派',
    '制作豪华猫粮',
    '制作鲜鱼刺身拼盘',
    '制作蛋奶布丁',
    '制作幸运曲奇',
    '制作幸运鲜鱼刺身',
    '制作超级幸运浆果派',
    '制作超级香浓蘑菇汤',
    '制作黑麦面包',
    '制作软软棉花糖',
    '制作新手用鱼饵',
    '制作普通鱼饵',
    '制作精华鱼饵',
    '酿造浆果酒',
    '酿造晨露精酿',
    '酿造铃语精酿',
    '酿造战斗知识鸡尾酒',
    '制作浆果奶昔',
    '制作铃语奶昔',
    '制作葡萄浆果奶昔',
    '制作葡萄铃语奶昔',
    '制作金枪鱼罐头',
    '制作风味虾仁罐头',
    '制作彩虹鱼干罐头',
    '制作神秘锦鲤罐头',
    '制作水晶金枪鱼罐头',
    '制作风味水晶虾仁罐头',
    '制作彩虹水晶鱼干罐头',
    '制作神秘水晶锦鲤罐头',
    '制作采集助力蛋挞',
    '制作钓鱼助力蛋挞',
    '制作畜牧助力蛋挞',
    '制作挖掘助力蛋挞',
    '制作缝纫助力蛋挞',
    '制作烹饪助力蛋挞',
    '制作制造助力蛋挞',
    '制作知识助力蛋挞',
    '制作探索助力蛋挞',
    '制作采集增幅蛋挞',
    '制作钓鱼增幅蛋挞',
    '制作畜牧增幅蛋挞',
    '制作挖掘增幅蛋挞',
    '制作缝纫增幅蛋挞',
    '制作烹饪增幅蛋挞',
    '制作制造增幅蛋挞',
    '制作知识增幅蛋挞',
    '制作探索增幅蛋挞',
  ],
  提升自我: [
    '跑步',
    '举重',
    '读书',
    '战斗练习',
    '基础攻击练习',
    '基础防御练习',
    '游泳',
    '搏击训练',
    '抗打击训练',
    '瑜伽练习',
    '复习战斗知识-力量',
    '复习战斗知识-敏捷',
    '复习战斗知识-智力',
    '编写生活专精手册',
    '编写战斗专精手册',
  ],
};
