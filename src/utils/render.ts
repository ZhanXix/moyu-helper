import { render } from 'preact';
import type { ComponentChildren } from 'preact';

/**
 * 将Preact组件渲染为HTML字符串
 */
export function renderToString(component: ComponentChildren): string {
  const container = document.createElement('div');
  render(component, container);
  return container.innerHTML;
}
