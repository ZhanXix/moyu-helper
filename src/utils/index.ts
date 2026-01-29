/**
 * 工具模块导出
 * 导出任务队列和资源工具函数
 */
import { render } from 'preact';
import type { ComponentChildren } from 'preact';

export * from './task-queue';
export * from './resource';
export * from './analytics';

/**
 * 等待指定时间
 */
export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 将Preact组件渲染为HTML字符串
 */
export function renderToString(component: ComponentChildren): string {
  const container = document.createElement('div');
  render(component, container);
  return container.innerHTML;
}
