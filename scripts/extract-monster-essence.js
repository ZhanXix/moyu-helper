import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 读取items.json文件
const itemsPath = path.join(__dirname, 'items.json');
const itemsData = JSON.parse(fs.readFileSync(itemsPath, 'utf-8'));

// 提取并分类monster_essence
const result = {};
const lvPattern = /^monster_essence_lv(\d+)$/;

Object.entries(itemsData).forEach(([itemId, item]) => {
  if (item.alchemyTag && Array.isArray(item.alchemyTag) && item.alchemyTag.length === 1) {
    const tag = item.alchemyTag[0];
    const match = tag.match(lvPattern);
    if (match) {
      const key = tag; // monster_essence_lv1, monster_essence_lv2, etc.
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(itemId);
    }
  }
});

// 按lv等级排序输出
const sortedResult = Object.keys(result)
  .sort((a, b) => {
    const lvA = parseInt(a.match(/lv(\d+)/)[1]);
    const lvB = parseInt(b.match(/lv(\d+)/)[1]);
    return lvA - lvB;
  })
  .reduce((acc, key) => {
    acc[key] = result[key];
    return acc;
  }, {});

// 输出结果
console.log(JSON.stringify(sortedResult, null, 2));

// 保存到文件
const outputPath = path.join(__dirname, '..', 'src', 'config', 'monster-essence-classification.json');
fs.writeFileSync(outputPath, JSON.stringify(sortedResult, null, 2));
console.log(`\n结果已保存到: ${outputPath}`);

// 输出统计信息
console.log('\n统计信息:');
Object.entries(sortedResult).forEach(([key, items]) => {
  console.log(`${key}: ${items.length} 个物品`);
});
