/**
 * 监控类型
 * - insufficient: 资源不足监控（低于阈值时报警）
 * - excess: 资源过量监控（高于阈值时报警）
 */
export type MonitorType = 'insufficient' | 'excess';

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
  ITEM_USE_COUNT: number;
  RESOURCE_MONITOR_ENABLED: boolean;
  CONSOLE_LOG_ENABLED: boolean;
}

/**
 * 默认配置常量
 */
export const DEFAULT_CONFIG: Readonly<AppConfig> = {
  // 任务队列配置
  QUEST_BATCH_SIZE: 20, // 每批任务数量
  TASK_INTERVAL: 0.2, // 任务间隔（秒）

  // 物品使用配置
  ITEM_USE_COUNT: 5, // 默认使用次数

  // 资源监控配置
  RESOURCE_MONITOR_ENABLED: true, // 默认启用资源监控

  // 控制台日志配置
  CONSOLE_LOG_ENABLED: false, // 默认关闭控制台日志
};

/**
 * 存储键名常量
 */
export const STORAGE_KEYS = {
  QUEST_BATCH_SIZE: 'quest_batch_size',
  TASK_INTERVAL: 'task_interval',
  ITEM_USE_COUNT: 'item_use_count',
  RESOURCE_MONITOR_ENABLED: 'resource_monitor_enabled',
  MONITORED_RESOURCES: 'monitored_resources',
  KITTY_DEFAULT_TASKS: 'kitty_default_tasks',
  CONSOLE_LOG_ENABLED: 'console_log_enabled',
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
      berry: { threshold: 1000000, type: 'insufficient' },
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
