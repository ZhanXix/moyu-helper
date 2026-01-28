/**
 * 通用工具函数
 */

/**
 * 等待指定时间
 */
export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
