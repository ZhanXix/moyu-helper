/**
 * 游戏数据类型定义
 */

/**
 * 用户信息接口
 * 包含用户的完整信息和任务数据
 */
export interface UserInfo {
  kittyInfo: any;
  quest: any;
  tavern?: TavernExpert[];
}

/**
 * 酒馆专家接口
 */
export interface TavernExpert {
  id: number;
  uuid: string;
  owner: string;
  start_date: string;
  end_date: string;
  pause_date: string | null;
  type: string;
  level: number;
  state: 'WORKING' | 'PAUSED';
}

/**
 * 库存数据接口
 * 键为物品 ID，值为物品数量信息
 */
export interface Inventory {
  [itemId: string]: {
    count: number;
  };
}

/**
 * 缓存条目接口
 * 用于管理单个数据类型的缓存状态
 */
export interface CacheEntry<T> {
  /** 缓存的数据 */
  data: T | null;
  /** 是否正在加载中 */
  loading: boolean;
  /** 待处理的请求队列 */
  pendingRequests: Array<{
    resolve: (data: T) => void;
    reject: (error: Error) => void;
    timer: NodeJS.Timeout;
  }>;
}
