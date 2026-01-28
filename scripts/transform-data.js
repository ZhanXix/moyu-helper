import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 常量配置
const FILTERED_RESOURCES = ['berry', 'fish', 'wood', 'stone', 'bamboo', 'coal', '__satiety'];
const EXCLUDED_CATEGORIES = ['基础资源', '其他', '种子'];
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

// 读取并解析源数据
function loadRawData() {
  const sourceFile = path.join(__dirname, './source.js');
  const content = fs.readFileSync(sourceFile, 'utf-8');
  const match = content.match(/export const RAW_DATA = ({[\s\S]*});/);

  if (!match) {
    console.error('无法找到 RAW_DATA');
    process.exit(1);
  }

  return eval('(' + match[1] + ')');
}

// 从 defaults.ts 提取目标物品 ID
function extractTargetItemIds() {
  const defaultsFile = path.join(__dirname, '../src/config/defaults.ts');
  const content = fs.readFileSync(defaultsFile, 'utf-8');
  const targetIds = new Set();

  const categoryRegex = /\{\s*name:\s*['"]([^'"]+)['"],\s*items:\s*\{/g;
  let match;

  while ((match = categoryRegex.exec(content)) !== null) {
    if (EXCLUDED_CATEGORIES.includes(match[1])) continue;

    const itemsBlock = extractBracketContent(content, match.index + match[0].length);
    const itemIds = itemsBlock.matchAll(/([a-zA-Z0-9_]+):\s*\{/g);

    for (const [, itemId] of itemIds) {
      targetIds.add(itemId);
    }
  }

  return targetIds;
}

// 提取大括号内容
function extractBracketContent(text, startPos) {
  let braceCount = 1;
  let endPos = startPos;

  while (braceCount > 0 && endPos < text.length) {
    if (text[endPos] === '{') braceCount++;
    if (text[endPos] === '}') braceCount--;
    endPos++;
  }

  return text.substring(startPos, endPos - 1);
}

// 计算 action 效率
function calculateEfficiency(action, reward) {
  const baseCount = reward.range?.min || reward.count || 1;
  const percent = reward.percent || 1;
  const baseDuration = action.baseDuration || 1000;
  return (percent * baseCount) / (baseDuration / 1000);
}

// 计算非基础资源依赖数量
function countDependencies(action) {
  return action.requirement?.resource?.filter((req) => !FILTERED_RESOURCES.includes(req.id)).length || 0;
}

// 找到生产目标物品的最优 action
function findOptimalActions(rawData, targetItemIds) {
  const itemProducers = {};

  // 收集所有生产者
  Object.entries(rawData).forEach(([actionId, action]) => {
    action.rewards?.forEach((reward) => {
      if (!targetItemIds.has(reward.id)) return;

      if (!itemProducers[reward.id]) {
        itemProducers[reward.id] = [];
      }

      itemProducers[reward.id].push({
        actionId,
        efficiency: calculateEfficiency(action, reward),
        depCount: countDependencies(action),
      });
    });
  });

  // 选择最优 action：最少依赖优先，效率次之
  const optimalActions = new Set();
  Object.values(itemProducers).forEach((producers) => {
    producers.sort((a, b) => a.depCount - b.depCount || b.efficiency - a.efficiency);
    optimalActions.add(producers[0].actionId);
  });

  return optimalActions;
}

// 递归收集所有依赖的 action
function collectDependentActions(rawData, actionIds) {
  const visited = new Set();
  const queue = Array.from(actionIds);

  while (queue.length > 0) {
    const actionId = queue.shift();
    if (visited.has(actionId)) continue;
    visited.add(actionId);

    const action = rawData[actionId];
    if (!action?.requirement?.resource) continue;

    // 找到生产依赖物品的 action
    action.requirement.resource.forEach((req) => {
      if (FILTERED_RESOURCES.includes(req.id)) return;

      Object.entries(rawData).forEach(([depActionId, depAction]) => {
        if (visited.has(depActionId)) return;
        if (depAction.rewards?.some((r) => r.id === req.id)) {
          queue.push(depActionId);
        }
      });
    });
  }

  return visited;
}

// 转换 action 为目标格式
function transformAction(actionId, action) {
  const rewards =
    action.rewards?.map((reward) => ({
      itemId: reward.id,
      count: (reward.range?.min || reward.count || 1) * (reward.percent || 1),
    })) || [];

  const dependencies =
    action.requirement?.resource
      ?.filter((req) => !FILTERED_RESOURCES.includes(req.id))
      .map((req) => ({ itemId: req.id, count: req.count })) || [];

  return {
    id: actionId,
    name: action.name,
    actionId,
    rewards,
    dependencies,
    category: action.secondaryClassification || '其他',
  };
}

// 按分类分组并排序
function groupByCategory(actions) {
  const grouped = {};

  actions.forEach((action) => {
    const category = action.category;
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(action);
  });

  // 对每个分类内排序
  Object.values(grouped).forEach((items) => {
    items.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
  });

  return grouped;
}

// 转换为树形结构
function buildTreeStructure(actions) {
  return actions.map((item) => ({
    value: item.id,
    label: item.name,
    actionId: item.actionId,
    rewards: item.rewards,
    ...(item.dependencies.length > 0 && { dependencies: item.dependencies }),
  }));
}

// 生成最终数据结构
function generateFinalData(rawData, normalActionIds, requiredActionIds) {
  const normalActions = Array.from(normalActionIds)
    .filter((id) => rawData[id])
    .map((id) => transformAction(id, rawData[id]));

  const requiredActions = requiredActionIds.filter((id) => rawData[id]).map((id) => transformAction(id, rawData[id]));

  const grouped = groupByCategory(normalActions);

  const categories = Object.keys(grouped)
    .sort((a, b) => a.localeCompare(b, 'zh-CN'))
    .map((category) => ({
      value: category,
      label: category,
      items: buildTreeStructure(grouped[category]),
    }));

  // 添加收藏分类到最前面
  if (requiredActions.length > 0) {
    categories.unshift({
      value: 'collection_required_actions',
      label: '收藏',
      items: buildTreeStructure(requiredActions),
    });
  }

  return categories;
}

// 生成并写入文件
function writeOutputFile(data, targetItemCount) {
  const tsContent = `// 此文件由 scripts/transform-data.js 自动生成，请勿手动修改

import type { CraftItemCategory } from '@/types';

/**
 * 物品制造依赖配置（树形结构）
 * 自动从游戏数据生成
 */
export const DEFAULT_CRAFT_ITEMS: CraftItemCategory[] = ${JSON.stringify(data, null, 2)};
`;

  const outputDir = path.join(__dirname, '../src/config');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputFile = path.join(outputDir, 'craft-items.ts');
  fs.writeFileSync(outputFile, tsContent, 'utf-8');

  const totalItems = data.reduce((sum, group) => sum + group.items.length, 0);
  console.log(`转换完成！共处理 ${totalItems} 条数据，分为 ${data.length} 个分类`);
  console.log(`目标物品数：${targetItemCount}`);
  console.log(`输出文件：${outputFile}`);
  console.log('提示：已按最少依赖优先，效率次之的原则选择 action');
}

// 主流程
function main() {
  const rawData = loadRawData();
  const targetItemIds = extractTargetItemIds();
  const optimalActions = findOptimalActions(rawData, targetItemIds);
  const allActions = collectDependentActions(rawData, optimalActions);

  // 分离普通 action 和必须保留的 action
  const normalActionIds = new Set([...allActions].filter((id) => !REQUIRED_ACTIONS.includes(id)));

  const finalData = generateFinalData(rawData, normalActionIds, REQUIRED_ACTIONS);
  writeOutputFile(finalData, targetItemIds.size);
}

main();
