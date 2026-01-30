/**
 * 在浏览器控制台运行此脚本，生成炼金标签材料的配置
 * 复制输出结果到 quick-alchemy.tsx 中
 */

(function () {
  function parseAlchemyTags(tagStr) {
    const match = tagStr.match(/^\(([^)]+)\)$/);
    if (!match) return [];

    const tags = match[1].split(',').map((t) => t.trim());
    const resources = window.tAllGameResource;
    if (!resources) return [];

    return Object.entries(resources)
      .filter(([_, res]) => {
        const alchemyTag = res?.alchemyTag;
        if (!alchemyTag || !Array.isArray(alchemyTag)) return false;
        return tags.every((tag) => alchemyTag.includes(tag));
      })
      .map(([key, res]) => ({ id: key, name: res.name }));
  }

  const tags = [
    '(glass,container)',
    '(slime)',
    '(liquid)',
    '(lv1SkillBook)',
    '(lv2SkillBook)',
    '(lv3SkillBook)',
    '(lv4SkillBook)',
    '(lv1Food)',
    '(lv2Food)',
    '(lv3Food)',
    '(lv4Food)',
    '(monster_essence_lv1)',
    '(monster_essence_lv2)',
    '(monster_essence_lv3)',
    '(monster_essence_lv4)',
  ];

  const result = {};

  tags.forEach((tag) => {
    const matches = parseAlchemyTags(tag);
    result[tag] = matches.map((m) => m.id);
    console.log(`\n${tag}:`);
    matches.forEach((m) => console.log(`  - ${m.id}: ${m.name}`));
  });

  return result;
})();
