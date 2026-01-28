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
  QUEST_REQUIRED_PREFIX: string;
  QUEST_EXCLUDED_KEYWORDS: string;
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
  RESOURCE_MONITOR_ENABLED: true, // 默认启用资源监控
  AUTO_BUY_BASE_RESOURCES: false, // 默认关闭自动购买基础资源

  // 日志级别配置
  LOG_LEVEL: 'none', // 默认不显示日志

  // 自动使用浆果配置
  AUTO_USE_BERRY_ENABLED: false, // 默认关闭自动使用浆果
  AUTO_USE_BERRY_THRESHOLD: 2000000, // 饱食度低于此值时自动使用浆果
  AUTO_USE_BERRY_TARGET: 2200000, // 使用浆果后的目标饱食度
  AUTO_USE_BERRY_FOOD_TYPE: 'berry', // 使用的食物类型

  // 任务管理器配置
  QUEST_REQUIRED_PREFIX: '采集', // 任务标题必须包含的前缀
  QUEST_EXCLUDED_KEYWORDS: '云絮,彩虹,种植', // 排除的关键字（逗号分隔）
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
  QUEST_REQUIRED_PREFIX: 'quest_required_prefix',
  QUEST_EXCLUDED_KEYWORDS: 'quest_excluded_keywords',
  QUEST_FIRST_RUN: 'quest_first_run',
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
