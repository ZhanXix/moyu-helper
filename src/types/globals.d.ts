/**
 * 全局类型声明文件
 *
 * 功能说明：
 * - 油猴脚本 API 类型声明
 * - unsafeWindow 类型声明
 * - 第三方库类型声明（pako）
 */

// 油猴脚本全局类型声明
declare const unsafeWindow: Window & typeof globalThis;

// 油猴 API 类型声明
declare const GM: {
  getValue<T>(key: string, defaultValue?: T): Promise<T>;
  setValue(key: string, value: any): Promise<void>;
  listValues(): Promise<string[]>;
  deleteValue(key: string): Promise<void>;
  getResourceText(name: string): Promise<string>;
  addStyle(css: string): Promise<void>;
};

// pako 压缩库类型声明
declare const pako: {
  inflate(data: Uint8Array, options?: { to?: string }): string | Uint8Array;
  deflate(data: string | Uint8Array): Uint8Array;
};
