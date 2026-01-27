import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取源文件
const sourceFile = path.join(__dirname, './source.js');
const sourceContent = fs.readFileSync(sourceFile, 'utf-8');

// 提取 RAW_DATA 对象
const dataMatch = sourceContent.match(/export const RAW_DATA = ({[\s\S]*});/);
if (!dataMatch) {
  console.error('无法找到 RAW_DATA');
  process.exit(1);
}

const RAW_DATA = eval('(' + dataMatch[1] + ')');

// 需要过滤的基础资源
const FILTERED_RESOURCES = ['berry', 'fish', 'wood', 'stone', 'bamboo', 'coal', '__satiety'];

// 从 defaults.ts 中提取需要的物品 ID
const defaultsFile = path.join(__dirname, '../src/config/defaults.ts');
const defaultsContent = fs.readFileSync(defaultsFile, 'utf-8');

// 排除的分类
const EXCLUDED_CATEGORIES = ['基础资源', '其他', '种子'];
const TARGET_ITEM_IDS = new Set();

// 提取分类和物品
const categoryRegex = /\{\s*name:\s*['"]([^'"]+)['"],\s*items:\s*\{/g;
let match;
while ((match = categoryRegex.exec(defaultsContent)) !== null) {
  const categoryName = match[1];
  if (EXCLUDED_CATEGORIES.includes(categoryName)) continue;

  let startPos = match.index + match[0].length;
  let braceCount = 1;
  let endPos = startPos;

  while (braceCount > 0 && endPos < defaultsContent.length) {
    if (defaultsContent[endPos] === '{') braceCount++;
    if (defaultsContent[endPos] === '}') braceCount--;
    endPos++;
  }

  const itemsStr = defaultsContent.substring(startPos, endPos - 1);
  const itemIds = itemsStr.matchAll(/([a-zA-Z0-9_]+):\s*\{/g);
  for (const itemMatch of itemIds) {
    TARGET_ITEM_IDS.add(itemMatch[1]);
  }
}

// 必须保留的 action IDs
const REQUIRED_ACTIONS = [
  'exploreNewArea',
  'sericulture',
  'pearlCultivation',
  'farmingSheep',
  'farmingChicken',
  'farmingCow',
  'miningFishscaleMineral',
  'charcoalMaking',
  'sewCashmere',
  'sewSilkFabric',
  'pickRainbowShard',
  'cutBamboo',
  'reading',
  'swim',
];

// 找到生产目标物品的 action IDs，并计算效率
const itemProducers = {}; // { itemId: [{ actionId, efficiency, depCount }] }

Object.entries(RAW_DATA).forEach(([actionId, action]) => {
  if (!action.rewards) return;

  action.rewards.forEach((reward) => {
    if (!TARGET_ITEM_IDS.has(reward.id)) return;

    const baseCount = reward.range?.min || reward.count || 1;
    const percent = reward.percent || 1;
    const baseDuration = action.baseDuration || 1000;
    const efficiency = (percent * baseCount) / (baseDuration / 1000);

    // 计算非基础资源依赖数量
    const depCount = action.requirement?.resource?.filter((req) => !FILTERED_RESOURCES.includes(req.id)).length || 0;

    if (!itemProducers[reward.id]) {
      itemProducers[reward.id] = [];
    }
    itemProducers[reward.id].push({ actionId, efficiency, depCount });
  });
});

// 为每个物品选择最优 action：优先最少依赖，其次最高效率
const targetActionIds = new Set();
Object.values(itemProducers).forEach((producers) => {
  producers.sort((a, b) => {
    if (a.depCount !== b.depCount) return a.depCount - b.depCount;
    return b.efficiency - a.efficiency;
  });
  targetActionIds.add(producers[0].actionId);
});

// 递归收集所有依赖的物品 ID
function collectAllDependencies(actionIds, visited = new Set()) {
  const allDeps = new Set();
  const queue = Array.from(actionIds);

  while (queue.length > 0) {
    const actionId = queue.shift();
    if (visited.has(actionId)) continue;
    visited.add(actionId);

    const action = RAW_DATA[actionId];
    if (!action?.requirement?.resource) continue;

    action.requirement.resource.forEach((req) => {
      if (FILTERED_RESOURCES.includes(req.id)) return;
      allDeps.add(req.id);

      // 找到生产该物品的 action，继续递归
      Object.entries(RAW_DATA).forEach(([depActionId, depAction]) => {
        if (visited.has(depActionId)) return;
        if (!depAction.rewards?.some((r) => r.id === req.id)) return;
        queue.push(depActionId);
      });
    });
  }

  return allDeps;
}

// 转换函数：提取产出和依赖
function transformAction(actionId, action) {
  const result = {
    id: actionId,
    name: action.name,
    actionId,
    rewards: [],
    dependencies: [],
  };

  // 提取产出
  if (action.rewards) {
    result.rewards = action.rewards.map((reward) => {
      const baseCount = reward.range?.min || reward.count || 1;
      const percent = reward.percent || 1;
      return {
        itemId: reward.id,
        count: baseCount * percent,
      };
    });
  }

  // 提取依赖（过滤基础资源）
  if (action.requirement?.resource) {
    result.dependencies = action.requirement.resource
      .filter((req) => !FILTERED_RESOURCES.includes(req.id))
      .map((req) => ({
        itemId: req.id,
        count: req.count,
      }));
  }

  return result;
}

// 递归收集所有依赖的 action IDs
const allDependentActionIds = new Set(targetActionIds);
const allDeps = collectAllDependencies(targetActionIds);
allDeps.forEach((depItemId) => {
  Object.entries(RAW_DATA).forEach(([actionId, action]) => {
    if (!action.rewards?.some((r) => r.id === depItemId)) return;
    allDependentActionIds.add(actionId);
  });
});

// 只转换目标 action 及其依赖，必须保留的 action 放到最后
const normalActions = Array.from(allDependentActionIds)
  .filter((actionId) => RAW_DATA[actionId] && !REQUIRED_ACTIONS.includes(actionId))
  .map((actionId) => transformAction(actionId, RAW_DATA[actionId]));

const requiredActionsData = REQUIRED_ACTIONS.filter((actionId) => RAW_DATA[actionId]).map((actionId) =>
  transformAction(actionId, RAW_DATA[actionId]),
);

const transformedData = [...normalActions, ...requiredActionsData];

// 生成 TypeScript 文件内容
const tsContent = `// 此文件由 scripts/transform-data.js 自动生成，请勿手动修改

import type { CraftItem } from '@/types';

/**
 * 物品制造依赖配置
 * 自动从游戏数据生成
 */
export const DEFAULT_CRAFT_ITEMS: CraftItem[] = ${JSON.stringify(
  transformedData.map((item) => ({
    id: item.id,
    name: item.name,
    actionId: item.actionId,
    rewards: item.rewards,
    ...(item.dependencies.length > 0 ? { dependencies: item.dependencies } : {}),
  })),
  null,
  2,
)};
`;

// 输出到 src/config 目录
const outputDir = path.join(__dirname, '../src/config');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputFile = path.join(outputDir, 'craft-items.ts');
fs.writeFileSync(outputFile, tsContent, 'utf-8');

console.log(`转换完成！共处理 ${transformedData.length} 条数据`);
console.log(`目标物品数：${TARGET_ITEM_IDS.size}`);
console.log(`输出文件：${outputFile}`);
console.log('提示：已按最少依赖优先，效率次之的原则选择 action');
