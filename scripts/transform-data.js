import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 忽略的物品（需求依赖）- 使用物品中文名
const IGNORED_DEPENDENCIES = new Set(['金币', '饱食度']);

// 忽略的物品（产出）- 使用物品中文名
const IGNORED_REWARDS = new Set(['金币', '幸运猫盒', '神秘罐头', '梦羽袋']);

// 指定要生成的配方（使用 action 中文名）
const TARGET_ACTION_NAMES = [
  { key: '炼金', actions: ['提炼月光精华', '提炼灵质', '提炼纯净精华', '提炼造物精华'], },
  { key: '采集', actions: ['采草药', '采集花草', '采蜂蜜', '砍竹子', '收集云絮', '收集彩虹碎片'] },
  { key: '钓鱼', actions: ['钓鱼', '深海捕鱼', '神秘钓鱼'] },
  { key: '养殖', actions: ['照料小鸡仔', '照料奶牛', '照料绵羊', '养蚕', '培育珍珠'] },
  { key: '挖掘', actions: ['挖矿', '矿井采矿', '深度开采', '开采鱼鳞矿', '开采绒毛岩', '开采爪痕矿', '开采魔晶石', '开采猫眼石', '开采琥珀瞳石'] },
  {
    key: '烹饪', actions: [
      '制作野草沙拉', '制作野果拼盘', '熬制鱼汤', '炖蘑菇汤',
      '烤制浆果派', '制作豪华猫粮', '制作鲜鱼刺身拼盘', '制作蛋奶布丁', '制作黑麦面包', '制作软软棉花糖',
      '酿造浆果酒', '酿造晨露精酿', '酿造铃语精酿',
      '制作浆果奶昔', '制作铃语奶昔', '制作葡萄浆果奶昔', '制作葡萄铃语奶昔',
      '制作知识助力蛋挞', '制作知识增幅蛋挞', '制作探索助力蛋挞', '制作探索增幅蛋挞'
    ]
  },
  { key: '制造', actions: ['制造玻璃瓶', '制作铁罐头', '制作自动喂食器', '制作猫抓板', '造纸', '封装书', '制作碳笔'] },
  { key: '锻造', actions: ['熔炼钢', '熔炼银', '熔炼秘银', '熔炼鱼鳞合金', '熔炼暗影精铁', '熔炼星辰合金'] },
  { key: '缝制', actions: ['缝制羊绒布料', '缝制丝绸布料', '分离绒毛', '缝制绒毛布料', '缝制毛绒玩具', '制作舒适猫窝'] },
  { key: '特殊制造', actions: ['制作幸运猫神像', '制作猫咪护符', '炼制猫薄荷药剂', '拼接猫咪文物'] },
  { key: '探索', actions: ['探索', '考古挖掘', '寻宝'] },
  { key: '提升自我', actions: ['读书', '抗打击训练', '编写生活专精手册', '编写战斗专精手册'] }
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

// 读取物品名称映射
function loadItemNames() {
  const itemsFile = path.join(__dirname, './items.json');
  const content = fs.readFileSync(itemsFile, 'utf-8');
  const items = JSON.parse(content);

  const itemNames = {};
  const nameToId = {};
  Object.entries(items).forEach(([itemId, item]) => {
    if (item.name) {
      itemNames[itemId] = item.name;
      nameToId[item.name] = itemId;
    }
  });

  return { itemNames, nameToId };
}

// 从配置提取目标 action ID（按配置顺序）
function extractTargetActionIds(rawData) {
  const result = [];
  for (const { key, actions } of TARGET_ACTION_NAMES) {
    const actionIds = [];
    for (const name of actions) {
      // 直接从 rawData 查找 action
      for (const [actionId, action] of Object.entries(rawData)) {
        if (action.name === name) {
          actionIds.push(actionId);
          break;
        }
      }
    }
    result.push({ key, actionIds });
  }

  const totalCount = result.reduce((sum, { actionIds }) => sum + actionIds.length, 0);
  if (totalCount === 0) {
    console.error('没有找到任何匹配的 action！');
  }

  return result;
}

// 转换 action 为目标格式
function transformAction(actionId, action, nameToId) {
  const ignoredRewardIds = new Set(Array.from(IGNORED_REWARDS).map((name) => nameToId[name]).filter(Boolean));
  const ignoredDepIds = new Set(Array.from(IGNORED_DEPENDENCIES).map((name) => nameToId[name]).filter(Boolean));

  const rewards =
    action.rewards?.filter((r) => !ignoredRewardIds.has(r.id)).map((r) => {
      const baseCount = r.range ? (r.range.min + r.range.max) / 2 : (r.count || 1);
      return {
        itemId: r.id,
        count: baseCount * (r.percent || 1),
      };
    }) || [];

  const dependencies = action.requirement?.resource?.filter((req) => !ignoredDepIds.has(req.id)).map((req) => ({
    itemId: req.id,
    count: req.count,
  })) || [];

  return {
    id: actionId,
    name: action.name,
    actionId,
    rewards,
    dependencies,
    banToKitty: action.banToKitty || false,
  };
}

// 转换为树形结构
function toTreeItem(action) {
  return {
    value: action.id,
    label: action.name,
    actionId: action.actionId,
    rewards: action.rewards,
    ...(action.dependencies.length && { dependencies: action.dependencies }),
    ...(action.banToKitty && { banToKitty: action.banToKitty }),
  };
}

// 生成最终数据结构
function generateFinalData(rawData, categories, itemNames) {
  const result = [];

  for (const { key, actionIds } of categories) {
    const actions = actionIds
      .filter((id) => rawData[id])
      .map((id) => transformAction(id, rawData[id], itemNames.nameToId));

    if (actions.length > 0) {
      result.push({
        value: key,
        label: key,
        items: actions.map(toTreeItem),
      });
    }
  }

  // 为所有 rewards 和 dependencies 添加 label
  result.forEach((category) => {
    category.items.forEach((item) => {
      if (item.rewards) {
        item.rewards.forEach((reward) => {
          if (itemNames.itemNames[reward.itemId]) {
            reward.label = itemNames.itemNames[reward.itemId];
          }
        });
      }
      if (item.dependencies) {
        item.dependencies.forEach((dep) => {
          if (itemNames.itemNames[dep.itemId]) {
            dep.label = itemNames.itemNames[dep.itemId];
          }
        });
      }
    });
  });

  return result;
}

// 生成并写入文件
function writeOutputFile(data, targetItemCount) {
  const outputDir = path.join(__dirname, '../src/config');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputFile = path.join(outputDir, 'craft-items.json');
  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2), 'utf-8');

  const totalItems = data.reduce((sum, group) => sum + group.items.length, 0);
  console.log(`转换完成！共处理 ${totalItems} 条数据，分为 ${data.length} 个分类`);
  console.log(`目标物品数：${targetItemCount}`);
  console.log(`输出文件：${outputFile}`);
}

// 主流程
function main() {
  const rawData = loadRawData();
  const { itemNames, nameToId } = loadItemNames();
  const categories = extractTargetActionIds(rawData);

  const finalData = generateFinalData(rawData, categories, { itemNames, nameToId });

  const totalCount = categories.reduce((sum, { actionIds }) => sum + actionIds.length, 0);
  writeOutputFile(finalData, totalCount);
}

main();
