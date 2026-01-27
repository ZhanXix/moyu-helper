/**
 * 资源工具函数
 * 提供资源名称与 key 的转换功能，并支持控制台调用
 */

type GameResource = Record<string, { name?: string; [key: string]: any }>;

/**
 * 获取游戏资源对象
 */
function getGameResources(): GameResource | null {
  return (unsafeWindow as any).tAllGameResource || null;
}

/**
 * 通过资源名称获取资源 key
 */
interface GetResourceKey {
  (name: string): string | undefined;
  (names: string[]): string[];
}

export const getResourceKey: GetResourceKey = (input: string | string[]): any => {
  const resources = getGameResources();
  if (!resources) {
    console.warn('游戏资源数据未加载');
    return Array.isArray(input) ? [] : undefined;
  }

  if (Array.isArray(input)) {
    return input.map((name) => findKeyByName(resources, name)).filter((key): key is string => key !== undefined);
  }

  return findKeyByName(resources, input);
};

/**
 * 通过名称查找资源 key
 */
function findKeyByName(resources: GameResource, name: string): string | undefined {
  for (const [key, value] of Object.entries(resources)) {
    if (value?.name === name) return key;
  }
  return undefined;
}

/**
 * 通过资源 key 获取资源名称
 */
interface GetResourceName {
  (key: string): string | undefined;
  (keys: string[]): string[];
}

export const getResourceName: GetResourceName = (input: string | string[]): any => {
  const resources = getGameResources();
  if (!resources) {
    console.warn('游戏资源数据未加载');
    return Array.isArray(input) ? [] : undefined;
  }

  if (Array.isArray(input)) {
    return input.map((key) => resources[key]?.name).filter((name): name is string => name !== undefined);
  }

  return resources[input]?.name;
};

/**
 * 将资源工具函数挂载到 unsafeWindow 供控制台使用
 */
export function mountResourceUtils(): void {
  const win = unsafeWindow as any;
  win.getResourceKey = getResourceKey;
  win.getResourceName = getResourceName;
  console.info('🐟 资源工具函数已挂载: getResourceKey, getResourceName');
}
