/**
 * DOM 工具函数
 * 提供常用的 DOM 操作辅助函数
 */

/**
 * 等待指定时间
 */
export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 查询单个元素
 */
export const query = <T extends Element = Element>(selector: string, parent: ParentNode = document): T | null =>
  parent.querySelector<T>(selector);

/**
 * 查询所有元素
 */
export const queryAll = <T extends Element = Element>(selector: string, parent: ParentNode = document): T[] =>
  Array.from(parent.querySelectorAll<T>(selector));

/**
 * 获取元素文本内容（去除首尾空白）
 */
export const getText = (element: Element | null): string => element?.textContent?.trim() || '';

/**
 * 设置元素文本内容
 */
export const setText = (element: Element | null, text: string): void => {
  if (element) element.textContent = text;
};

/**
 * 点击元素（如果存在且未禁用）
 */
export const clickIfEnabled = (button: HTMLButtonElement | null): boolean => {
  if (button && !button.disabled) {
    button.click();
    return true;
  }
  return false;
};

/**
 * 等待元素出现
 */
export const waitForElement = <T extends Element = Element>(
  selector: string,
  parent: ParentNode = document,
  timeout = 5000,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const element = parent.querySelector<T>(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const el = parent.querySelector<T>(selector);
      if (el) {
        observer.disconnect();
        clearTimeout(timer);
        resolve(el);
      }
    });

    const timer = setTimeout(() => {
      observer.disconnect();
      reject(new Error(`等待元素超时: ${selector}`));
    }, timeout);

    observer.observe(parent as Node, {
      childList: true,
      subtree: true,
    });
  });
};

/**
 * 创建元素快捷方法
 */
export const createElement = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options?: {
    className?: string;
    id?: string;
    textContent?: string;
    innerHTML?: string;
    attributes?: Record<string, string>;
    styles?: Partial<CSSStyleDeclaration>;
  },
): HTMLElementTagNameMap[K] => {
  const element = document.createElement(tag);

  if (options) {
    if (options.className) element.className = options.className;
    if (options.id) element.id = options.id;
    if (options.textContent) element.textContent = options.textContent;
    if (options.innerHTML) element.innerHTML = options.innerHTML;
    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }
    if (options.styles) {
      Object.assign(element.style, options.styles);
    }
  }

  return element;
};
