/**
 * 资源工具函数
 * 提供资源名称与 key 的转换功能
 */

type GameResource = Record<string, { name?: string; [key: string]: any }>;

const keyCache = new Map<string, string>();
const detailCache = new Map<string, any>();

/**
 * 通过资源名称获取资源 key
 */
export function getResourceKey(name: string): string | undefined {
  if (keyCache.has(name)) return keyCache.get(name);

  const resources: GameResource = unsafeWindow.tAllGameResource;
  if (!resources) return undefined;

  for (const [key, value] of Object.entries(resources)) {
    if (value?.name === name) {
      keyCache.set(name, key);
      return key;
    }
  }
  return undefined;
}

/**
 * 通过资源 key 获取详情对象
 */
export function getResourceDetail(key: string): any {
  if (detailCache.has(key)) return detailCache.get(key);

  const resources: GameResource = unsafeWindow.tAllGameResource;
  const detail = resources?.[key];
  if (detail) detailCache.set(key, detail);
  return detail || null;
}

/**
 * 将资源工具函数挂载到 unsafeWindow 供控制台使用
 */
export function mountResourceUtils(): void {
  unsafeWindow.getResourceKey = getResourceKey;
  unsafeWindow.getResourceDetail = getResourceDetail;
  console.info('🐟 资源工具函数已挂载: getResourceKey, getResourceDetail');
}
