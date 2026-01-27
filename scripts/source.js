export const RAW_DATA = {
  mining: {
    id: 'mining',
    name: '挖矿',
    icon: '⛏️',
    description: '挖掘矿石获得石材',
    baseDuration: 12e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 2,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 0.05,
        range: {
          min: 1,
          max: 10,
        },
      },
      {
        id: 'stone',
        percent: 1,
        range: {
          min: 1,
          max: 2,
        },
      },
      {
        id: 'iron',
        percent: 0.5,
        range: {
          min: 1,
          max: 2,
        },
      },
      {
        id: 'coal',
        percent: 0.5,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mining',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '矿洞',
  },
  miningWithShaft: {
    id: 'miningWithShaft',
    name: '矿井采矿',
    icon: '⛏️',
    description: '运用挖矿设备，批量开采浅层矿物',
    baseDuration: 3e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'miningShaft',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 0.05,
        range: {
          min: 1,
          max: 10,
        },
      },
      {
        id: 'stone',
        percent: 1,
        range: {
          min: 10,
          max: 15,
        },
      },
      {
        id: 'iron',
        percent: 0.8,
        range: {
          min: 10,
          max: 15,
        },
      },
      {
        id: 'coal',
        percent: 0.8,
        range: {
          min: 10,
          max: 15,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mining',
        increaseExp: 4,
      },
    ],
    secondaryClassification: '矿洞',
  },
  deepMining: {
    id: 'deepMining',
    name: '深度开采',
    icon: '⛏️',
    description: '运用挖矿设备，开采深层矿物',
    baseDuration: 3e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'miningShaft',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'mining',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 0.1,
        range: {
          min: 10,
          max: 20,
        },
      },
      {
        id: 'iron',
        percent: 1,
        range: {
          min: 6,
          max: 10,
        },
      },
      {
        id: 'silverOre',
        percent: 0.8,
        range: {
          min: 4,
          max: 6,
        },
      },
      {
        id: 'mithrilOre',
        percent: 0.5,
        range: {
          min: 4,
          max: 5,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mining',
        increaseExp: 4,
      },
    ],
    secondaryClassification: '矿洞',
  },
  miningFishscaleMineral: {
    id: 'miningFishscaleMineral',
    name: '开采鱼鳞矿',
    icon: 'resource:fishscaleMineral',
    description: '开采鱼鳞矿',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'miningShaft',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'mining',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 0.05,
        range: {
          min: 6,
          max: 10,
        },
      },
      {
        id: 'stone',
        percent: 1,
        range: {
          min: 8,
          max: 10,
        },
      },
      {
        id: 'fishscaleMineral',
        percent: 0.8,
        range: {
          min: 1,
          max: 3,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mining',
        increaseExp: 15,
      },
    ],
    secondaryClassification: '矿洞',
  },
  miningFluffstone: {
    id: 'miningFluffstone',
    name: '开采绒毛岩',
    icon: 'resource:fluffstone',
    description: '开采绒毛岩',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'miningShaft',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'mining',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 0.05,
        range: {
          min: 6,
          max: 10,
        },
      },
      {
        id: 'stone',
        percent: 1,
        range: {
          min: 8,
          max: 10,
        },
      },
      {
        id: 'fluffstone',
        percent: 0.8,
        range: {
          min: 1,
          max: 3,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mining',
        increaseExp: 15,
      },
    ],
    secondaryClassification: '矿洞',
  },
  miningClawmarkOre: {
    id: 'miningClawmarkOre',
    name: '开采爪痕矿',
    icon: 'resource:clawmarkOre',
    description: '开采爪痕矿',
    baseDuration: 6e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'miningShaft',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'mining',
          min: 40,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 0.05,
        range: {
          min: 6,
          max: 10,
        },
      },
      {
        id: 'stone',
        percent: 1,
        range: {
          min: 8,
          max: 10,
        },
      },
      {
        id: 'clawmarkOre',
        percent: 0.8,
        range: {
          min: 1,
          max: 3,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mining',
        increaseExp: 31,
      },
    ],
    secondaryClassification: '矿洞',
  },
  miningManacrystal: {
    id: 'miningManacrystal',
    name: '开采魔晶石',
    icon: 'resource:manacrystal',
    description: '开采魔晶石',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'mining',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 0.05,
        range: {
          min: 6,
          max: 10,
        },
      },
      {
        id: 'stone',
        percent: 1,
        range: {
          min: 8,
          max: 10,
        },
      },
      {
        id: 'manacrystal',
        percent: 0.8,
        range: {
          min: 1,
          max: 3,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mining',
        increaseExp: 15,
      },
    ],
    secondaryClassification: '神秘矿洞',
  },
  miningCatEyeStone: {
    id: 'miningCatEyeStone',
    name: '开采猫眼石',
    icon: 'resource:catEyeStone',
    description: '开采猫眼石',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'mining',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 0.05,
        range: {
          min: 6,
          max: 10,
        },
      },
      {
        id: 'stone',
        percent: 1,
        range: {
          min: 8,
          max: 10,
        },
      },
      {
        id: 'catEyeStone',
        percent: 0.8,
        range: {
          min: 1,
          max: 3,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mining',
        increaseExp: 15,
      },
    ],
    secondaryClassification: '神秘矿洞',
  },
  miningAmberEyeStone: {
    id: 'miningAmberEyeStone',
    name: '开采琥珀瞳石',
    icon: 'resource:amberEyeStone',
    description: '开采琥珀瞳石',
    baseDuration: 6e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'mining',
          min: 40,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 0.05,
        range: {
          min: 6,
          max: 10,
        },
      },
      {
        id: 'stone',
        percent: 1,
        range: {
          min: 8,
          max: 10,
        },
      },
      {
        id: 'amberEyeStone',
        percent: 0.8,
        range: {
          min: 1,
          max: 3,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mining',
        increaseExp: 31,
      },
    ],
    secondaryClassification: '神秘矿洞',
  },
  makeAxe: {
    id: 'makeAxe',
    name: '制作斧头',
    icon: '🪓',
    description: '制作斧头，可以让你更快速的砍树',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'wood',
          count: 10,
        },
        {
          id: 'iron',
          count: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'axe',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '工具',
  },
  makePickAxe: {
    id: 'makePickAxe',
    name: '制作铁镐',
    icon: '⛏️',
    description: '制作铁镐，让你更快的挖挖挖',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'wood',
          count: 10,
        },
        {
          id: 'iron',
          count: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'pickaxe',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '工具',
  },
  charcoalMaking: {
    id: 'charcoalMaking',
    name: '烧制炭',
    icon: 'resource:coal',
    description: '烧制炭',
    baseDuration: 3e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'wood',
          count: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'coal',
        percent: 1,
        range: {
          min: 2,
          max: 4,
        },
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 5,
      },
    ],
  },
  makeWoodSword: {
    id: 'makeWoodSword',
    name: '制作木剑',
    icon: 'resource:woodSword',
    description: '制作木剑',
    baseDuration: 3e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
        {
          id: 'wood',
          count: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'woodSword',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 1,
      },
    ],
    secondaryClassification: '武器',
  },
  makeironDagger: {
    id: 'makeironDagger',
    name: '制作铁匕首',
    icon: '🔪',
    description: '制作一把简单的铁匕首',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 4,
        },
        {
          id: 'wood',
          count: 10,
        },
        {
          id: 'iron',
          count: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'ironDagger',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '武器',
  },
  makeIcePickaxe: {
    id: 'makeIcePickaxe',
    name: '制作冰镐',
    icon: 'resource:icePickaxe',
    description: '制作冰镐',
    baseDuration: 24e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'pickaxe',
          count: 1,
        },
        {
          id: 'axe',
          count: 1,
        },
        {
          id: 'iceBomb',
          count: 5,
        },
        {
          id: 'steel',
          count: 5,
        },
        {
          id: 'frostEssence',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'icePickaxe',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '工具',
  },
  makeWookStaff: {
    id: 'makeWookStaff',
    name: '制作木质法杖',
    icon: 'resource:woodStaff',
    description: '制作一个简单的木质法杖',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 4,
        },
        {
          id: 'wood',
          count: 40,
        },
        {
          id: 'mysticalEssence',
          count: 1,
        },
      ],
    },
    rewards: [
      {
        id: 'woodStaff',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '法杖',
  },
  makeMoonlightStaff: {
    id: 'makeMoonlightStaff',
    name: '制作月光法杖',
    icon: 'resource:moonlightStaff',
    description: '制作月光法杖',
    baseDuration: 18e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'wood',
          count: 40,
        },
        {
          id: 'whiskerFeather',
          count: 10,
        },
        {
          id: 'moonlightBell',
          count: 2,
        },
        {
          id: 'mysticalEssence',
          count: 2,
        },
      ],
    },
    rewards: [
      {
        id: 'moonlightStaff',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '法杖',
  },
  makeMewShadowStaff: {
    id: 'makeMewShadowStaff',
    name: '制作喵影法杖',
    icon: 'resource:mewShadowStaff',
    description: '制作喵影法杖',
    baseDuration: 24e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'wood',
          count: 40,
        },
        {
          id: 'whiskerFeather',
          count: 10,
        },
        {
          id: 'moonlightBell',
          count: 1,
        },
        {
          id: 'catShadowGem',
          count: 3,
        },
        {
          id: 'mysticalEssence',
          count: 3,
        },
      ],
    },
    rewards: [
      {
        id: 'mewShadowStaff',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 8,
      },
    ],
    secondaryClassification: '法杖',
  },
  smeltSteel: {
    id: 'smeltSteel',
    name: '熔炼钢',
    icon: 'resource:steel_ignot',
    description: '熔炼钢',
    baseDuration: 15e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'iron',
          count: 3,
        },
        {
          id: 'coal',
          count: 5,
        },
        {
          id: 'stone',
          count: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'steel',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '熔炼',
  },
  smeltSilverIngot: {
    id: 'smeltSilverIngot',
    name: '熔炼银',
    icon: 'resource:silverIngot',
    description: '熔炼银',
    baseDuration: 25e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'steel',
          count: 1,
        },
        {
          id: 'silverOre',
          count: 3,
        },
        {
          id: 'coal',
          count: 5,
        },
        {
          id: 'stone',
          count: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'silverIngot',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 6,
      },
    ],
    secondaryClassification: '熔炼',
  },
  smeltMithrilIngot: {
    id: 'smeltMithrilIngot',
    name: '熔炼秘银',
    icon: 'resource:mithrilIngot',
    description: '熔炼秘银',
    baseDuration: 25e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'silverIngot',
          count: 3,
        },
        {
          id: 'mithrilOre',
          count: 3,
        },
        {
          id: 'coal',
          count: 5,
        },
        {
          id: 'stone',
          count: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'mithrilIngot',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 6,
      },
    ],
    secondaryClassification: '熔炼',
  },
  smeltFishscaleMineralIgnot: {
    id: 'smeltFishscaleMineralIgnot',
    name: '熔炼鱼鳞合金',
    icon: 'resource:fishscaleMineralIgnot',
    description: '熔炼鱼鳞合金',
    baseDuration: 35e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'silverOre',
          count: 5,
        },
        {
          id: 'fishscaleMineral',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'fishscaleMineralIgnot',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 15,
      },
    ],
    secondaryClassification: '熔炼',
  },
  smeltShadowSteel: {
    id: 'smeltShadowSteel',
    name: '熔炼暗影精铁',
    icon: 'resource:shadowSteel',
    description: '熔炼暗影精铁',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'iron',
          count: 10,
        },
        {
          id: 'steel',
          count: 1,
        },
        {
          id: 'shadowOrb',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'shadowSteel',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 15,
      },
    ],
    secondaryClassification: '熔炼',
  },
  smeltStarforgedAlloy: {
    id: 'smeltStarforgedAlloy',
    name: '熔炼星辰合金',
    icon: 'resource:starforgedAlloy',
    description: '熔炼星辰合金',
    baseDuration: 6e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'steel',
          count: 10,
        },
        {
          id: 'starShard',
          count: 3,
        },
        {
          id: 'starDust',
          count: 3,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 40,
        },
      ],
    },
    rewards: [
      {
        id: 'starforgedAlloy',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 31,
      },
    ],
    secondaryClassification: '熔炼',
  },
  makeIronSword: {
    id: 'makeIronSword',
    name: '制作铁剑',
    icon: 'resource:ironSword',
    description: '制作铁剑',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'iron',
          count: 15,
        },
        {
          id: 'wood',
          count: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'ironSword',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '铁制品',
  },
  makeSteelSword: {
    id: 'makeSteelSword',
    name: '制作钢剑',
    icon: 'resource:steelSword',
    description: '制作钢剑',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'steel',
          count: 15,
        },
        {
          id: 'wood',
          count: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'steelSword',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '钢制品',
  },
  forgeIronCoat: {
    id: 'forgeIronCoat',
    name: '锻造铁甲衣',
    icon: '🦾',
    description: '用铁锻造结实的铁甲衣',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'iron',
          count: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'ironCoat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '铁制品',
  },
  forgeIronHat: {
    id: 'forgeIronHat',
    name: '锻造铁头盔',
    icon: '⛑️',
    description: '用铁锻造结实的铁头盔',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'iron',
          count: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'ironHat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '铁制品',
  },
  forgeIronGloves: {
    id: 'forgeIronGloves',
    name: '锻造铁护手',
    icon: '🧤',
    description: '用铁锻造结实的铁护手',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'iron',
          count: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'ironGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '铁制品',
  },
  forgeIronPants: {
    id: 'forgeIronPants',
    name: '锻造铁护腿',
    icon: '🥋',
    description: '用铁锻造结实的铁护腿',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'iron',
          count: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'ironPants',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '铁制品',
  },
  forgeSteelCoat: {
    id: 'forgeSteelCoat',
    name: '锻造钢甲衣',
    icon: '🦾',
    description: '用钢锻造结实的钢甲衣',
    baseDuration: 15e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'steel',
          count: 40,
        },
        {
          id: 'iron',
          count: 40,
        },
        {
          id: 'wool',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'steelCoat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '钢制品',
  },
  forgeSteelHat: {
    id: 'forgeSteelHat',
    name: '锻造钢头盔',
    icon: '⛑️',
    description: '用钢锻造结实的钢头盔',
    baseDuration: 15e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'steel',
          count: 40,
        },
        {
          id: 'iron',
          count: 40,
        },
        {
          id: 'wool',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'steelHat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '钢制品',
  },
  forgeSteelGloves: {
    id: 'forgeSteelGloves',
    name: '锻造钢护手',
    icon: '🧤',
    description: '用钢锻造结实的钢护手',
    baseDuration: 15e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'steel',
          count: 40,
        },
        {
          id: 'iron',
          count: 40,
        },
        {
          id: 'wool',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'steelGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 1,
      },
    ],
    secondaryClassification: '钢制品',
  },
  forgeSteelPants: {
    id: 'forgeSteelPants',
    name: '锻造钢护腿',
    icon: '🥋',
    description: '用钢锻造结实的钢护腿',
    baseDuration: 15e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'steel',
          count: 40,
        },
        {
          id: 'iron',
          count: 40,
        },
        {
          id: 'wool',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'steelPants',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '钢制品',
  },
  forgeSilverSword: {
    id: 'forgeSilverSword',
    name: '锻造银质剑',
    icon: 'resource:silverSword',
    description: '锻造银质剑',
    baseDuration: 18e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'silverIngot',
          count: 25,
        },
        {
          id: 'wood',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'silverSword',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 12,
      },
    ],
    secondaryClassification: '银制品',
  },
  forgeSilverDagger: {
    id: 'forgeSilverDagger',
    name: '锻造银质匕首',
    icon: 'resource:silverDagger',
    description: '锻造银质匕首',
    baseDuration: 18e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'silverIngot',
          count: 25,
        },
        {
          id: 'wood',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'silverDagger',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 12,
      },
    ],
    secondaryClassification: '银制品',
  },
  forgeSilverCoat: {
    id: 'forgeSilverCoat',
    name: '锻造银护甲',
    icon: 'resource:silverCoat',
    description: '锻造银护甲',
    baseDuration: 18e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'silverIngot',
          count: 30,
        },
        {
          id: 'cashmere',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'silverCoat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 12,
      },
    ],
    secondaryClassification: '银制品',
  },
  forgeSilverHat: {
    id: 'forgeSilverHat',
    name: '锻造银头盔',
    icon: 'resource:silverHat',
    description: '锻造银头盔',
    baseDuration: 18e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'silverIngot',
          count: 25,
        },
        {
          id: 'cashmere',
          count: 8,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'silverHat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 12,
      },
    ],
    secondaryClassification: '银制品',
  },
  forgeSilverGloves: {
    id: 'forgeSilverGloves',
    name: '锻造银护手',
    icon: 'resource:silverGloves',
    description: '锻造银护手',
    baseDuration: 18e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'silverIngot',
          count: 25,
        },
        {
          id: 'cashmere',
          count: 8,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'silverGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 12,
      },
    ],
    secondaryClassification: '银制品',
  },
  forgeSilverPants: {
    id: 'forgeSilverPants',
    name: '锻造银护腿',
    icon: 'resource:silverPants',
    description: '锻造银护腿',
    baseDuration: 18e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'silverIngot',
          count: 30,
        },
        {
          id: 'cashmere',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'silverPants',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 12,
      },
    ],
    secondaryClassification: '银制品',
  },
  forgeGoblinDaggerPlus: {
    id: 'forgeGoblinDaggerPlus',
    name: '锻造哥布林匕首·改',
    icon: 'resource:goblinDaggerPlus',
    description: '用哥布林匕首和铁锻造强化版匕首',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'steel',
          count: 25,
        },
        {
          id: 'goblinDagger',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'goblinDaggerPlus',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  forgeWolfPeltArmor: {
    id: 'forgeWolfPeltArmor',
    name: '锻造狼皮甲',
    icon: 'resource:wolfPeltArmor',
    description: '用狼皮和布料锻造防具',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'steel',
          count: 25,
        },
        {
          id: 'wolfPelt',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'wolfPeltArmor',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  forgeSkeletonShieldPlus: {
    id: 'forgeSkeletonShieldPlus',
    name: '锻造骷髅盾·强化',
    icon: '🛡️',
    description: '用骷髅盾和钢锻造强化盾牌',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'steel',
          count: 25,
        },
        {
          id: 'skeletonShield',
          count: 15,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'skeletonShieldPlus',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  forgeTrollClubPlus: {
    id: 'forgeTrollClubPlus',
    name: '锻造蛮力巨棍',
    icon: 'resource:trollClubPlus',
    description: '用巨魔木棒和铁锻造重型武器',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'steel',
          count: 25,
        },
        {
          id: 'trollClub',
          count: 10,
        },
        {
          id: 'wood',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'trollClubPlus',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 6,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  forgeScorpionStingerSpear: {
    id: 'forgeScorpionStingerSpear',
    name: '锻造巨蝎毒矛',
    icon: '🦂',
    description: '用巨蝎毒针和木材锻造长矛',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'steel',
          count: 25,
        },
        {
          id: 'scorpionStinger',
          count: 10,
        },
        {
          id: 'wool',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'scorpionStingerSpear',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 6,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  forgeGuardianCoreAmulet: {
    id: 'forgeGuardianCoreAmulet',
    name: '锻造守护者核心护符',
    icon: 'resource:guardianCoreAmulet',
    description: '用守护者核心和魔法精华锻造护符',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'steel',
          count: 25,
        },
        {
          id: 'guardianCore',
          count: 10,
        },
        {
          id: 'mysticalEssence',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'guardianCoreAmulet',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 8,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  forgeDragonScaleArmor: {
    id: 'forgeDragonScaleArmor',
    name: '锻造龙鳞甲',
    icon: 'resource:dragonScaleArmor',
    description: '用龙鳞和钢锻造顶级防具',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'steel',
          count: 10,
        },
        {
          id: 'dragonScale',
          count: 10,
        },
        {
          id: 'wool',
          count: 50,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'dragonScaleArmor',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 12,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  forgeForestDagger: {
    id: 'forgeForestDagger',
    name: '锻造冰霜匕首',
    icon: 'resource:forestDagger',
    description: '用寒冷物品所锻造的匕首',
    baseDuration: 6e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: 'iceGel',
          count: 10,
        },
        {
          id: 'frostEssence',
          count: 10,
        },
        {
          id: 'iron',
          count: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'forestDagger',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 12,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  sewCatFurCoat: {
    id: 'sewCatFurCoat',
    name: '缝制毛毛衣',
    icon: 'resource:catFurCoat',
    description: '用猫毛和线缝制成毛毛衣',
    baseDuration: 6e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'catHairball',
          count: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'catFurCoat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '基础缝纫',
  },
  sewCatFurHat: {
    id: 'sewCatFurHat',
    name: '缝制毛毛帽',
    icon: 'resource:catFurHat',
    description: '用猫毛和线缝制成毛毛帽',
    baseDuration: 6e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'catHairball',
          count: 25,
        },
        {
          id: 'bamboo',
          count: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'catFurHat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 1,
      },
    ],
    secondaryClassification: '基础缝纫',
  },
  sewCatFurGloves: {
    id: 'sewCatFurGloves',
    name: '缝制毛毛手套',
    icon: 'resource:catFurGloves',
    description: '用猫毛和线缝制成毛毛手套',
    baseDuration: 6e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'catHairball',
          count: 50,
        },
      ],
    },
    rewards: [
      {
        id: 'catFurGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '基础缝纫',
  },
  sewCatFurPants: {
    id: 'sewCatFurPants',
    name: '缝制毛毛裤',
    icon: 'resource:catFurPants',
    description: '用猫毛和线缝制成毛毛裤',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'catHairball',
          count: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'catFurPants',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '基础缝纫',
  },
  sewWoolCoat: {
    id: 'sewWoolCoat',
    name: '缝制羊毛衣',
    icon: '🧶',
    description: '用羊毛缝制成温暖的羊毛衣',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'wool',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'woolCoat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  sewWoolHat: {
    id: 'sewWoolHat',
    name: '缝制羊毛帽',
    icon: '🎩',
    description: '用羊毛缝制成保暖的羊毛帽',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'wool',
          count: 10,
        },
        {
          id: 'bamboo',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'woolHat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 4,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  sewWoolGloves: {
    id: 'sewWoolGloves',
    name: '缝制羊毛手套',
    icon: '🧤',
    description: '用羊毛缝制成保暖的羊毛手套',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'wool',
          count: 10,
        },
        {
          id: 'catHairball',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'woolGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 4,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  sewWoolPants: {
    id: 'sewWoolPants',
    name: '缝制羊毛裤',
    icon: '👖',
    description: '用羊毛缝制成舒适的羊毛裤',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'wool',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'woolPants',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  makeFarmingGloves: {
    id: 'makeFarmingGloves',
    name: '缝制园艺手套',
    icon: '🧑‍🌾',
    description: '用羊毛和草药缝制的园艺手套',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'wool',
          count: 10,
        },
        {
          id: 'catHairball',
          count: 0,
        },
      ],
    },
    rewards: [
      {
        id: 'farmingGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 4,
      },
    ],
    secondaryClassification: '工作服',
  },
  makeMiningBelt: {
    id: 'makeMiningBelt',
    name: '缝制采矿工作服',
    icon: '🦺',
    description: '用竹子和羊毛制作，勉强算结实',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'wool',
          count: 10,
        },
        {
          id: 'iron',
          count: 0,
        },
      ],
    },
    rewards: [
      {
        id: 'miningBelt',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '工作服',
  },
  makeFishingHat: {
    id: 'makeFishingHat',
    name: '缝制钓鱼帽',
    icon: '🧢',
    description: '用羊毛和猫毛球缝制的钓鱼专用帽',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'wool',
          count: 10,
        },
        {
          id: 'bamboo',
          count: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'fishingHat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '工作服',
  },
  makeFocusedFishingCap: {
    id: 'makeFocusedFishingCap',
    name: '缝制钓鱼专注帽',
    icon: '🧢',
    description: '有着较精致装饰的，专为钓鱼专注设计的帽子',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'wool',
          count: 10,
        },
        {
          id: 'bamboo',
          count: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'focusedFishingCap',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 6,
      },
    ],
    secondaryClassification: '工作服',
  },
  makeHeavyMinerGloves: {
    id: 'makeHeavyMinerGloves',
    name: '缝制重型矿工手套',
    icon: '🧤',
    description: '专为矿工设计，挖矿效率大幅提升，但采集和种植变慢',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'wool',
          count: 10,
        },
        {
          id: 'catHairball',
          count: 10,
        },
        {
          id: 'iron',
          count: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'heavyMinerGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 6,
      },
    ],
    secondaryClassification: '工作服',
  },
  makeAgileGatherBoots: {
    id: 'makeAgileGatherBoots',
    name: '缝制灵巧采集靴',
    icon: '🥾',
    description: '让你采集更快，但挖矿效率降低',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'wool',
          count: 10,
        },
        {
          id: 'catHairball',
          count: 10,
        },
        {
          id: 'iron',
          count: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'agileGatherBoots',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '工作服',
  },
  makeChefHat: {
    id: 'makeChefHat',
    name: '缝制厨师帽',
    icon: 'resource:chefHat',
    description: '用羊毛和猫毛球缝制的专业厨师帽，提升烹饪效率。',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'wool',
          count: 30,
        },
        {
          id: 'catHairball',
          count: 50,
        },
      ],
    },
    rewards: [
      {
        id: 'chefHat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '工作服',
  },
  makeCollectingBracelet: {
    id: 'makeCollectingBracelet',
    name: '制作采集手环',
    icon: '🪢',
    description: '用贝壳和草药制作提升采集效率的手环',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'wool',
          count: 10,
        },
        {
          id: 'bamboo',
          count: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'collectingBracelet',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '饰品',
  },
  craftLuckyCatStatue: {
    id: 'craftLuckyCatStatue',
    name: '制作幸运猫神像',
    icon: '🗿',
    description: '将古老文物与祝福之力结合，创造强大的幸运物品',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'catStatue',
          count: 1,
        },
        {
          id: 'moonlightBell',
          count: 1,
        },
        {
          id: 'mysticalEssence',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 8,
        },
      ],
    },
    rewards: [
      {
        id: 'catRelic',
        percent: 1,
        count: 1,
      },
      {
        id: 'catPawCoin',
        percent: 0.3,
        range: {
          min: 2,
          max: 4,
        },
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 5,
      },
    ],
  },
  createCatTalisman: {
    id: 'createCatTalisman',
    name: '制作猫咪护符',
    icon: '🔮',
    description: '运用古老卷轴的知识制作神秘护符',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'catScroll',
          count: 1,
        },
        {
          id: 'catHairball',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'luckyCatCharm',
        percent: 1,
        count: 1,
      },
      {
        id: 'magicScroll',
        percent: 0.3,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 5,
      },
    ],
  },
  brewMysticalCatnipPotion: {
    id: 'brewMysticalCatnipPotion',
    name: '炼制猫薄荷药剂',
    icon: '⚗️',
    description: '将猫薄荷宝石与其他材料炼制成神奇药剂',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'catnipGem',
          count: 1,
        },
        {
          id: 'mysticalEssence',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'intelligence',
          min: 8,
        },
      ],
    },
    rewards: [
      {
        id: 'catPotion',
        percent: 1,
        count: 1,
      },
      {
        id: 'moonlightBell',
        percent: 0.3,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 5,
      },
    ],
  },
  assembleCatRelicMosaic: {
    id: 'assembleCatRelicMosaic',
    name: '拼接猫咪文物',
    icon: '🧩',
    description: '将古董碎片重组为完整的文物',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'catAntiqueShard',
          count: 5,
        },
        {
          id: 'catHairball',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'dexterity',
          min: 6,
        },
      ],
    },
    rewards: [
      {
        id: 'catStatue',
        percent: 1,
        count: 1,
      },
      {
        id: 'moonlightBell',
        percent: 0.3,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 5,
      },
    ],
  },
  createCollectRing2: {
    id: 'createCollectRing2',
    name: '融合采集戒指',
    icon: 'resource:collectRing2',
    description: '融合多个采集戒指，以提升它的能力',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'collectRing',
          count: 1,
        },
        {
          id: 'slimeGel',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 15,
        },
        {
          status: 'mysterious',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'collectRing2',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 10,
      },
    ],
  },
  baseGoldenTouch_0: {
    id: 'baseGoldenTouch_0',
    name: '猫咪点金术1',
    icon: '💰',
    description: '猫咪自学的点金术，有一定概率失败',
    baseDuration: 4e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
        {
          id: 'fish',
          count: 1,
        },
        {
          id: 'mushroom',
          count: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 0.9,
        range: {
          min: 48,
          max: 60,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '猫咪自学点金术',
  },
  baseGoldenTouch_1: {
    id: 'baseGoldenTouch_1',
    name: '猫咪点金术2',
    icon: '💰',
    description: '猫咪自学的点金术，有一定概率失败',
    baseDuration: 4e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
        {
          id: 'fish',
          count: 1,
        },
        {
          id: 'wood',
          count: 2,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 0.9,
        range: {
          min: 60,
          max: 80,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '猫咪自学点金术',
  },
  baseGoldenTouch_2: {
    id: 'baseGoldenTouch_2',
    name: '猫咪点金术3',
    icon: '💰',
    description: '猫咪自学的点金术，有一定概率失败',
    baseDuration: 4e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
        {
          id: 'stone',
          count: 3,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 0.9,
        range: {
          min: 40,
          max: 60,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '猫咪自学点金术',
  },
  baseGoldenTouch0: {
    id: 'baseGoldenTouch0',
    name: '猫咪点金术4',
    icon: '💰',
    description: '猫咪自学的点金术，有一定概率失败',
    baseDuration: 4e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
        {
          id: 'fish',
          count: 1,
        },
        {
          id: 'wood',
          count: 1,
        },
        {
          id: 'coal',
          count: 1,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 0.9,
        range: {
          min: 100,
          max: 120,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '猫咪自学点金术',
  },
  baseGoldenTouch_3: {
    id: 'baseGoldenTouch_3',
    name: '猫咪点金术5',
    icon: '💰',
    description: '猫咪自学的点金术，有一定概率失败',
    baseDuration: 4e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
        {
          id: 'berry',
          count: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 0.9,
        range: {
          min: 180,
          max: 210,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '猫咪自学点金术',
  },
  baseGoldenTouch1: {
    id: 'baseGoldenTouch1',
    name: '基础点金术1',
    icon: '💰',
    description: '将物品转化为黄金',
    baseDuration: 12e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'berry',
          count: 50,
        },
        {
          id: 'herb',
          count: 20,
        },
        {
          id: 'mushroom',
          count: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 1,
        range: {
          min: 500,
          max: 670,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '基础点金术',
  },
  baseGoldenTouch2: {
    id: 'baseGoldenTouch2',
    name: '基础点金术2',
    icon: '💰',
    description: '将物品转化为黄金',
    baseDuration: 12e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'mysticalEssence',
          count: 1,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 1,
        range: {
          min: 6e3,
          max: 8500,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '基础点金术',
  },
  baseGoldenTouch3: {
    id: 'baseGoldenTouch3',
    name: '基础点金术3',
    icon: '💰',
    description: '将物品转化为黄金',
    baseDuration: 12e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'mysticalEssence',
          count: 1,
        },
        {
          id: 'moonlightBell',
          count: 1,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 1,
        range: {
          min: 8e3,
          max: 12e3,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '基础点金术',
  },
  baseGoldenTouch4: {
    id: 'baseGoldenTouch4',
    name: '基础点金术4',
    icon: '💰',
    description: '将物品转化为黄金',
    baseDuration: 12e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'stone',
          count: 120,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 1,
        range: {
          min: 700,
          max: 900,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '基础点金术',
  },
  baseGoldenTouch5: {
    id: 'baseGoldenTouch5',
    name: '基础点金术5',
    icon: '💰',
    description: '将物品转化为黄金',
    baseDuration: 12e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'catHairball',
          count: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 1,
        range: {
          min: 500,
          max: 700,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '基础点金术',
  },
  essenceGoldenTouch1: {
    id: 'essenceGoldenTouch1',
    name: '精华点金术1',
    icon: '💰',
    description: '将精华转化为黄金',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 25,
        },
        {
          id: 'gold',
          count: 1,
        },
        {
          id: 'sewingEssence',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 15,
        },
        {
          status: 'mysterious',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 1,
        range: {
          min: 1200,
          max: 1500,
        },
      },
      {
        id: 'sewingEssence',
        percent: 0.005,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '精华点金术',
  },
  essenceGoldenTouch2: {
    id: 'essenceGoldenTouch2',
    name: '精华点金术2',
    icon: '💰',
    description: '将精华转化为黄金',
    baseDuration: 42e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 25,
        },
        {
          id: 'gold',
          count: 1,
        },
        {
          id: 'craftingEssence',
          count: 1,
        },
        {
          id: 'stone',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 15,
        },
        {
          status: 'mysterious',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 1,
        range: {
          min: 1750,
          max: 2250,
        },
      },
      {
        id: 'flashStone',
        percent: 0.01,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '精华点金术',
  },
  essenceGoldenTouch3: {
    id: 'essenceGoldenTouch3',
    name: '精华点金术3',
    icon: '💰',
    description: '将精华转化为黄金',
    baseDuration: 6e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 25,
        },
        {
          id: 'gold',
          count: 1,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
        {
          id: 'berry',
          count: 5,
        },
        {
          id: 'mushroom',
          count: 5,
        },
        {
          id: 'chickenEgg',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 15,
        },
        {
          status: 'mysterious',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 1,
        range: {
          min: 200,
          max: 220,
        },
      },
      {
        id: 'hugeMushroom',
        percent: 0.005,
        count: 1,
      },
      {
        id: 'mysteriousBerry_1',
        percent: 0.005,
        count: 1,
      },
      {
        id: 'goldenEgg',
        percent: 1e-4,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '精华点金术',
  },
  essenceGoldenTouch4: {
    id: 'essenceGoldenTouch4',
    name: '精华点金术4',
    icon: '💰',
    description: '将精华转化为黄金',
    baseDuration: 42e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 25,
        },
        {
          id: 'gold',
          count: 1,
        },
        {
          id: 'knowledgeEssence',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 15,
        },
        {
          status: 'mysterious',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 1,
        range: {
          min: 7500,
          max: 8500,
        },
      },
      {
        id: 'knowledgeEssence',
        percent: 0.005,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '精华点金术',
  },
  monsterEssenceGoldenTouch1: {
    id: 'monsterEssenceGoldenTouch1',
    name: '精华点金术5',
    icon: '💰',
    description: '将精华转化为黄金',
    baseDuration: 6e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 25,
        },
        {
          id: 'gold',
          count: 1,
        },
        {
          id: 'pure_monster_essence_lv1',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 15,
        },
        {
          status: 'mysterious',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 1,
        range: {
          min: 1e5,
          max: 125e3,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '精华点金术',
  },
  monsterEssenceGoldenTouch2: {
    id: 'monsterEssenceGoldenTouch2',
    name: '精华点金术6',
    icon: '💰',
    description: '将精华转化为黄金',
    baseDuration: 9e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 25,
        },
        {
          id: 'gold',
          count: 1,
        },
        {
          id: 'pure_monster_essence_lv2',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 17,
        },
        {
          status: 'mysterious',
          min: 22,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 1,
        range: {
          min: 125e3,
          max: 15e4,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '精华点金术',
  },
  monsterEssenceGoldenTouch3: {
    id: 'monsterEssenceGoldenTouch3',
    name: '精华点金术7',
    icon: '💰',
    description: '将精华转化为黄金',
    baseDuration: 12e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 25,
        },
        {
          id: 'gold',
          count: 1,
        },
        {
          id: 'pure_monster_essence_lv3',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 20,
        },
        {
          status: 'mysterious',
          min: 23,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 1,
        range: {
          min: 15e4,
          max: 175e3,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '精华点金术',
  },
  monsterEssenceGoldenTouch4: {
    id: 'monsterEssenceGoldenTouch4',
    name: '精华点金术8',
    icon: '💰',
    description: '将精华转化为黄金',
    baseDuration: 18e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 25,
        },
        {
          id: 'gold',
          count: 1,
        },
        {
          id: 'pure_monster_essence_lv4',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 25,
        },
        {
          status: 'mysterious',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'gold',
        percent: 1,
        range: {
          min: 5e5,
          max: 1e6,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '精华点金术',
  },
  running: {
    id: 'running',
    name: '跑步',
    icon: '🏃',
    banToKitty: !0,
    description: '跑步，可以锻炼你的耐力与敏捷',
    baseDuration: 9e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
      ],
    },
    rewards: [],
    characterImprove: [
      {
        status: 'dexterity',
        increaseExp: 3,
      },
      {
        status: 'stamina',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '锻炼',
  },
  weightlifting: {
    id: 'weightlifting',
    name: '举重',
    icon: '🏋️',
    banToKitty: !0,
    description: '举重，可以锻炼你的力量与耐力',
    baseDuration: 9e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
      ],
    },
    rewards: [],
    characterImprove: [
      {
        status: 'stamina',
        increaseExp: 3,
      },
      {
        status: 'strength',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '锻炼',
  },
  reading: {
    id: 'reading',
    name: '读书',
    icon: '📖',
    banToKitty: !0,
    description: '阅读，可以提升你的智力与学识',
    baseDuration: 9e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
      ],
    },
    rewards: [],
    characterImprove: [
      {
        status: 'intelligence',
        increaseExp: 3,
      },
      {
        status: 'knowledge',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '锻炼',
  },
  combatExercise: {
    id: 'combatExercise',
    name: '战斗练习',
    icon: '🤺',
    banToKitty: !0,
    description: '在训练场训练战斗技能',
    baseDuration: 9e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
      ],
    },
    rewards: [],
    characterImprove: [
      {
        status: 'attacking',
        increaseExp: 3,
      },
      {
        status: 'defencing',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '实战',
  },
  combatExerciseAttack: {
    id: 'combatExerciseAttack',
    name: '基础攻击练习',
    icon: '🤺',
    banToKitty: !0,
    description: '对攻击能力进行特训',
    baseDuration: 9e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
      ],
    },
    rewards: [],
    characterImprove: [
      {
        status: 'attacking',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '实战',
  },
  combatExerciseDefence: {
    id: 'combatExerciseDefence',
    name: '基础防御练习',
    icon: '🤺',
    banToKitty: !0,
    description: '对防御能力进行特训',
    baseDuration: 9e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
      ],
    },
    rewards: [],
    characterImprove: [
      {
        status: 'defencing',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '实战',
  },
  swim: {
    id: 'swim',
    name: '游泳',
    icon: '🏊',
    banToKitty: !0,
    description: '到游泳馆游泳，虽然猫猫不喜欢水，但猫猫想要变的更强壮',
    baseDuration: 9e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 15,
        },
        {
          id: 'gold',
          count: 25,
        },
      ],
    },
    rewards: [],
    characterImprove: [
      {
        status: 'stamina',
        increaseExp: 6,
      },
      {
        status: 'dexterity',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '室内训练',
  },
  boxing: {
    id: 'boxing',
    name: '搏击训练',
    icon: '🥊',
    banToKitty: !0,
    description: '进行友好的猫咪格斗，提升力量、耐力和防御',
    baseDuration: 9e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 15,
        },
        {
          id: 'gold',
          count: 25,
        },
      ],
    },
    rewards: [],
    characterImprove: [
      {
        status: 'stamina',
        increaseExp: 2,
      },
      {
        status: 'strength',
        increaseExp: 2,
      },
      {
        status: 'attacking',
        increaseExp: 3,
      },
      {
        status: 'defencing',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '室内训练',
  },
  toughnessTraining: {
    id: 'toughnessTraining',
    name: '抗打击训练',
    icon: '🦾',
    banToKitty: !0,
    description: '在训练场进行高强度抗打击训练，提升防御和耐力',
    baseDuration: 9e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 18,
        },
        {
          id: 'gold',
          count: 25,
        },
      ],
    },
    rewards: [],
    characterImprove: [
      {
        status: 'stamina',
        increaseExp: 5,
      },
      {
        status: 'defencing',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '室内训练',
  },
  yoga: {
    id: 'yoga',
    name: '瑜伽练习',
    icon: '🧘',
    banToKitty: !0,
    description: '进行猫咪专属的拉伸和冥想，提升身体韧性和防御',
    baseDuration: 9e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 15,
        },
        {
          id: 'gold',
          count: 25,
        },
      ],
    },
    rewards: [],
    characterImprove: [
      {
        status: 'stamina',
        increaseExp: 3,
      },
      {
        status: 'dexterity',
        increaseExp: 6,
      },
    ],
    secondaryClassification: '室内训练',
  },
  sewWoolBurqa: {
    id: 'sewWoolBurqa',
    name: '缝制羊毛罩袍',
    icon: 'resource:woolBurqa',
    description: '缝制羊毛罩袍',
    baseDuration: 24e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'cashmere',
          count: 30,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 6,
        },
      ],
    },
    rewards: [
      {
        id: 'woolBurqa',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  sewWoolMageHat: {
    id: 'sewWoolMageHat',
    name: '缝制羊毛法师帽',
    icon: 'resource:woolMageHat',
    description: '缝制羊毛法师帽',
    baseDuration: 24e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'cashmere',
          count: 25,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 6,
        },
      ],
    },
    rewards: [
      {
        id: 'woolMageHat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 6,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  sewWoolMageLongGloves: {
    id: 'sewWoolMageLongGloves',
    name: '缝制羊毛法师手套',
    icon: 'resource:woolMageLongGloves',
    description: '缝制羊毛法师手套',
    baseDuration: 24e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 7,
        },
        {
          id: 'cashmere',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 6,
        },
      ],
    },
    rewards: [
      {
        id: 'woolMageLongGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 7,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  sewWoolMagePants: {
    id: 'sewWoolMagePants',
    name: '缝制羊毛法师裤子',
    icon: 'resource:woolMagePants',
    description: '缝制羊毛法师裤子',
    baseDuration: 24e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 8,
        },
        {
          id: 'cashmere',
          count: 25,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 6,
        },
      ],
    },
    rewards: [
      {
        id: 'woolMagePants',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 8,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  sewWoolTightsCloth: {
    id: 'sewWoolTightsCloth',
    name: '缝制羊毛紧身衣',
    icon: 'resource:woolTightsCloth',
    description: '缝制羊毛紧身衣',
    baseDuration: 24e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'cashmere',
          count: 30,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 6,
        },
      ],
    },
    rewards: [
      {
        id: 'woolTightsCloth',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  sewWoolDexHeadScarf: {
    id: 'sewWoolDexHeadScarf',
    name: '缝制羊毛裹头巾',
    icon: 'resource:woolDexHeadScarf',
    description: '缝制羊毛裹头巾',
    baseDuration: 24e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'cashmere',
          count: 25,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 6,
        },
      ],
    },
    rewards: [
      {
        id: 'woolDexHeadScarf',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 6,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  sewWoolDexGloves: {
    id: 'sewWoolDexGloves',
    name: '缝制羊毛绑带手套',
    icon: 'resource:woolDexGloves',
    description: '缝制羊毛绑带手套',
    baseDuration: 24e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 7,
        },
        {
          id: 'cashmere',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 6,
        },
      ],
    },
    rewards: [
      {
        id: 'woolDexGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 7,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  sewWoolTightsPants: {
    id: 'sewWoolTightsPants',
    name: '缝制羊毛紧身裤',
    icon: 'resource:woolTightsPants',
    description: '缝制羊毛紧身裤',
    baseDuration: 24e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 8,
        },
        {
          id: 'cashmere',
          count: 25,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 6,
        },
      ],
    },
    rewards: [
      {
        id: 'woolTightsPants',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 8,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  sewSilkMageBurqa: {
    id: 'sewSilkMageBurqa',
    name: '缝制丝质罩袍',
    icon: 'resource:silkMageBurqa',
    description: '缝制丝质罩袍',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'silkFabric',
          count: 30,
        },
        {
          id: 'mysticalEssence',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'silkMageBurqa',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 11,
      },
    ],
    secondaryClassification: '丝制品',
  },
  sewSilkMageHat: {
    id: 'sewSilkMageHat',
    name: '缝制丝质法师帽',
    icon: 'resource:silkMageHat',
    description: '缝制丝质法师帽',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'silkFabric',
          count: 25,
        },
        {
          id: 'mysticalEssence',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'silkMageHat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '丝制品',
  },
  sewSilkMageLongGloves: {
    id: 'sewSilkMageLongGloves',
    name: '缝制丝质法师手套',
    icon: 'resource:silkMageLongGloves',
    description: '缝制丝质法师手套',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 7,
        },
        {
          id: 'silkFabric',
          count: 25,
        },
        {
          id: 'mysticalEssence',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'silkMageLongGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 9,
      },
    ],
    secondaryClassification: '丝制品',
  },
  sewSilkMagePants: {
    id: 'sewSilkMagePants',
    name: '缝制丝质法师裤子',
    icon: 'resource:silkMagePants',
    description: '缝制丝质法师裤子',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 8,
        },
        {
          id: 'silkFabric',
          count: 30,
        },
        {
          id: 'mysticalEssence',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'silkMagePants',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 11,
      },
    ],
    secondaryClassification: '丝制品',
  },
  sewSilkTightsCloth: {
    id: 'sewSilkTightsCloth',
    name: '缝制丝质夜行衣',
    icon: 'resource:silkTightsCloth',
    description: '缝制丝质夜行衣',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'silkFabric',
          count: 30,
        },
        {
          id: 'moonlightBell',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'silkTightsCloth',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 11,
      },
    ],
    secondaryClassification: '丝制品',
  },
  sewSilkDexHeadScarf: {
    id: 'sewSilkDexHeadScarf',
    name: '缝制丝质裹头巾',
    icon: 'resource:silkDexHeadScarf',
    description: '缝制丝质裹头巾',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'silkFabric',
          count: 25,
        },
        {
          id: 'moonlightBell',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'silkDexHeadScarf',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '丝制品',
  },
  sewSilkDexGloves: {
    id: 'sewSilkDexGloves',
    name: '缝制丝质绑带手套',
    icon: 'resource:silkDexGloves',
    description: '缝制丝质绑带手套',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 7,
        },
        {
          id: 'silkFabric',
          count: 25,
        },
        {
          id: 'moonlightBell',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'silkDexGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 9,
      },
    ],
    secondaryClassification: '丝制品',
  },
  sewSilkTightsPants: {
    id: 'sewSilkTightsPants',
    name: '缝制丝质宽松裤',
    icon: 'resource:silkTightsPants',
    description: '缝制丝质宽松裤',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 8,
        },
        {
          id: 'silkFabric',
          count: 30,
        },
        {
          id: 'moonlightBell',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'silkTightsPants',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 11,
      },
    ],
    secondaryClassification: '丝制品',
  },
  sewSnowWolfCloak: {
    id: 'sewSnowWolfCloak',
    name: '缝制雪狼皮披风',
    icon: 'resource:snowWolfCloak',
    description: '缝制雪狼皮披风',
    baseDuration: 24e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 24,
        },
        {
          id: 'cashmere',
          count: 10,
        },
        {
          id: 'wolfPelt',
          count: 10,
        },
        {
          id: 'snowWolfFur',
          count: 10,
        },
        {
          id: 'snowBeastHide',
          count: 1,
        },
        {
          id: 'frostCrystal',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'snowWolfCloak',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  sewIceFeatherBoots: {
    id: 'sewIceFeatherBoots',
    name: '缝制冰羽靴',
    icon: 'resource:iceFeatherBoots',
    description: '缝制冰羽靴',
    baseDuration: 24e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 24,
        },
        {
          id: 'iceBatWing',
          count: 15,
        },
        {
          id: 'snowWolfFur',
          count: 15,
        },
        {
          id: 'frostCrystal',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'iceFeatherBoots',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  farmingChicken: {
    id: 'farmingChicken',
    name: '照料小鸡仔',
    icon: '🐤',
    description: '照料小鸡仔，可以收获鸡蛋与鸡肉',
    baseDuration: 15e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'henhouse',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 2,
        },
      ],
    },
    rewards: [
      {
        id: 'chickenEgg',
        percent: 1,
        range: {
          min: 2,
          max: 4,
        },
      },
      {
        id: 'animalManure',
        percent: 0.1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'farmingAnimal',
        increaseExp: 2,
      },
    ],
  },
  farmingCow: {
    id: 'farmingCow',
    name: '照料奶牛',
    icon: '🐄',
    description: '照料奶牛，可以收获牛奶',
    baseDuration: 15e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'cowshed',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 2,
        },
      ],
    },
    rewards: [
      {
        id: 'milk',
        percent: 1,
        range: {
          min: 2,
          max: 4,
        },
      },
      {
        id: 'animalManure',
        percent: 0.12,
        range: {
          min: 2,
          max: 3,
        },
      },
    ],
    characterImprove: [
      {
        status: 'farmingAnimal',
        increaseExp: 2,
      },
    ],
  },
  farmingSheep: {
    id: 'farmingSheep',
    name: '照料绵羊',
    icon: '🐑',
    description: '照料绵羊，可以收获羊毛',
    baseDuration: 15e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'sheepfold',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 2,
        },
      ],
    },
    rewards: [
      {
        id: 'wool',
        percent: 1,
        range: {
          min: 2,
          max: 4,
        },
      },
      {
        id: 'animalManure',
        percent: 0.12,
        range: {
          min: 2,
          max: 3,
        },
      },
    ],
    characterImprove: [
      {
        status: 'farmingAnimal',
        increaseExp: 2,
      },
    ],
  },
  sericulture: {
    id: 'sericulture',
    name: '养蚕',
    icon: 'resource:silk',
    description: '饲养蚕宝宝，可以收获蚕丝',
    baseDuration: 3e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'sericultureRoom',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 3,
        },
      ],
      characterStatus: [
        {
          status: 'farmingAnimal',
          min: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'silk',
        percent: 1,
        range: {
          min: 2,
          max: 4,
        },
      },
    ],
    characterImprove: [
      {
        status: 'farmingAnimal',
        increaseExp: 4,
      },
    ],
  },
  pearlCultivation: {
    id: 'pearlCultivation',
    name: '培育珍珠',
    icon: 'resource:pearlFarm',
    description: '在清澈的水池中养殖珍珠蚌，耐心等待它们孕育出珍贵的珍珠',
    baseDuration: 12e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'pearlFarm',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 25,
        },
        {
          id: 'sand',
          count: 15,
        },
        {
          id: 'nutrientEssence',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'farmingAnimal',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'pearl',
        percent: 1,
        count: 1,
      },
      {
        id: 'moonPearl',
        percent: 0.05,
        count: 1,
      },
      {
        id: 'blackPearl',
        percent: 0.01,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'farmingAnimal',
        increaseExp: 16,
      },
    ],
  },
  makeVenomDagger: {
    id: 'makeVenomDagger',
    name: '制作剧毒匕首',
    icon: 'resource:venomDagger',
    description: '制作一把剧毒的匕首',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 4,
        },
        {
          id: 'ironDagger',
          count: 1,
        },
        {
          id: 'toxicSpore',
          count: 30,
        },
        {
          id: 'scorpionStinger',
          count: 30,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'venomDagger',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '武器',
  },
  makeSilverNecklace: {
    id: 'makeSilverNecklace',
    name: '制作银项链',
    icon: 'resource:silverNecklace',
    baseDuration: 18e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'silverIngot',
          count: 12,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'silverNecklace',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 7,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeSilverBracelet: {
    id: 'makeSilverBracelet',
    name: '制作银手链',
    icon: 'resource:silverBracelet',
    baseDuration: 18e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'silverIngot',
          count: 12,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'silverBracelet',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 7,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeAncientFishboneNecklace: {
    id: 'makeAncientFishboneNecklace',
    name: '制作远古鱼骨项链',
    icon: 'resource:ancientFishboneNecklace',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'silverNecklace',
          count: 1,
        },
        {
          id: 'ancientFishBone',
          count: 15,
        },
        {
          id: 'catnipGem',
          count: 2,
        },
        {
          id: 'catHairball',
          count: 25,
        },
        {
          id: 'shell',
          count: 2,
        },
      ],
    },
    rewards: [
      {
        id: 'ancientFishboneNecklace',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 7,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeMoonlightPendant: {
    id: 'makeMoonlightPendant',
    name: '制作月光吊坠',
    icon: 'resource:moonlightPendant',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'silverNecklace',
          count: 1,
        },
        {
          id: 'moonlightBell',
          count: 8,
        },
        {
          id: 'catnipGem',
          count: 2,
        },
        {
          id: 'catHairball',
          count: 25,
        },
        {
          id: 'mysticalEssence',
          count: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'moonlightPendant',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 7,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeMoonlightGuardianCoreAmulet: {
    id: 'makeMoonlightGuardianCoreAmulet',
    name: '制作月光守护者',
    icon: 'resource:moonlightGuardianCoreAmulet',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'moonlightBell',
          count: 12,
        },
        {
          id: 'guardianCoreAmulet',
          count: 1,
        },
        {
          id: 'mysticalEssence',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 7,
        },
      ],
    },
    rewards: [
      {
        id: 'moonlightGuardianCoreAmulet',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 12,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeCatPotionSilverBracelet: {
    id: 'makeCatPotionSilverBracelet',
    name: '制作猫薄荷手链',
    icon: 'resource:catPotionSilverBracelet',
    baseDuration: 24e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'silverBracelet',
          count: 1,
        },
        {
          id: 'catnipGem',
          count: 8,
        },
        {
          id: 'catPotion',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 6,
        },
      ],
    },
    rewards: [
      {
        id: 'catPotionSilverBracelet',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 9,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeEmberAegis: {
    id: 'makeEmberAegis',
    name: '制作余烬庇护',
    icon: 'resource:emberAegis',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'catRelic',
          count: 2,
        },
        {
          id: 'lavaHeart',
          count: 8,
        },
        {
          id: 'silverNecklace',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'emberAegis',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeSlimeDivideCore: {
    id: 'makeSlimeDivideCore',
    name: '制作分裂核心',
    icon: 'resource:slimeDivideCore',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'silverNecklace',
          count: 1,
        },
        {
          id: 'slimeCore',
          count: 25,
        },
        {
          id: 'slimeGel',
          count: 100,
        },
        {
          id: 'iceBomb',
          count: 10,
        },
        {
          id: 'candyBomb',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'slimeDivideCore',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeOverloadGuardianCore: {
    id: 'makeOverloadGuardianCore',
    name: '制作过载核心',
    icon: 'resource:overloadGuardianCore',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'silverNecklace',
          count: 1,
        },
        {
          id: 'ancientGear',
          count: 10,
        },
        {
          id: 'guardianCoreAmulet',
          count: 2,
        },
        {
          id: 'mysticalEssence',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'overloadGuardianCore',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeStealthAmulet: {
    id: 'makeStealthAmulet',
    name: '制作伏击吊坠',
    icon: 'resource:stealthAmulet',
    description: '制作伏击吊坠',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'silverNecklace',
          count: 1,
        },
        {
          id: 'whiskerCharm',
          count: 25,
        },
        {
          id: 'phantomWhisker',
          count: 25,
        },
        {
          id: 'smokeBall',
          count: 25,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'stealthAmulet',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeInitiativeAmulet: {
    id: 'makeInitiativeAmulet',
    name: '制作先机吊坠',
    icon: 'resource:initiativeAmulet',
    description: '制作先机吊坠',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'silverNecklace',
          count: 1,
        },
        {
          id: 'whiskerCharm',
          count: 25,
        },
        {
          id: 'phantomWhisker',
          count: 25,
        },
        {
          id: 'lizardTail',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'initiativeAmulet',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeRiposteAmulet: {
    id: 'makeRiposteAmulet',
    name: '制作反击护符',
    icon: 'resource:riposteAmulet',
    description: '制作反击护符',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'silverNecklace',
          count: 1,
        },
        {
          id: 'whiskerCharm',
          count: 25,
        },
        {
          id: 'phantomWhisker',
          count: 25,
        },
        {
          id: 'rareClaw',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'riposteAmulet',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeOtherworldCrystalPendant: {
    id: 'makeOtherworldCrystalPendant',
    name: '制作异界结晶吊坠',
    icon: 'resource:otherworldCrystalPendant',
    description: '制作异界结晶吊坠',
    baseDuration: 51e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'silverNecklace',
          count: 1,
        },
        {
          id: 'darkCrystal',
          count: 30,
        },
        {
          id: 'mysticalEssence',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'otherworldCrystalPendant',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 30,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeIronPot: {
    id: 'makeIronPot',
    name: '制作铁锅',
    icon: 'resource:ironPot',
    description: '制作铁锅',
    baseDuration: 6e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'iron',
          count: 30,
        },
        {
          id: 'wood',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'ironPot',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '工具',
  },
  makeIronShovel: {
    id: 'makeIronShovel',
    name: '制作铁铲',
    icon: 'resource:ironShovel',
    description: '制作铁铲',
    baseDuration: 6e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'iron',
          count: 30,
        },
        {
          id: 'wood',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'ironShovel',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '工具',
  },
  makeIronMachinistHammer: {
    id: 'makeIronMachinistHammer',
    name: '制作小铁锤',
    icon: 'resource:ironMachinistHammer',
    description: '制作小铁锤',
    baseDuration: 6e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'iron',
          count: 30,
        },
        {
          id: 'wood',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'ironMachinistHammer',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '工具',
  },
  makeSteelPot: {
    id: 'makeSteelPot',
    name: '制作钢锅',
    icon: 'resource:steelPot',
    description: '制作钢锅',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'steel',
          count: 30,
        },
        {
          id: 'wood',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'steelPot',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '工具',
  },
  makeSteelShovel: {
    id: 'makeSteelShovel',
    name: '制作钢铲',
    icon: 'resource:steelShovel',
    description: '制作钢铲',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'steel',
          count: 30,
        },
        {
          id: 'wood',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'steelShovel',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '工具',
  },
  makeSteelMachinistHammer: {
    id: 'makeSteelMachinistHammer',
    name: '制作小钢锤',
    icon: 'resource:steelMachinistHammer',
    description: '制作小钢锤',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'steel',
          count: 30,
        },
        {
          id: 'wood',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'steelMachinistHammer',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '工具',
  },
  makeIronTongs: {
    id: 'makeIronTongs',
    name: '制作铁钳',
    icon: 'resource:ironTongs',
    description: '制作铁钳',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'iron',
          count: 30,
        },
        {
          id: 'wood',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'ironTongs',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '工具',
  },
  makeGlassBottle: {
    id: 'makeGlassBottle',
    name: '制造玻璃瓶',
    icon: 'resource:glassBottles',
    description: '烧制玻璃瓶',
    baseDuration: 3e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'sand',
          count: 10,
        },
        {
          id: 'coal',
          count: 3,
        },
      ],
    },
    rewards: [
      {
        id: 'glassBottles',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '道具',
  },
  makeIronCan: {
    id: 'makeIronCan',
    name: '制作铁罐头',
    icon: 'resource:ironCan',
    description: '制作铁罐头',
    baseDuration: 3e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'iron',
          count: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'ironCan',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '道具',
  },
  makeAlchemicExtractor: {
    id: 'makeAlchemicExtractor',
    name: '制造炼金萃取瓶',
    icon: 'resource:alchemicExtractor',
    description: '制造炼金萃取瓶',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 15,
        },
        {
          id: 'glassBottles',
          count: 15,
        },
        {
          id: 'amberSap',
          count: 15,
        },
        {
          id: 'silverIngot',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 10,
        },
        {
          status: 'mysterious',
          min: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'alchemicExtractor',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '工具',
  },
  makeAlchemicEtherPump: {
    id: 'makeAlchemicEtherPump',
    name: '制造炼金灵能泵',
    icon: 'resource:alchemicEtherPump',
    description: '制造炼金灵能泵',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 15,
        },
        {
          id: 'glassBottles',
          count: 15,
        },
        {
          id: 'ancientGear',
          count: 10,
        },
        {
          id: 'ectoplasm',
          count: 5,
        },
        {
          id: 'silverIngot',
          count: 25,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 10,
        },
        {
          status: 'mysterious',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'alchemicEtherPump',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '工具',
  },
  makeTailorScissors: {
    id: 'makeTailorScissors',
    name: '制作裁缝剪刀',
    icon: 'resource:tailorScissors',
    description: '制作裁缝剪刀',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'iron',
          count: 20,
        },
        {
          id: 'cashmere',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'tailorScissors',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '工具',
  },
  makeNeedleandThread: {
    id: 'makeNeedleandThread',
    name: '制作针线包',
    icon: 'resource:needleandThread',
    description: '制作针线包',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'iron',
          count: 5,
        },
        {
          id: 'cashmere',
          count: 10,
        },
        {
          id: 'wool',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'needleandThread',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '工具',
  },
  makeFermentationStirrer: {
    id: 'makeFermentationStirrer',
    name: '制作酿造搅拌器',
    icon: 'resource:fermentationStirrer',
    description: '用于酿造的小工具，可以均匀混合原料，提高发酵效率。',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'iron',
          count: 15,
        },
        {
          id: 'bamboo',
          count: 15,
        },
        {
          id: 'glassBottles',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'fermentationStirrer',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '工具',
  },
  makeMithrilMachinistHammer: {
    id: 'makeMithrilMachinistHammer',
    name: '制作秘银工匠锤',
    icon: 'resource:mithrilMachinistHammer',
    description: '制作秘银工匠锤',
    baseDuration: 18e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'silverIngot',
          count: 15,
        },
        {
          id: 'mithrilIngot',
          count: 15,
        },
        {
          id: 'wood',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'mithrilMachinistHammer',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '工具',
  },
  makeBambooMiningCatbasket: {
    id: 'makeBambooMiningCatbasket',
    name: '制作采矿收纳背篓',
    icon: 'resource:bambooMiningCatbasket',
    description: '制作采矿收纳背篓',
    baseDuration: 18e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'bamboo',
          count: 40,
        },
        {
          id: 'wool',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'bambooMiningCatbasket',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '工具',
  },
  makeFangNecklace: {
    id: 'makeFangNecklace',
    name: '制作兽牙项链',
    icon: 'resource:fangNecklace',
    description: '制作兽牙项链',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'silverNecklace',
          count: 1,
        },
        {
          id: 'batTooth',
          count: 30,
        },
        {
          id: 'wolfFang',
          count: 20,
        },
        {
          id: 'snowBeastFang',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'fangNecklace',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeManacrystalStaff: {
    id: 'makeManacrystalStaff',
    name: '制作魔晶法杖',
    icon: 'resource:manacrystalStaff',
    description: '制作魔晶法杖',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'wood',
          count: 40,
        },
        {
          id: 'manacrystal',
          count: 10,
        },
        {
          id: 'mysticalEssence',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'manacrystalStaff',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '法杖',
  },
  makeTimeflowCatEyeStaff: {
    id: 'makeTimeflowCatEyeStaff',
    name: '制作时光猫眼法杖',
    icon: 'resource:timeflowCatEyeStaff',
    description: '制作时光猫眼法杖',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'wood',
          count: 40,
        },
        {
          id: 'catEyeStone',
          count: 20,
        },
        {
          id: 'mysticalEssence',
          count: 15,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'timeflowCatEyeStaff',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '法杖',
  },
  makeIntertwinedCatEyeStaff: {
    id: 'makeIntertwinedCatEyeStaff',
    name: '制作交织猫瞳杖',
    icon: 'resource:intertwinedCatEyeStaff',
    description: '制作交织猫瞳杖',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'wood',
          count: 40,
        },
        {
          id: 'catEyeStone',
          count: 20,
        },
        {
          id: 'mysticalEssence',
          count: 15,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'intertwinedCatEyeStaff',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '法杖',
  },
  makeAmberGazeOddSignStaff: {
    id: 'makeAmberGazeOddSignStaff',
    name: '制作奇兆短杖',
    icon: 'resource:amberGazeOddSignStaff',
    description: '制作奇兆短杖',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'wood',
          count: 40,
        },
        {
          id: 'amberEyeStone',
          count: 15,
        },
        {
          id: 'mysticalEssence',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'amberGazeOddSignStaff',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '法杖',
  },
  makeMurkyCrystalStaff: {
    id: 'makeMurkyCrystalStaff',
    name: '制作浊影法杖',
    icon: 'resource:murkyCrystalStaff',
    description: '制作浊影法杖',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'wood',
          count: 40,
        },
        {
          id: 'denseFogMurkyCrystal',
          count: 20,
        },
        {
          id: 'mysticalEssence',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 35,
        },
      ],
    },
    rewards: [
      {
        id: 'murkyCrystalStaff',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 30,
      },
    ],
    secondaryClassification: '法杖',
  },
  makeRainbowBracelet: {
    id: 'makeRainbowBracelet',
    name: '制作彩虹手链',
    icon: 'resource:rainbowBracelet',
    description: '制作彩虹手链',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'silverBracelet',
          count: 1,
        },
        {
          id: 'rainbowShard',
          count: 25,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'rainbowBracelet',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeRainbowNecklace: {
    id: 'makeRainbowNecklace',
    name: '制作彩虹项链',
    icon: 'resource:rainbowNecklace',
    description: '制作彩虹项链',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'silverNecklace',
          count: 1,
        },
        {
          id: 'rainbowShard',
          count: 25,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'rainbowNecklace',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeWoodFishRod: {
    id: 'makeWoodFishRod',
    name: '制作木钓竿',
    icon: '🎣',
    description: '制作钓竿',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
        {
          id: 'wood',
          count: 10,
        },
        {
          id: 'catHairball',
          count: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'woodFishingRod',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 1,
      },
    ],
    secondaryClassification: '渔具',
  },
  makeBambooFishingRod: {
    id: 'makeBambooFishingRod',
    name: '制作竹钓竿',
    icon: 'resource:bambooFishingRod',
    description: '制作竹钓竿',
    baseDuration: 18e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
        {
          id: 'bamboo',
          count: 15,
        },
        {
          id: 'wool',
          count: 1,
        },
        {
          id: 'iron',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'bambooFishingRod',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 4,
      },
    ],
    secondaryClassification: '渔具',
  },
  makeBambooDiddleNet: {
    id: 'makeBambooDiddleNet',
    name: '制作竹抄网',
    icon: 'resource:bambooDiddleNet',
    description: '制作竹抄网',
    baseDuration: 18e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
        {
          id: 'bamboo',
          count: 15,
        },
        {
          id: 'wool',
          count: 15,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'bambooDiddleNet',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 4,
      },
    ],
    secondaryClassification: '渔具',
  },
  makeBambooFishpot: {
    id: 'makeBambooFishpot',
    name: '制作竹制捕鱼笼',
    icon: 'resource:bambooFishpot',
    description: '制作竹制捕鱼笼',
    baseDuration: 18e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
        {
          id: 'bamboo',
          count: 20,
        },
        {
          id: 'wool',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'bambooFishpot',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 6,
      },
    ],
    secondaryClassification: '渔具',
  },
  makeIronFishingRod: {
    id: 'makeIronFishingRod',
    name: '制作铁钓竿',
    icon: 'resource:ironFishingRod',
    description: '制作铁钓竿',
    baseDuration: 18e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
        {
          id: 'iron',
          count: 20,
        },
        {
          id: 'wool',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 14,
        },
      ],
    },
    rewards: [
      {
        id: 'ironFishingRod',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 8,
      },
    ],
    secondaryClassification: '渔具',
  },
  makeIronDiddleNet: {
    id: 'makeIronDiddleNet',
    name: '制作铁抄网',
    icon: 'resource:ironDiddleNet',
    description: '制作铁抄网',
    baseDuration: 18e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
        {
          id: 'iron',
          count: 20,
        },
        {
          id: 'wool',
          count: 15,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 14,
        },
      ],
    },
    rewards: [
      {
        id: 'ironDiddleNet',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 8,
      },
    ],
    secondaryClassification: '渔具',
  },
  makeIronFishpot: {
    id: 'makeIronFishpot',
    name: '制作铁制捕鱼笼',
    icon: 'resource:ironFishpot',
    description: '制作铁制捕鱼笼',
    baseDuration: 18e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
        {
          id: 'iron',
          count: 20,
        },
        {
          id: 'wool',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 14,
        },
      ],
    },
    rewards: [
      {
        id: 'ironFishpot',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 8,
      },
    ],
    secondaryClassification: '渔具',
  },
  makeBambooBow: {
    id: 'makeBambooBow',
    name: '制造竹质弓',
    icon: '🏹',
    description: '制造竹质弓',
    baseDuration: 3e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
        {
          id: 'bamboo',
          count: 20,
        },
        {
          id: 'wool',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'bambooBow',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 4,
      },
    ],
    secondaryClassification: '武器',
  },
  makeBambooCrossbow: {
    id: 'makeBambooCrossbow',
    name: '制造竹质弩',
    icon: 'resource:bambooCrossbow',
    description: '制造竹质弩',
    baseDuration: 3e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
        {
          id: 'bamboo',
          count: 20,
        },
        {
          id: 'wool',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'bambooCrossbow',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 4,
      },
    ],
    secondaryClassification: '武器',
  },
  makeSpiritFeatherBow: {
    id: 'makeSpiritFeatherBow',
    name: '制作灵羽之弓',
    icon: 'resource:spiritfeatherBow',
    description: '制作灵羽之弓',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'bambooBow',
          count: 1,
        },
        {
          id: 'owlFeather',
          count: 12,
        },
        {
          id: 'pure_monster_essence_lv3',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'spiritfeatherBow',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '武器',
  },
  makeRuneCompass: {
    id: 'makeRuneCompass',
    name: '制作符片指南针',
    icon: 'resource:runeCompass',
    description: '制作符片指南针',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'dark_sigil_fragment',
          count: 5,
        },
        {
          id: 'iron',
          count: 5,
        },
        {
          id: 'pure_monster_essence_lv4',
          count: 2,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'runeCompass',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeEternalNightStaff: {
    id: 'makeEternalNightStaff',
    name: '制作永夜法杖',
    icon: 'resource:eternalNightStaff',
    description: '制作永夜法杖',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'kg_nocturne_scepter_grip',
          count: 4,
        },
        {
          id: 'nb1_duskshade_whisker',
          count: 10,
        },
        {
          id: 'shadowOrb',
          count: 10,
        },
        {
          id: 'nightEyeGem',
          count: 15,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 40,
        },
      ],
    },
    rewards: [
      {
        id: 'eternalNightStaff',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '法杖',
  },
  makeLv1EnemySpoilCollector: {
    id: 'makeLv1EnemySpoilCollector',
    name: '制作一级战利品收集者徽章',
    icon: 'resource:lv1EnemySpoilCollector',
    description: '制作一级战利品收集者徽章',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'silverIngot',
          count: 15,
        },
        {
          id: 'pure_monster_essence_lv1',
          count: 32,
        },
        {
          id: 'luckyCatCharm',
          count: 2,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 24,
        },
      ],
    },
    rewards: [
      {
        id: 'lv1EnemySpoilCollector',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 16,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeLv2EnemySpoilCollector: {
    id: 'makeLv2EnemySpoilCollector',
    name: '制作二级战利品收集者徽章',
    icon: 'resource:lv2EnemySpoilCollector',
    description: '制作二级战利品收集者徽章',
    baseDuration: 33e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'silverIngot',
          count: 15,
        },
        {
          id: 'pure_monster_essence_lv2',
          count: 32,
        },
        {
          id: 'luckyCatCharm',
          count: 2,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 24,
        },
      ],
    },
    rewards: [
      {
        id: 'lv2EnemySpoilCollector',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 16,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeLv3EnemySpoilCollector: {
    id: 'makeLv3EnemySpoilCollector',
    name: '制作三级战利品收集者徽章',
    icon: 'resource:lv3EnemySpoilCollector',
    description: '制作三级战利品收集者徽章',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'silverIngot',
          count: 15,
        },
        {
          id: 'pure_monster_essence_lv3',
          count: 32,
        },
        {
          id: 'luckyCatCharm',
          count: 2,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 24,
        },
      ],
    },
    rewards: [
      {
        id: 'lv3EnemySpoilCollector',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 16,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeLv4EnemySpoilCollector: {
    id: 'makeLv4EnemySpoilCollector',
    name: '制作四级战利品收集者徽章',
    icon: 'resource:lv4EnemySpoilCollector',
    description: '制作四级战利品收集者徽章',
    baseDuration: 39e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'silverIngot',
          count: 15,
        },
        {
          id: 'pure_monster_essence_lv4',
          count: 32,
        },
        {
          id: 'luckyCatCharm',
          count: 2,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 24,
        },
      ],
    },
    rewards: [
      {
        id: 'lv4EnemySpoilCollector',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 16,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeLv1BattleExpCollector: {
    id: 'makeLv1BattleExpCollector',
    name: '制作战斗奖章',
    icon: 'resource:lv1BattleExpCollector',
    description: '制作战斗奖章',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'pure_monster_essence_lv1',
          count: 30,
        },
        {
          id: 'pure_monster_essence_lv2',
          count: 30,
        },
        {
          id: 'pure_monster_essence_lv3',
          count: 30,
        },
        {
          id: 'pure_monster_essence_lv4',
          count: 30,
        },
        {
          id: 'luckyCatCharm',
          count: 2,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 24,
        },
      ],
    },
    rewards: [
      {
        id: 'lv1BattleExpCollector',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 16,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeEternalGuardianAmulet: {
    id: 'makeEternalGuardianAmulet',
    name: '制作永恒守护者',
    icon: 'resource:eternalGuardianAmulet',
    description: '制作永恒守护者',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 100,
        },
        {
          id: 'moonlightGuardianCoreAmulet',
          count: 1,
        },
        {
          id: 'emberAegis',
          count: 1,
        },
        {
          id: 'infusedGuardianCoreAmulet',
          count: 1,
        },
        {
          id: 'murkyCrystalGuardianCoreAmulet',
          count: 1,
        },
        {
          id: 'genesisEssence',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 35,
        },
      ],
    },
    rewards: [
      {
        id: 'eternalGuardianAmulet',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeBlinkshadowGirdle: {
    id: 'makeBlinkshadowGirdle',
    name: '制作瞬影护符',
    icon: 'resource:blinkshadowGirdle',
    description: '制作瞬影护符',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 40,
        },
        {
          id: 'initiativeAmulet',
          count: 1,
        },
        {
          id: 'nb1_shadow_pounce_band',
          count: 10,
        },
        {
          id: 'whiskerCharm',
          count: 10,
        },
        {
          id: 'nightEyeGem',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 35,
        },
      ],
    },
    rewards: [
      {
        id: 'blinkshadowGirdle',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeFallenStarAmulet: {
    id: 'makeFallenStarAmulet',
    name: '制作堕落星辰护符',
    icon: 'resource:fallenStarAmulet',
    description: '制作堕落星辰护符',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 40,
        },
        {
          id: 'starShard',
          count: 20,
        },
        {
          id: 'starDust',
          count: 20,
        },
        {
          id: 'starRelic',
          count: 20,
        },
        {
          id: 'darkCrystal',
          count: 20,
        },
        {
          id: 'vc1_void_ichor',
          count: 6,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 35,
        },
      ],
    },
    rewards: [
      {
        id: 'fallenStarAmulet',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeDarkingHeart: {
    id: 'makeDarkingHeart',
    name: '制作空望之心',
    icon: 'resource:darkingHeart',
    description: '制作黑暗之心',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 40,
        },
        {
          id: 'starShard',
          count: 20,
        },
        {
          id: 'starDust',
          count: 20,
        },
        {
          id: 'starRelic',
          count: 20,
        },
        {
          id: 'catShadowGem',
          count: 20,
        },
        {
          id: 'pureEssence',
          count: 2,
        },
        {
          id: 'vc1_void_ichor',
          count: 6,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 35,
        },
      ],
    },
    rewards: [
      {
        id: 'darkingHeart',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeLeftoverPendant: {
    id: 'makeLeftoverPendant',
    name: '制作余量坠饰',
    icon: 'resource:leftoverPendant',
    description: '制作余量坠饰',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 40,
        },
        {
          id: 'moonlightPendant',
          count: 1,
        },
        {
          id: 'purifiedEctoplasm',
          count: 5,
        },
        {
          id: 'ec1_echoing_stone',
          count: 10,
        },
        {
          id: 'hb_paradox_core',
          count: 10,
        },
        {
          id: 'mysticalEssence',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 35,
        },
      ],
    },
    rewards: [
      {
        id: 'leftoverPendant',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeMurkyShadowLens: {
    id: 'makeMurkyShadowLens',
    name: '制作浊光放大镜',
    icon: 'resource:murkyShadowLens',
    description: '制作浊光放大镜',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 40,
        },
        {
          id: 'wood',
          count: 10,
        },
        {
          id: 'denseFogMurkyCrystal',
          count: 20,
        },
        {
          id: 'catShadowGem',
          count: 20,
        },
        {
          id: 'manacrystal',
          count: 20,
        },
        {
          id: 'shadowFur',
          count: 5,
        },
        {
          id: 'mysticalEssence',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 35,
        },
      ],
    },
    rewards: [
      {
        id: 'murkyShadowLens',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '饰品',
  },
  makeAutoFeeder: {
    id: 'makeAutoFeeder',
    name: '制作自动喂食器',
    icon: 'resource:autoFeeder',
    description: '一个自动投喂器，让你的小猫咪在饿的时候可以自己去吃东西',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'ancientCatBowl',
          count: 1,
        },
        {
          id: 'glassBottles',
          count: 1,
        },
        {
          id: 'iron',
          count: 25,
        },
        {
          id: 'ancientGear',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'autoFeeder',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '猫舍家具',
  },
  makeScratchingPost: {
    id: 'makeScratchingPost',
    name: '制作猫抓板',
    icon: 'resource:scratchingPost',
    description: '一块简易的猫抓板，撒上一些猫薄荷，小猫咪很喜欢',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'wood',
          count: 20,
        },
        {
          id: 'catPotion',
          count: 2,
        },
        {
          id: 'bamboo',
          count: 20,
        },
        {
          id: 'whiskerFeather',
          count: 2,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'scratchingPost',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '猫舍家具',
  },
  makeStudyDesk: {
    id: 'makeStudyDesk',
    name: '制作书桌',
    icon: 'resource:studyDesk',
    description: '一个让猫咪助手记录生活的地方，使猫咪助手可以记录下自己的学习内容',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'wood',
          count: 40,
        },
        {
          id: 'pencil',
          count: 2,
        },
        {
          id: 'paper',
          count: 10,
        },
        {
          id: 'book',
          count: 2,
        },
      ],
      characterStatus: [
        {
          status: 'manufacturing',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'studyDesk',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '猫舍家具',
  },
  sewCashmere: {
    id: 'sewCashmere',
    name: '缝制羊绒布料',
    icon: 'resource:cashmere',
    description: '用羊毛编织成的布料',
    baseDuration: 4e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: 'catHairball',
          count: 10,
        },
        {
          id: 'wool',
          count: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'cashmere',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '基础缝纫',
  },
  sewSilkFabric: {
    id: 'sewSilkFabric',
    name: '缝制丝绸布料',
    icon: 'resource:silkFabric',
    description: '用蚕丝编织成细腻的丝绸',
    baseDuration: 6e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: 'catHairball',
          count: 10,
        },
        {
          id: 'cashmere',
          count: 1,
        },
        {
          id: 'silk',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'silkFabric',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 4,
      },
    ],
    secondaryClassification: '基础缝纫',
  },
  separateFluffstone: {
    id: 'separateFluffstone',
    name: '分离绒毛',
    icon: 'resource:fluff',
    description: '分离绒毛',
    baseDuration: 4e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: 'fluffstone',
          count: 3,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'fluff',
        percent: 1,
        count: 1,
      },
      {
        id: 'stone',
        percent: 0.2,
        count: 1,
      },
      {
        id: 'iron',
        percent: 0.2,
        count: 1,
      },
      {
        id: 'coal',
        percent: 0.2,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 14,
      },
    ],
    secondaryClassification: '基础缝纫',
  },
  sewFluffFabric: {
    id: 'sewFluffFabric',
    name: '缝制绒毛布料',
    icon: 'resource:fluffFabric',
    description: '缝制绒毛布料',
    baseDuration: 4e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: 'catHairball',
          count: 10,
        },
        {
          id: 'silkFabric',
          count: 1,
        },
        {
          id: 'fluff',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'fluffFabric',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '基础缝纫',
  },
  makeCatFurCuteHat: {
    id: 'makeCatFurCuteHat',
    name: '缝制毛毛可爱帽',
    icon: 'resource:catFurCuteHat',
    description: '用猫毛制作而成的可爱帽子，在动物面前会显得更亲近',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'catHairball',
          count: 50,
        },
      ],
    },
    rewards: [
      {
        id: 'catFurCuteHat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '工作服',
  },
  sewCatTailorClothes: {
    id: 'sewCatTailorClothes',
    name: '缝制毛毛裁缝服',
    icon: 'resource:catTailorClothes',
    description: '缝制毛毛裁缝服',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'catHairball',
          count: 50,
        },
      ],
    },
    rewards: [
      {
        id: 'catTailorClothes',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '工作服',
  },
  sewCatTailorGloves: {
    id: 'sewCatTailorGloves',
    name: '缝制毛毛裁缝手套',
    icon: 'resource:catTailorGloves',
    description: '缝制毛毛裁缝手套',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'catHairball',
          count: 35,
        },
      ],
    },
    rewards: [
      {
        id: 'catTailorGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '工作服',
  },
  makeWoolCuteHat: {
    id: 'makeWoolCuteHat',
    name: '缝制羊毛可爱帽',
    icon: 'resource:woolCuteHat',
    description: '用羊毛制作而成的可爱帽子，在动物面前会显得更亲近',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'cashmere',
          count: 30,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'woolCuteHat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  makeWoolCuteGloves: {
    id: 'makeWoolCuteGloves',
    name: '缝制羊毛可爱手套',
    icon: 'resource:woolCuteGloves',
    description: '用羊毛制作而成的可爱手套，在动物面前会显得更亲近',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'cashmere',
          count: 30,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'woolCuteGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  sewWoolTailorClothes: {
    id: 'sewWoolTailorClothes',
    name: '缝制羊毛裁缝服',
    icon: 'resource:woolTailorClothes',
    description: '缝制羊毛裁缝服',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'cashmere',
          count: 30,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'woolTailorClothes',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  sewWoolTailorGloves: {
    id: 'sewWoolTailorGloves',
    name: '缝制羊毛裁缝手套',
    icon: 'resource:woolTailorGloves',
    description: '缝制羊毛裁缝手套',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'cashmere',
          count: 25,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'woolTailorGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  sewWoolArtisanOutfit: {
    id: 'sewWoolArtisanOutfit',
    name: '缝制羊毛工匠服',
    icon: 'resource:woolArtisanOutfit',
    description: '缝制羊毛工匠服',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'cashmere',
          count: 30,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'woolArtisanOutfit',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  makeWoolChefApron: {
    id: 'makeWoolChefApron',
    name: '缝制羊毛围裙',
    icon: 'resource:woolChefApron',
    description: '缝制羊毛厨师围裙',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'cashmere',
          count: 30,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'woolChefApron',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  makeWoolHeatResistantGloves: {
    id: 'makeWoolHeatResistantGloves',
    name: '缝制羊毛隔热手套',
    icon: 'resource:woolHeatResistantGloves',
    description: '缝制羊毛厨师隔热手套',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'cashmere',
          count: 25,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'woolHeatResistantGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  sewWoolExplorerCatpack: {
    id: 'sewWoolExplorerCatpack',
    name: '缝制羊毛探险背包',
    icon: 'resource:woolExplorerCatpack',
    description: '缝制羊毛探险背包',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'cashmere',
          count: 30,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'woolExplorerCatpack',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  sewSilkCuteHat: {
    id: 'sewSilkCuteHat',
    name: '缝制丝质可爱帽',
    icon: 'resource:silkCuteHat',
    description: '在羊毛可爱帽的基础上，对一些部分添加了丝质布料，使其更加贴合头型',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'woolCuteHat',
          count: 1,
        },
        {
          id: 'silkFabric',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'silkCuteHat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '丝制品',
  },
  sewSilkCuteGloves: {
    id: 'sewSilkCuteGloves',
    name: '缝制丝质可爱手套',
    icon: 'resource:silkCuteGloves',
    description: '在羊毛可爱手套的基础上，对一些部分添加了丝质布料，使得其更加贴手',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'woolCuteGloves',
          count: 1,
        },
        {
          id: 'silkFabric',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'silkCuteGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '丝制品',
  },
  sewSilkArtisanOutfit: {
    id: 'sewSilkArtisanOutfit',
    name: '缝制丝质工匠服',
    icon: 'resource:silkArtisanOutfit',
    description: '在羊毛工匠服的基础上，对一些贴身的部位加上了丝绸，使其更贴身',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'woolArtisanOutfit',
          count: 1,
        },
        {
          id: 'silkFabric',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'silkArtisanOutfit',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '丝制品',
  },
  sewSilkTailorClothes: {
    id: 'sewSilkTailorClothes',
    name: '缝制丝质裁缝服',
    icon: 'resource:silkTailorClothes',
    description: '在羊毛裁缝服的基础上，对一些贴身的部位加上了丝绸，使其更贴身',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'woolTailorClothes',
          count: 1,
        },
        {
          id: 'silkFabric',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'silkTailorClothes',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '丝制品',
  },
  sewSilkTailorGloves: {
    id: 'sewSilkTailorGloves',
    name: '缝制丝质裁缝手套',
    icon: 'resource:silkTailorGloves',
    description: '在羊毛裁缝手套的基础上，对一些部分添加了丝质布料，使得其更加贴手',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'woolTailorGloves',
          count: 1,
        },
        {
          id: 'silkFabric',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'silkTailorGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '丝制品',
  },
  makeSilkChefApron: {
    id: 'makeSilkChefApron',
    name: '缝制丝质围裙',
    icon: 'resource:silkChefApron',
    description: '缝制丝质围裙',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'woolChefApron',
          count: 1,
        },
        {
          id: 'silkFabric',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'silkChefApron',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '丝制品',
  },
  makeSilkHeatResistantGloves: {
    id: 'makeSilkHeatResistantGloves',
    name: '缝制丝质隔热手套',
    icon: 'resource:silkHeatResistantGloves',
    description: '缝制丝质隔热手套',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'woolHeatResistantGloves',
          count: 1,
        },
        {
          id: 'silkFabric',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'silkHeatResistantGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '丝制品',
  },
  sewLuckRainbowRibbon: {
    id: 'sewLuckRainbowRibbon',
    name: '缝制虹运飘带',
    icon: 'resource:luckRainbowRibbon',
    description: '缝制虹运飘带',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'silkFabric',
          count: 30,
        },
        {
          id: 'rainbowShard',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'luckRainbowRibbon',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  sewBatShadownCape: {
    id: 'sewBatShadownCape',
    name: '缝制蝠影斗篷',
    icon: 'resource:batShadownCape',
    description: '缝制蝠影斗篷',
    baseDuration: 6e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 50,
        },
        {
          id: 'batWing',
          count: 100,
        },
        {
          id: 'curseWing',
          count: 25,
        },
        {
          id: 'shadowCape',
          count: 3,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'batShadownCape',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 15,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  sewCloudwalkerBoots: {
    id: 'sewCloudwalkerBoots',
    name: '缝制云行靴',
    icon: 'resource:cloudwalkerBoots',
    description: '一双轻盈的靴子，穿上后步伐如云，行动迅捷。',
    baseDuration: 6e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'cloudCotton',
          count: 25,
        },
        {
          id: 'silkFabric',
          count: 20,
        },
        {
          id: 'cashmere',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'cloudwalkerBoots',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  sewCloudwalkerCloak: {
    id: 'sewCloudwalkerCloak',
    name: '缝制云行斗篷',
    icon: 'resource:cloudwalkerCloak',
    description: '一件轻盈如云的斗篷，穿戴者仿佛行走于云端，身形飘忽难以捉摸。',
    baseDuration: 6e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'cloudCotton',
          count: 25,
        },
        {
          id: 'silkFabric',
          count: 20,
        },
        {
          id: 'cashmere',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'cloudwalkerCloak',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  sewPhantomWalkerBoots: {
    id: 'sewPhantomWalkerBoots',
    name: '缝制幽径之履',
    icon: 'resource:phantomWalkerBoots',
    description: '缝制幽径之履',
    baseDuration: 12e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'cloudwalkerBoots',
          count: 1,
        },
        {
          id: 'cloudCotton',
          count: 45,
        },
        {
          id: 'spiritEssence',
          count: 20,
        },
        {
          id: 'ghostEssence',
          count: 20,
        },
        {
          id: 'phantom_minor_core',
          count: 20,
        },
        {
          id: 'sewingEssence',
          count: 40,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 45,
        },
      ],
    },
    rewards: [
      {
        id: 'phantomWalkerBoots',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 40,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  'sewPhantomWalkerBoots+3': {
    id: 'sewPhantomWalkerBoots+3',
    name: '缝制幽径之履+3',
    icon: 'resource:phantomWalkerBoots',
    description: '缝制幽径之履+3',
    baseDuration: 12e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'cloudwalkerBoots+5',
          count: 1,
        },
        {
          id: 'cloudCotton',
          count: 100,
        },
        {
          id: 'spiritEssence',
          count: 40,
        },
        {
          id: 'ghostEssence',
          count: 40,
        },
        {
          id: 'phantom_minor_core',
          count: 40,
        },
        {
          id: 'sewingEssence',
          count: 80,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 50,
        },
      ],
    },
    rewards: [
      {
        id: 'phantomWalkerBoots+3',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 45,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  sewCashmereToy: {
    id: 'sewCashmereToy',
    name: '缝制毛绒玩具',
    icon: 'resource:cashmereToy',
    description: '一只可爱的毛绒玩具，给小猫咪玩再好不过了',
    baseDuration: 4e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'wool',
          count: 20,
        },
        {
          id: 'cashmere',
          count: 8,
        },
        {
          id: 'plushFur',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'cashmereToy',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 17,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  sewSilkKittyNest: {
    id: 'sewSilkKittyNest',
    name: '制作舒适猫窝',
    icon: 'resource:silkKittyNest',
    description: '猫咪很喜欢在这里打盹',
    baseDuration: 5e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'wool',
          count: 30,
        },
        {
          id: 'silkFabric',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'silkKittyNest',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  sewSilkCurtain: {
    id: 'sewSilkCurtain',
    name: '缝制遮光窗帘',
    icon: 'resource:silkCurtain',
    description: '足够遮光的窗帘，可以让猫咪更好的休息',
    baseDuration: 5e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'fluffFabric',
          count: 6,
        },
        {
          id: 'catPotion',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'silkCurtain',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  sewCursedSilkSachet: {
    id: 'sewCursedSilkSachet',
    name: '缝制诅咒香囊',
    icon: 'resource:cursedSilkSachet',
    description: '看着就很不吉利的东西，很难想象他的作用',
    baseDuration: 4e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'silkFabric',
          count: 10,
        },
        {
          id: 'ectoplasm',
          count: 2,
        },
        {
          id: 'goblinEar',
          count: 6,
        },
        {
          id: 'curseWing',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'cursedSilkSachet',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  sewSilkMageCloak: {
    id: 'sewSilkMageCloak',
    name: '缝制丝质法师披肩',
    icon: 'resource:silkMageCloak',
    description: '缝制丝质法师披肩',
    baseDuration: 24e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'silkFabric',
          count: 30,
        },
        {
          id: 'mysticalEssence',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'silkMageCloak',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 11,
      },
    ],
    secondaryClassification: '丝制品',
  },
  sewSilkDexCloak: {
    id: 'sewSilkDexCloak',
    name: '缝制丝质夜行斗篷',
    icon: 'resource:silkDexCloak',
    description: '缝制丝质夜行斗篷',
    baseDuration: 24e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'silkFabric',
          count: 30,
        },
        {
          id: 'moonlightBell',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'silkDexCloak',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 11,
      },
    ],
    secondaryClassification: '丝制品',
  },
  sewSilkWarriorCloak: {
    id: 'sewSilkWarriorCloak',
    name: '缝制丝质战士披风',
    icon: 'resource:silkWarriorCloak',
    description: '缝制丝质战士披风',
    baseDuration: 24e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'silkFabric',
          count: 30,
        },
        {
          id: 'wolfFang',
          count: 6,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'silkWarriorCloak',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 11,
      },
    ],
    secondaryClassification: '丝制品',
  },
  sewSilkVitalityCloak: {
    id: 'sewSilkVitalityCloak',
    name: '缝制丝质活力披风',
    icon: 'resource:silkVitalityCloak',
    description: '缝制丝质活力披肩',
    baseDuration: 24e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'silkFabric',
          count: 30,
        },
        {
          id: 'catPotion',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'silkVitalityCloak',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 11,
      },
    ],
    secondaryClassification: '丝制品',
  },
  sewCashmereSingleCloak: {
    id: 'sewCashmereSingleCloak',
    name: '缝制羊绒孤胆披风',
    icon: 'resource:cashmereSingleCloak',
    description: '缝制羊绒孤胆披风',
    baseDuration: 24e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'cashmere',
          count: 40,
        },
        {
          id: 'sewingEssence',
          count: 6,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'cashmereSingleCloak',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 8,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  sewCashmereSingleDexCloak: {
    id: 'sewCashmereSingleDexCloak',
    name: '缝制羊绒孤胆利刃披风',
    icon: 'resource:cashmereSingleDexCloak',
    description: '缝制羊绒孤胆利刃披风',
    baseDuration: 24e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'cashmere',
          count: 40,
        },
        {
          id: 'rareClaw',
          count: 10,
        },
        {
          id: 'sewingEssence',
          count: 6,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'cashmereSingleDexCloak',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 8,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  sewCashmereSingleCloakPlus: {
    id: 'sewCashmereSingleCloakPlus',
    name: '缝制羊绒英雄孤胆披风',
    icon: 'resource:cashmereSingleCloakPlus',
    description: '缝制羊绒英雄孤胆披风',
    baseDuration: 24e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'cashmere',
          count: 50,
        },
        {
          id: 'lavaHeart',
          count: 5,
        },
        {
          id: 'sewingEssence',
          count: 6,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'cashmereSingleCloakPlus',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 8,
      },
    ],
    secondaryClassification: '羊毛制品',
  },
  sewFluffMageGloves: {
    id: 'sewFluffMageGloves',
    name: '缝制绒毛法师手套',
    icon: 'resource:fluffMageGloves',
    description: '缝制绒毛法师手套',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'fluffFabric',
          count: 25,
        },
        {
          id: 'starDust',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'fluffMageGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '绒毛制品',
  },
  sewFluffMageHat: {
    id: 'sewFluffMageHat',
    name: '缝制绒毛法师帽',
    icon: 'resource:fluffMageHat',
    description: '缝制绒毛法师帽',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'fluffFabric',
          count: 25,
        },
        {
          id: 'starDust',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'fluffMageHat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '绒毛制品',
  },
  sewFluffMageBurqa: {
    id: 'sewFluffMageBurqa',
    name: '缝制绒毛法师罩袍',
    icon: 'resource:fluffMageBurqa',
    description: '缝制绒毛法师罩袍',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'fluffFabric',
          count: 30,
        },
        {
          id: 'starDust',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'fluffMageBurqa',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '绒毛制品',
  },
  sewFluffMagePants: {
    id: 'sewFluffMagePants',
    name: '缝制绒毛法师裤子',
    icon: 'resource:fluffMagePants',
    description: '缝制绒毛法师裤子',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'fluffFabric',
          count: 30,
        },
        {
          id: 'starDust',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'fluffMagePants',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '绒毛制品',
  },
  sewFluffMageCloak: {
    id: 'sewFluffMageCloak',
    name: '缝制绒毛法师披肩',
    icon: 'resource:fluffMageCloak',
    description: '缝制绒毛法师披肩',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'fluffFabric',
          count: 30,
        },
        {
          id: 'starDust',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'fluffMageCloak',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '绒毛制品',
  },
  sewFluffDexGloves: {
    id: 'sewFluffDexGloves',
    name: '缝制云绒绑带手套',
    icon: 'resource:fluffDexGloves',
    description: '缝制云绒绑带手套',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'fluffFabric',
          count: 25,
        },
        {
          id: 'cloudCotton',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'fluffDexGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '绒毛制品',
  },
  sewFluffDexScarf: {
    id: 'sewFluffDexScarf',
    name: '缝制云绒裹头巾',
    icon: 'resource:fluffDexScarf',
    description: '缝制云绒裹头巾',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'fluffFabric',
          count: 25,
        },
        {
          id: 'cloudCotton',
          count: 25,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'fluffDexScarf',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '绒毛制品',
  },
  sewFluffDexCloth: {
    id: 'sewFluffDexCloth',
    name: '缝制云布衣',
    icon: 'resource:fluffDexCloth',
    description: '缝制云布衣',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'fluffFabric',
          count: 30,
        },
        {
          id: 'cloudCotton',
          count: 25,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'fluffDexCloth',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '绒毛制品',
  },
  sewFluffDexPants: {
    id: 'sewFluffDexPants',
    name: '缝制云绒紧身裤',
    icon: 'resource:fluffDexPants',
    description: '缝制云绒紧身裤',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'fluffFabric',
          count: 30,
        },
        {
          id: 'cloudCotton',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'fluffDexPants',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '绒毛制品',
  },
  sewTwilightFeatherCloak: {
    id: 'sewTwilightFeatherCloak',
    name: '缝制暮光羽毛披肩',
    icon: 'resource:twilightFeatherCloak',
    description: '缝制暮光羽毛披肩',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 20,
        },
        {
          id: 'owlFeather',
          count: 30,
        },
        {
          id: 'sewingEssence',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'twilightFeatherCloak',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  sewPatchworkHideGarb: {
    id: 'sewPatchworkHideGarb',
    name: '缝制群生皮衣',
    icon: 'resource:patchworkHideGarb',
    description: '缝制群生皮衣',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 50,
        },
        {
          id: 'sw1_hushwoven_thread',
          count: 15,
        },
        {
          id: 'rainbowShard',
          count: 25,
        },
        {
          id: 'silkFabric',
          count: 40,
        },
        {
          id: 'cashmere',
          count: 30,
        },
        {
          id: 'wolfPelt',
          count: 25,
        },
        {
          id: 'snowWolfFur',
          count: 25,
        },
        {
          id: 'snowRabbitFur',
          count: 25,
        },
        {
          id: 'toxicFur',
          count: 25,
        },
        {
          id: 'trollHide',
          count: 20,
        },
        {
          id: 'shadowFur',
          count: 20,
        },
        {
          id: 'snowBeastHide',
          count: 20,
        },
        {
          id: 'owlFeather',
          count: 15,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 35,
        },
      ],
    },
    rewards: [
      {
        id: 'patchworkHideGarb',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 30,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  sewPatchworkHideShoes: {
    id: 'sewPatchworkHideShoes',
    name: '缝制群生皮靴',
    icon: 'resource:patchworkHideShoes',
    description: '缝制群生皮靴',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 50,
        },
        {
          id: 'rainbowShard',
          count: 5,
        },
        {
          id: 'silkFabric',
          count: 10,
        },
        {
          id: 'cashmere',
          count: 10,
        },
        {
          id: 'wolfPelt',
          count: 10,
        },
        {
          id: 'snowWolfFur',
          count: 10,
        },
        {
          id: 'snowRabbitFur',
          count: 10,
        },
        {
          id: 'toxicFur',
          count: 5,
        },
        {
          id: 'trollHide',
          count: 5,
        },
        {
          id: 'shadowFur',
          count: 5,
        },
        {
          id: 'snowBeastHide',
          count: 5,
        },
        {
          id: 'owlFeather',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'patchworkHideShoes',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  sewOatchworkHideCloak: {
    id: 'sewOatchworkHideCloak',
    name: '缝制群生皮披肩',
    icon: 'resource:patchworkHideCloak',
    description: '缝制群生皮披肩',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 50,
        },
        {
          id: 'sw1_hushwoven_thread',
          count: 10,
        },
        {
          id: 'rainbowShard',
          count: 20,
        },
        {
          id: 'silkFabric',
          count: 35,
        },
        {
          id: 'cashmere',
          count: 25,
        },
        {
          id: 'wolfPelt',
          count: 20,
        },
        {
          id: 'snowWolfFur',
          count: 20,
        },
        {
          id: 'snowRabbitFur',
          count: 20,
        },
        {
          id: 'toxicFur',
          count: 20,
        },
        {
          id: 'trollHide',
          count: 20,
        },
        {
          id: 'shadowFur',
          count: 20,
        },
        {
          id: 'snowBeastHide',
          count: 20,
        },
        {
          id: 'owlFeather',
          count: 15,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'patchworkHideCloak',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  makeDreadVisor: {
    id: 'makeDreadVisor',
    name: '制作惶恐面罩',
    icon: 'resource:dreadVisor',
    description: '制作惶恐面罩',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'textileWorkshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 40,
        },
        {
          id: 'ghostEssence',
          count: 25,
        },
        {
          id: 'spiritEssence',
          count: 25,
        },
        {
          id: 'toxicFur',
          count: 25,
        },
        {
          id: 'hb_faceless_membrane',
          count: 6,
        },
        {
          id: 'vc1_void_ichor',
          count: 6,
        },
      ],
      characterStatus: [
        {
          status: 'sewing',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'dreadVisor',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'sewing',
        increaseExp: 15,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  forgeMithrilSword: {
    id: 'forgeMithrilSword',
    name: '锻造秘银剑',
    icon: 'resource:mithrilSword',
    description: '锻造银质剑',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 25,
        },
        {
          id: 'mithrilIngot',
          count: 45,
        },
        {
          id: 'wood',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'mithrilSword',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 16,
      },
    ],
    secondaryClassification: '秘银制品',
  },
  forgeMithrilDagger: {
    id: 'forgeMithrilDagger',
    name: '锻造秘银匕首',
    icon: 'resource:mithrilDagger',
    description: '锻造银质匕首',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 25,
        },
        {
          id: 'mithrilIngot',
          count: 45,
        },
        {
          id: 'wood',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'mithrilDagger',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 16,
      },
    ],
    secondaryClassification: '秘银制品',
  },
  forgeMithrilHat: {
    id: 'forgeMithrilHat',
    name: '锻造秘银头盔',
    icon: 'resource:mithrilHat',
    description: '锻造银头盔',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 25,
        },
        {
          id: 'mithrilIngot',
          count: 55,
        },
        {
          id: 'cashmere',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'mithrilHat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 16,
      },
    ],
    secondaryClassification: '秘银制品',
  },
  forgeMithrilCoat: {
    id: 'forgeMithrilCoat',
    name: '锻造秘银护甲',
    icon: 'resource:mithrilCoat',
    description: '锻造银护甲',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 25,
        },
        {
          id: 'mithrilIngot',
          count: 60,
        },
        {
          id: 'cashmere',
          count: 15,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'mithrilCoat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 16,
      },
    ],
    secondaryClassification: '秘银制品',
  },
  forgeMithrilGloves: {
    id: 'forgeMithrilGloves',
    name: '锻造秘银护手',
    icon: 'resource:mithrilGloves',
    description: '锻造银护手',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 25,
        },
        {
          id: 'mithrilIngot',
          count: 55,
        },
        {
          id: 'cashmere',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'mithrilGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 16,
      },
    ],
    secondaryClassification: '秘银制品',
  },
  forgeMithrilPants: {
    id: 'forgeMithrilPants',
    name: '锻造秘银护腿',
    icon: 'resource:mithrilPants',
    description: '锻造银护腿',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 25,
        },
        {
          id: 'mithrilIngot',
          count: 60,
        },
        {
          id: 'cashmere',
          count: 15,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 17,
        },
      ],
    },
    rewards: [
      {
        id: 'mithrilPants',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 16,
      },
    ],
    secondaryClassification: '秘银制品',
  },
  forgeShadowBlade: {
    id: 'forgeShadowBlade',
    name: '锻造影之刃',
    icon: 'resource:shadowBlade',
    description: '锻造影之刃',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'silverDagger',
          count: 30,
        },
        {
          id: 'shadowOrb',
          count: 10,
        },
        {
          id: 'rareClaw',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'shadowBlade',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '特殊物品',
  },
  forgeSteelHammer: {
    id: 'forgeSteelHammer',
    name: '锻造钢制重锤',
    icon: 'resource:steelHammer',
    description: '锻造钢制重锤',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 25,
        },
        {
          id: 'steel',
          count: 80,
        },
        {
          id: 'wood',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 12,
        },
      ],
    },
    rewards: [
      {
        id: 'steelHammer',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 12,
      },
    ],
    secondaryClassification: '钢制品',
  },
  forgeFishscaleMineralHat: {
    id: 'forgeFishscaleMineralHat',
    name: '锻造鱼鳞合金头盔',
    icon: 'resource:fishscaleMineralHat',
    description: '锻造鱼鳞合金头盔',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'fishscaleMineralIgnot',
          count: 50,
        },
        {
          id: 'catPotion',
          count: 10,
        },
        {
          id: 'cashmere',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'fishscaleMineralHat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '特殊材质',
  },
  forgeFishscaleMineralCoat: {
    id: 'forgeFishscaleMineralCoat',
    name: '锻造鱼鳞合金盔甲',
    icon: 'resource:fishscaleMineralCoat',
    description: '锻造鱼鳞合金盔甲',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'fishscaleMineralIgnot',
          count: 50,
        },
        {
          id: 'catPotion',
          count: 10,
        },
        {
          id: 'cashmere',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'fishscaleMineralCoat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '特殊材质',
  },
  forgeFishscaleMineralGloves: {
    id: 'forgeFishscaleMineralGloves',
    name: '锻造鱼鳞合金护手',
    icon: 'resource:fishscaleMineralGloves',
    description: '锻造鱼鳞合金护手',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'fishscaleMineralIgnot',
          count: 50,
        },
        {
          id: 'catPotion',
          count: 10,
        },
        {
          id: 'cashmere',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'fishscaleMineralGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '特殊材质',
  },
  forgeFishscaleMineralPants: {
    id: 'forgeFishscaleMineralPants',
    name: '锻造鱼鳞合金护腿',
    icon: 'resource:fishscaleMineralPants',
    description: '锻造鱼鳞合金护腿',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'fishscaleMineralIgnot',
          count: 50,
        },
        {
          id: 'catPotion',
          count: 10,
        },
        {
          id: 'cashmere',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'fishscaleMineralPants',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '特殊材质',
  },
  forgeShadowSteelDagger: {
    id: 'forgeShadowSteelDagger',
    name: '锻造暗影精铁匕首',
    icon: 'resource:shadowSteelDagger',
    description: '锻造暗影精铁匕首',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'shadowSteel',
          count: 30,
        },
        {
          id: 'silverDagger',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 28,
        },
      ],
    },
    rewards: [
      {
        id: 'shadowSteelDagger',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 28,
      },
    ],
    secondaryClassification: '特殊材质',
  },
  forgeShadowSteelSword: {
    id: 'forgeShadowSteelSword',
    name: '锻造暗影精铁剑',
    icon: 'resource:shadowSteelSword',
    description: '锻造暗影精铁剑',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'shadowSteel',
          count: 30,
        },
        {
          id: 'silverSword',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 28,
        },
      ],
    },
    rewards: [
      {
        id: 'shadowSteelSword',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 28,
      },
    ],
    secondaryClassification: '特殊材质',
  },
  forgeShadowSteelScythe: {
    id: 'forgeShadowSteelScythe',
    name: '锻造暗影精铁镰刀',
    icon: 'resource:shadowSteelScythe',
    description: '锻造暗影精铁镰刀',
    baseDuration: 39e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'shadowSteel',
          count: 50,
        },
        {
          id: 'rareClaw',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 32,
        },
      ],
    },
    rewards: [
      {
        id: 'shadowSteelScythe',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 32,
      },
    ],
    secondaryClassification: '特殊材质',
  },
  forgeShadowSteelHammer: {
    id: 'forgeShadowSteelHammer',
    name: '锻造暗影精铁大锤',
    icon: 'resource:shadowSteelHammer',
    description: '锻造暗影精铁大锤',
    baseDuration: 39e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'shadowSteel',
          count: 65,
        },
        {
          id: 'steel',
          count: 40,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 32,
        },
      ],
    },
    rewards: [
      {
        id: 'shadowSteelHammer',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 32,
      },
    ],
    secondaryClassification: '特殊材质',
  },
  forgeShadowSteelHat: {
    id: 'forgeShadowSteelHat',
    name: '锻造暗影精铁头盔',
    icon: 'resource:shadowSteelHat',
    description: '锻造暗影精铁头盔',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'shadowSteel',
          count: 30,
        },
        {
          id: 'silverHat',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 28,
        },
      ],
    },
    rewards: [
      {
        id: 'shadowSteelHat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 28,
      },
    ],
    secondaryClassification: '特殊材质',
  },
  forgeShadowSteelCoat: {
    id: 'forgeShadowSteelCoat',
    name: '锻造暗影精铁盔甲',
    icon: 'resource:shadowSteelCoat',
    description: '锻造暗影精铁盔甲',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'shadowSteel',
          count: 30,
        },
        {
          id: 'silverCoat',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 28,
        },
      ],
    },
    rewards: [
      {
        id: 'shadowSteelCoat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 28,
      },
    ],
    secondaryClassification: '特殊材质',
  },
  forgeShadowSteelGloves: {
    id: 'forgeShadowSteelGloves',
    name: '锻造暗影精铁臂甲',
    icon: 'resource:shadowSteelGloves',
    description: '锻造暗影精铁臂甲',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'shadowSteel',
          count: 30,
        },
        {
          id: 'silverGloves',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 28,
        },
      ],
    },
    rewards: [
      {
        id: 'shadowSteelGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 28,
      },
    ],
    secondaryClassification: '特殊材质',
  },
  forgeShadowSteelPants: {
    id: 'forgeShadowSteelPants',
    name: '锻造暗影精铁腿甲',
    icon: 'resource:shadowSteelPants',
    description: '锻造暗影精铁腿甲',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'shadowSteel',
          count: 30,
        },
        {
          id: 'silverPants',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 28,
        },
      ],
    },
    rewards: [
      {
        id: 'shadowSteelPants',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 28,
      },
    ],
    secondaryClassification: '特殊材质',
  },
  forgeStarforgedAlloyHat: {
    id: 'forgeStarforgedAlloyHat',
    name: '锻造星辰合金头盔',
    icon: 'resource:starforgedAlloyHat',
    description: '锻造星辰合金头盔',
    baseDuration: 39e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'starforgedAlloy',
          count: 30,
        },
        {
          id: 'craftingEssence',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 32,
        },
      ],
    },
    rewards: [
      {
        id: 'starforgedAlloyHat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 32,
      },
    ],
    secondaryClassification: '特殊材质',
  },
  forgeStarforgedAlloylCoat: {
    id: 'forgeStarforgedAlloylCoat',
    name: '锻造星辰合金盔甲',
    icon: 'resource:starforgedAlloylCoat',
    description: '锻造星辰合金盔甲',
    baseDuration: 39e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'starforgedAlloy',
          count: 30,
        },
        {
          id: 'craftingEssence',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 32,
        },
      ],
    },
    rewards: [
      {
        id: 'starforgedAlloylCoat',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 32,
      },
    ],
    secondaryClassification: '特殊材质',
  },
  forgeStarforgedAlloyGloves: {
    id: 'forgeStarforgedAlloyGloves',
    name: '锻造星辰合金臂甲',
    icon: 'resource:starforgedAlloyGloves',
    description: '锻造星辰合金臂甲',
    baseDuration: 39e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'blacksmithShop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'starforgedAlloy',
          count: 30,
        },
        {
          id: 'craftingEssence',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 32,
        },
      ],
    },
    rewards: [
      {
        id: 'starforgedAlloyGloves',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 32,
      },
    ],
    secondaryClassification: '特殊材质',
  },
  makeMurkyCrystalDagger: {
    id: 'makeMurkyCrystalDagger',
    name: '制作浊镜匕首',
    icon: 'resource:murkyCrystalDagger',
    description: '制作浊镜匕首',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'wood',
          count: 40,
        },
        {
          id: 'denseFogMurkyCrystal',
          count: 20,
        },
        {
          id: 'rareClaw',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 35,
        },
      ],
    },
    rewards: [
      {
        id: 'murkyCrystalDagger',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 32,
      },
    ],
    secondaryClassification: '特殊材质',
  },
  makeWardenIronWhip: {
    id: 'makeWardenIronWhip',
    name: '锻造狱卒铁刺鞭',
    icon: 'resource:wardenIronWhip',
    description: '锻造狱卒铁刺鞭',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'steel',
          count: 15,
        },
        {
          id: 'craftingEssence',
          count: 15,
        },
        {
          id: 'rusted_chain_link',
          count: 60,
        },
        {
          id: 'pure_monster_essence_lv1',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 35,
        },
      ],
    },
    rewards: [
      {
        id: 'wardenIronWhip',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 32,
      },
    ],
    secondaryClassification: '钢制品',
  },
  makeTraitorsChains: {
    id: 'makeTraitorsChains',
    name: '锻造囚徒脚链',
    icon: 'resource:traitorsChains',
    description: '锻造囚徒脚链',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'steel',
          count: 45,
        },
        {
          id: 'craftingEssence',
          count: 5,
        },
        {
          id: 'rusted_chain_link',
          count: 60,
        },
        {
          id: 'pure_monster_essence_lv2',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 35,
        },
      ],
    },
    rewards: [
      {
        id: 'traitorsChains',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 32,
      },
    ],
    secondaryClassification: '钢制品',
  },
  makeClawFallenRadiance: {
    id: 'makeClawFallenRadiance',
    name: '锻造殇耀之爪',
    icon: 'resource:clawFallenRadiance',
    description: '锻造殇耀之爪',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'royal_claw_fragment',
          count: 25,
        },
        {
          id: 'faded_remnant',
          count: 25,
        },
        {
          id: 'pure_monster_essence_lv3',
          count: 15,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 35,
        },
      ],
    },
    rewards: [
      {
        id: 'clawFallenRadiance',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 32,
      },
    ],
    secondaryClassification: '特殊材质',
  },
  makeClawVowedRadiance: {
    id: 'makeClawVowedRadiance',
    name: '锻造荣誓之爪',
    icon: 'resource:clawVowedRadiance',
    description: '锻造荣誓之爪',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'royal_claw_fragment',
          count: 25,
        },
        {
          id: 'pureEssence',
          count: 5,
        },
        {
          id: 'pure_monster_essence_lv3',
          count: 15,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 35,
        },
      ],
    },
    rewards: [
      {
        id: 'clawVowedRadiance',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 32,
      },
    ],
    secondaryClassification: '特殊材质',
  },
  makeArcaneResonanceBracers: {
    id: 'makeArcaneResonanceBracers',
    name: '锻造魔力共振护臂',
    icon: 'resource:arcaneResonanceBracers',
    description: '锻造荣誓之爪',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 25,
        },
        {
          id: 'mithrilGloves',
          count: 1,
        },
        {
          id: 'mithrilIngot',
          count: 10,
        },
        {
          id: 'ec1_resonance_lattice',
          count: 10,
        },
        {
          id: 'darkCrystal',
          count: 35,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 38,
        },
      ],
    },
    rewards: [
      {
        id: 'arcaneResonanceBracers',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 36,
      },
    ],
    secondaryClassification: '特殊材质',
  },
  makeShadowTalonFang: {
    id: 'makeShadowTalonFang',
    name: '锻造潜锋之爪',
    icon: 'resource:shadowTalonFang',
    description: '锻造潜锋之爪',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 40,
        },
        {
          id: 'mithrilIngot',
          count: 20,
        },
        {
          id: 'rg1_riftclaw_talon',
          count: 5,
        },
        {
          id: 'rareClaw',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'forging',
          min: 38,
        },
      ],
    },
    rewards: [
      {
        id: 'shadowTalonFang',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'forging',
        increaseExp: 36,
      },
    ],
    secondaryClassification: '特殊材质',
  },
  makeSimpleSalad: {
    id: 'makeSimpleSalad',
    name: '制作野草沙拉',
    icon: '🥗',
    description: '将采集到的浆果和草药简单搭配',
    baseDuration: 12e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: 'berry',
          count: 1,
        },
        {
          id: 'herb',
          count: 1,
        },
      ],
    },
    rewards: [
      {
        id: 'simpleSalad',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 2,
      },
    ],
  },
  makeWildFruitMix: {
    id: 'makeWildFruitMix',
    name: '制作野果拼盘',
    icon: '🍎',
    description: '将浆果和蜂蜜混合',
    baseDuration: 6e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: 'berry',
          count: 2,
        },
        {
          id: 'mushroom',
          count: 1,
        },
      ],
    },
    rewards: [
      {
        id: 'wildFruitMix',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 2,
      },
    ],
  },
  makeFishSoup: {
    id: 'makeFishSoup',
    name: '熬制鱼汤',
    icon: '🥣',
    description: '用新鲜鱼熬制美味的鱼汤',
    baseDuration: 6e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: 'berry',
          count: 2,
        },
        {
          id: 'fish',
          count: 2,
        },
      ],
    },
    rewards: [
      {
        id: 'fishSoup',
        percent: 1,
        count: 1,
      },
      {
        id: 'mysteryCan',
        percent: 0.05,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 2,
      },
    ],
  },
  makeBerryPie: {
    id: 'makeBerryPie',
    name: '烤制浆果派',
    icon: '🥧',
    description: '将新鲜浆果制成美味的派',
    baseDuration: 1e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: 'berry',
          count: 2,
        },
        {
          id: 'mushroom',
          count: 1,
        },
        {
          id: 'honey',
          count: 1,
        },
      ],
    },
    rewards: [
      {
        id: 'berryPie',
        percent: 1,
        count: 1,
      },
      {
        id: 'mysteryCan',
        percent: 0.05,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '美食',
  },
  makeMushroomStew: {
    id: 'makeMushroomStew',
    name: '炖蘑菇汤',
    icon: '🍲',
    description: '用新鲜蘑菇熬制营养丰富的汤',
    baseDuration: 1e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: 'berry',
          count: 2,
        },
        {
          id: 'mushroom',
          count: 1,
        },
        {
          id: 'fish',
          count: 1,
        },
      ],
    },
    rewards: [
      {
        id: 'mushroomStew',
        percent: 1,
        count: 1,
      },
      {
        id: 'mysteryCan',
        percent: 0.05,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 3,
      },
    ],
  },
  makeCatMint: {
    id: 'makeCatMint',
    name: '制作猫薄荷饼干',
    icon: '🍪',
    description: '烤制特殊的猫薄荷饼干',
    baseDuration: 1e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: 'fish',
          count: 1,
        },
        {
          id: 'chickenEgg',
          count: 1,
        },
        {
          id: 'milk',
          count: 1,
        },
      ],
    },
    rewards: [
      {
        id: 'catMint',
        percent: 1,
        count: 1,
      },
      {
        id: 'mysteryCan',
        percent: 0.05,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 3,
      },
    ],
  },
  makeCatSnack: {
    id: 'makeCatSnack',
    name: '制作猫咪零食',
    icon: '🍱',
    description: '将鱼和蛋制成美味的猫咪零食',
    baseDuration: 1e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: 'fish',
          count: 1,
        },
        {
          id: 'chickenEgg',
          count: 1,
        },
        {
          id: 'honey',
          count: 1,
        },
      ],
    },
    rewards: [
      {
        id: 'catSnack',
        percent: 1,
        count: 1,
      },
      {
        id: 'mysteryCan',
        percent: 0.05,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 3,
      },
    ],
  },
  makeLuxuryCatFood: {
    id: 'makeLuxuryCatFood',
    name: '制作豪华猫粮',
    icon: '🍥',
    description: '使用稀有食材制作高级猫粮',
    baseDuration: 3e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: 'salmon',
          count: 2,
        },
        {
          id: 'tuna',
          count: 2,
        },
        {
          id: 'rareCatfish',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'luxuryCatFood',
        percent: 1,
        count: 1,
      },
      {
        id: 'mysteryCan',
        percent: 0.05,
        range: {
          min: 2,
          max: 4,
        },
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '美食',
  },
  makeSashimiPlatter: {
    id: 'makeSashimiPlatter',
    name: '制作鲜鱼刺身拼盘',
    icon: '🍣',
    description: '用各种新鲜鱼类制成的刺身拼盘',
    baseDuration: 3e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: 'tuna',
          count: 1,
        },
        {
          id: 'rareCatfish',
          count: 1,
        },
        {
          id: 'mysticalKoi',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'sashimiPlatter',
        percent: 1,
        count: 1,
      },
      {
        id: 'mysteryCan',
        percent: 0.05,
        range: {
          min: 5,
          max: 8,
        },
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '美食',
  },
  makeCustardPudding: {
    id: 'makeCustardPudding',
    name: '制作蛋奶布丁',
    icon: 'resource:custardPudding',
    description: '鸡蛋、牛奶、蜂蜜混合，倒入模具蒸或烤，冷藏后口感更佳。',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'milk',
          count: 10,
        },
        {
          id: 'chickenEgg',
          count: 8,
        },
        {
          id: 'berry',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'custardPudding',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '美食',
  },
  makeStaterFishBait: {
    id: 'makeStaterFishBait',
    name: '制作新手用鱼饵',
    icon: '🐛',
    description: '制作新手用鱼饵',
    baseDuration: 15e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'berry',
          count: 5,
        },
        {
          id: 'chickenEgg',
          count: 1,
        },
      ],
    },
    rewards: [
      {
        id: 'staterFishBait',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 1,
      },
    ],
    secondaryClassification: '鱼饵',
  },
  makeNormalFishBait: {
    id: 'makeNormalFishBait',
    name: '制作普通鱼饵',
    icon: '🐛',
    description: '制作普通鱼饵',
    baseDuration: 3e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'staterFishBait',
          count: 1,
        },
        {
          id: 'rye',
          count: 3,
        },
        {
          id: 'fish',
          count: 1,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'normalFishBait',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 1,
      },
    ],
    secondaryClassification: '鱼饵',
  },
  makeMysticalEssenceFishBait: {
    id: 'makeMysticalEssenceFishBait',
    name: '制作精华鱼饵',
    icon: '🐛',
    description: '制作精华鱼饵',
    baseDuration: 6e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'normalFishBait',
          count: 1,
        },
        {
          id: 'mysticalEssence',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'mysticalEssenceFishBait',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '鱼饵',
  },
  makeLuckyMint: {
    id: 'makeLuckyMint',
    name: '制作幸运曲奇',
    icon: '🍪',
    description: '制作幸运曲奇',
    baseDuration: 15e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'chickenEgg',
          count: 3,
        },
        {
          id: 'milk',
          count: 3,
        },
        {
          id: 'catPotion',
          count: 1,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'luckyMint',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 15,
      },
    ],
    secondaryClassification: '美食',
  },
  makeLuckySashimiPlatter: {
    id: 'makeLuckySashimiPlatter',
    name: '制作幸运鲜鱼刺身',
    icon: '🍱',
    description: '制作幸运鲜鱼刺身',
    baseDuration: 35e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'sashimiPlatter',
          count: 1,
        },
        {
          id: 'catPotion',
          count: 1,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 40,
        },
      ],
    },
    rewards: [
      {
        id: 'luckySashimiPlatter',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '美食',
  },
  makeSuperLuckyBerryPie: {
    id: 'makeSuperLuckyBerryPie',
    name: '制作超级幸运浆果派',
    icon: '🥧',
    description: '制作超级幸运浆果派',
    baseDuration: 6e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: 'mysteriousBerry_1',
          count: 1,
        },
        {
          id: 'catPotion',
          count: 5,
        },
        {
          id: 'honey',
          count: 1,
        },
        {
          id: 'nutrientEssence',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 45,
        },
      ],
    },
    rewards: [
      {
        id: 'superLuckyBerryPie',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '美食',
  },
  makeSuperLuckyMushroomStew: {
    id: 'makeSuperLuckyMushroomStew',
    name: '制作超级香浓蘑菇汤',
    icon: '🍲',
    description: '制作超级香浓蘑菇汤',
    baseDuration: 6e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: 'hugeMushroom',
          count: 1,
        },
        {
          id: 'milk',
          count: 5,
        },
        {
          id: 'catPotion',
          count: 5,
        },
        {
          id: 'nutrientEssence',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 45,
        },
      ],
    },
    rewards: [
      {
        id: 'superLuckyMushroomStew',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '美食',
  },
  makeRyeBread: {
    id: 'makeRyeBread',
    name: '制作黑麦面包',
    icon: 'resource:ryeBread',
    description: '制作黑麦面包',
    baseDuration: 3e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'rye',
          count: 10,
        },
        {
          id: 'berry',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'ryeBread',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '美食',
  },
  makeBerryWine: {
    id: 'makeBerryWine',
    name: '酿造浆果酒',
    icon: 'resource:berryWine',
    description: '使用浆果酿造浆果酒',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'berry',
          count: 20,
        },
        {
          id: 'glassBottles',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'berryWine',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '酿造',
  },
  makeDawnBlossomWine: {
    id: 'makeDawnBlossomWine',
    name: '酿造晨露精酿',
    icon: 'resource:dawnBlossomWine',
    description: '酿制晨露精酿',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'berry',
          count: 5,
        },
        {
          id: 'dawnBlossom',
          count: 4,
        },
        {
          id: 'honey',
          count: 1,
        },
        {
          id: 'glassBottles',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'dawnBlossomWine',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 17,
      },
    ],
    secondaryClassification: '酿造',
  },
  makeWindBellWine: {
    id: 'makeWindBellWine',
    name: '酿造铃语精酿',
    icon: 'resource:windBellWine',
    description: '酿制铃语精酿',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'berry',
          count: 5,
        },
        {
          id: 'windBellHerb',
          count: 4,
        },
        {
          id: 'honey',
          count: 1,
        },
        {
          id: 'glassBottles',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'windBellWine',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 17,
      },
    ],
    secondaryClassification: '酿造',
  },
  makeBattleKnowledgeCocktail: {
    id: 'makeBattleKnowledgeCocktail',
    name: '酿造战斗知识鸡尾酒',
    icon: 'resource:battleKnowledgeCocktail',
    description: '酿造战斗知识鸡尾酒',
    baseDuration: 9e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 30,
        },
        {
          id: 'berryWine',
          count: 1,
        },
        {
          id: 'dawnBlossomWine',
          count: 1,
        },
        {
          id: 'windBellWine',
          count: 1,
        },
        {
          id: 'knowledgeEssence',
          count: 15,
        },
        {
          id: 'pure_monster_essence_lv1',
          count: 15,
        },
        {
          id: 'glassBottles',
          count: 3,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'battleKnowledgeCocktail',
        percent: 1,
        count: 3,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '酿造',
  },
  makeCloudFluffCandy: {
    id: 'makeCloudFluffCandy',
    name: '制作软软棉花糖',
    icon: 'resource:cloudFluffCandy',
    description: '制作软软棉花糖',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'cloudCotton',
          count: 2,
        },
        {
          id: 'honey',
          count: 4,
        },
        {
          id: 'slimeGel',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'cloudFluffCandy',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 17,
      },
    ],
    secondaryClassification: '美食',
  },
  makeMilkManaShake: {
    id: 'makeMilkManaShake',
    name: '制作浆果奶昔',
    icon: 'resource:milkManaShake',
    description: '制作浆果奶昔',
    baseDuration: 35e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'berry',
          count: 10,
        },
        {
          id: 'milk',
          count: 10,
        },
        {
          id: 'honey',
          count: 1,
        },
        {
          id: 'glassBottles',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'milkManaShake',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '饮品',
  },
  makeWindBellMilkShake: {
    id: 'makeWindBellMilkShake',
    name: '制作铃语奶昔',
    icon: 'resource:windBellMilkShake',
    description: '制作铃语奶昔',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'windBellHerb',
          count: 5,
        },
        {
          id: 'milk',
          count: 10,
        },
        {
          id: 'honey',
          count: 1,
        },
        {
          id: 'glassBottles',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'windBellMilkShake',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 17,
      },
    ],
    secondaryClassification: '饮品',
  },
  makeGrapeMilkManaShake: {
    id: 'makeGrapeMilkManaShake',
    name: '制作葡萄浆果奶昔',
    icon: 'resource:grapeMilkManaShake',
    description: '制作葡萄浆果奶昔',
    baseDuration: 35e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'milkManaShake',
          count: 1,
        },
        {
          id: 'grape',
          count: 8,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'grapeMilkManaShake',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '饮品',
  },
  makeGrapeWindBellMilkShake: {
    id: 'makeGrapeWindBellMilkShake',
    name: '制作葡萄铃语奶昔',
    icon: 'resource:grapeWindBellMilkShake',
    description: '制作葡萄铃语奶昔',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'windBellMilkShake',
          count: 1,
        },
        {
          id: 'grape',
          count: 8,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'grapeWindBellMilkShake',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 17,
      },
    ],
    secondaryClassification: '饮品',
  },
  makeCannedTuna: {
    id: 'makeCannedTuna',
    name: '制作金枪鱼罐头',
    icon: 'resource:cannedTuna',
    description: '制作金枪鱼罐头',
    baseDuration: 35e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'fish',
          count: 2,
        },
        {
          id: 'tuna',
          count: 3,
        },
        {
          id: 'ironCan',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'cannedTuna',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '罐头',
  },
  makeCannedShrimp: {
    id: 'makeCannedShrimp',
    name: '制作风味虾仁罐头',
    icon: 'resource:cannedShrimp',
    description: '制作风味虾仁罐头',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'moonlightShrimp',
          count: 4,
        },
        {
          id: 'berry',
          count: 2,
        },
        {
          id: 'honey',
          count: 1,
        },
        {
          id: 'ironCan',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'cannedShrimp',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 17,
      },
    ],
    secondaryClassification: '罐头',
  },
  makeCannedRainbowFish: {
    id: 'makeCannedRainbowFish',
    name: '制作彩虹鱼干罐头',
    icon: 'resource:cannedRainbowFish',
    description: '制作彩虹鱼干罐头',
    baseDuration: 35e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'fish',
          count: 5,
        },
        {
          id: 'rainbowShard',
          count: 1,
        },
        {
          id: 'ironCan',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'cannedRainbowFish',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '罐头',
  },
  makeCannedMysticalKoi: {
    id: 'makeCannedMysticalKoi',
    name: '制作神秘锦鲤罐头',
    icon: 'resource:cannedMysticalKoi',
    description: '制作神秘锦鲤罐头',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'fish',
          count: 2,
        },
        {
          id: 'mysticalKoi',
          count: 1,
        },
        {
          id: 'ironCan',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'cannedMysticalKoi',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 17,
      },
    ],
    secondaryClassification: '罐头',
  },
  makeCannedCrystalCarpTuna: {
    id: 'makeCannedCrystalCarpTuna',
    name: '制作水晶金枪鱼罐头',
    icon: 'resource:cannedCrystalCarpTuna',
    description: '制作水晶金枪鱼罐头',
    baseDuration: 4e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'cannedTuna',
          count: 1,
        },
        {
          id: 'crystalCarp',
          count: 2,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'cannedCrystalCarpTuna',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 15,
      },
    ],
    secondaryClassification: '罐头',
  },
  makeCannedCrystalCarpShrimp: {
    id: 'makeCannedCrystalCarpShrimp',
    name: '制作风味水晶虾仁罐头',
    icon: 'resource:cannedCrystalCarpShrimp',
    description: '制作风味水晶虾仁罐头',
    baseDuration: 5e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'cannedShrimp',
          count: 1,
        },
        {
          id: 'crystalCarp',
          count: 2,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'cannedCrystalCarpShrimp',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '罐头',
  },
  makeCannedCrystalCarpRainbowFish: {
    id: 'makeCannedCrystalCarpRainbowFish',
    name: '制作彩虹水晶鱼干罐头',
    icon: 'resource:cannedCrystalCarpRainbowFish',
    description: '制作彩虹水晶鱼干罐头',
    baseDuration: 4e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'cannedRainbowFish',
          count: 1,
        },
        {
          id: 'crystalCarp',
          count: 2,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'cannedCrystalCarpRainbowFish',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 15,
      },
    ],
    secondaryClassification: '罐头',
  },
  makeCannedCrystalCarpMysticalKoi: {
    id: 'makeCannedCrystalCarpMysticalKoi',
    name: '制作神秘水晶锦鲤罐头',
    icon: 'resource:cannedCrystalCarpMysticalKoi',
    description: '制作神秘水晶锦鲤罐头',
    baseDuration: 5e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'cannedMysticalKoi',
          count: 1,
        },
        {
          id: 'crystalCarp',
          count: 2,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'cannedCrystalCarpMysticalKoi',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 25,
      },
    ],
    secondaryClassification: '罐头',
  },
  makeCollectingTart: {
    id: 'makeCollectingTart',
    name: '制作采集助力蛋挞',
    icon: 'resource:baseTart',
    description: '制作采集助力蛋挞',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'chickenEgg',
          count: 4,
        },
        {
          id: 'milk',
          count: 4,
        },
        {
          id: 'honey',
          count: 4,
        },
        {
          id: 'rye',
          count: 4,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'collectingTart',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '甜点',
  },
  makeFishingTart: {
    id: 'makeFishingTart',
    name: '制作钓鱼助力蛋挞',
    icon: 'resource:baseTart',
    description: '制作钓鱼助力蛋挞',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'chickenEgg',
          count: 4,
        },
        {
          id: 'milk',
          count: 4,
        },
        {
          id: 'honey',
          count: 4,
        },
        {
          id: 'rye',
          count: 4,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'fishingTart',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '甜点',
  },
  makeFarmingAnimalTart: {
    id: 'makeFarmingAnimalTart',
    name: '制作畜牧助力蛋挞',
    icon: 'resource:baseTart',
    description: '制作畜牧助力蛋挞',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'chickenEgg',
          count: 4,
        },
        {
          id: 'milk',
          count: 4,
        },
        {
          id: 'honey',
          count: 4,
        },
        {
          id: 'rye',
          count: 4,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'farmingAnimalTart',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '甜点',
  },
  makeMiningTart: {
    id: 'makeMiningTart',
    name: '制作挖掘助力蛋挞',
    icon: 'resource:baseTart',
    description: '制作挖掘助力蛋挞',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'chickenEgg',
          count: 4,
        },
        {
          id: 'milk',
          count: 4,
        },
        {
          id: 'honey',
          count: 4,
        },
        {
          id: 'rye',
          count: 4,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'miningTart',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '甜点',
  },
  makeSewingTart: {
    id: 'makeSewingTart',
    name: '制作缝纫助力蛋挞',
    icon: 'resource:baseTart',
    description: '制作缝纫助力蛋挞',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'chickenEgg',
          count: 4,
        },
        {
          id: 'milk',
          count: 4,
        },
        {
          id: 'honey',
          count: 4,
        },
        {
          id: 'rye',
          count: 4,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'sewingTart',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '甜点',
  },
  makeCookingTart: {
    id: 'makeCookingTart',
    name: '制作烹饪助力蛋挞',
    icon: 'resource:baseTart',
    description: '制作烹饪助力蛋挞',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'chickenEgg',
          count: 4,
        },
        {
          id: 'milk',
          count: 4,
        },
        {
          id: 'honey',
          count: 4,
        },
        {
          id: 'rye',
          count: 4,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'cookingTart',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '甜点',
  },
  makeManufactureAndForgingTart: {
    id: 'makeManufactureAndForgingTart',
    name: '制作制造助力蛋挞',
    icon: 'resource:baseTart',
    description: '制作制造助力蛋挞',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'chickenEgg',
          count: 4,
        },
        {
          id: 'milk',
          count: 4,
        },
        {
          id: 'honey',
          count: 4,
        },
        {
          id: 'rye',
          count: 4,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'manufactureAndForgingTart',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '甜点',
  },
  makeKnowledgeTart: {
    id: 'makeKnowledgeTart',
    name: '制作知识助力蛋挞',
    icon: 'resource:baseTart',
    description: '制作知识助力蛋挞',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'chickenEgg',
          count: 4,
        },
        {
          id: 'milk',
          count: 4,
        },
        {
          id: 'honey',
          count: 4,
        },
        {
          id: 'rye',
          count: 4,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'knowledgeTart',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '甜点',
  },
  makeExploreTart: {
    id: 'makeExploreTart',
    name: '制作探索助力蛋挞',
    icon: 'resource:baseTart',
    description: '制作探索助力蛋挞',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'chickenEgg',
          count: 4,
        },
        {
          id: 'milk',
          count: 4,
        },
        {
          id: 'honey',
          count: 4,
        },
        {
          id: 'rye',
          count: 4,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'exploreTart',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '甜点',
  },
  makeCollectingTartLv2: {
    id: 'makeCollectingTartLv2',
    name: '制作采集增幅蛋挞',
    icon: 'resource:baseTart',
    description: '制作采集助力蛋挞',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'collectingTart',
          count: 1,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
        {
          id: 'grape',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'collectingTartLv2',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 24,
      },
    ],
    secondaryClassification: '甜点',
  },
  makeFishingTartLv2: {
    id: 'makeFishingTartLv2',
    name: '制作钓鱼增幅蛋挞',
    icon: 'resource:baseTart',
    description: '制作钓鱼助力蛋挞',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'fishingTart',
          count: 1,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
        {
          id: 'grape',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'fishingTartLv2',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 24,
      },
    ],
    secondaryClassification: '甜点',
  },
  makeFarmingAnimalTartLv2: {
    id: 'makeFarmingAnimalTartLv2',
    name: '制作畜牧增幅蛋挞',
    icon: 'resource:baseTart',
    description: '制作畜牧助力蛋挞',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'farmingAnimalTart',
          count: 1,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
        {
          id: 'grape',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'farmingAnimalTartLv2',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 24,
      },
    ],
    secondaryClassification: '甜点',
  },
  makeMiningTartLv2: {
    id: 'makeMiningTartLv2',
    name: '制作挖掘增幅蛋挞',
    icon: 'resource:baseTart',
    description: '制作挖掘助力蛋挞',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'miningTart',
          count: 1,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
        {
          id: 'grape',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'miningTartLv2',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 24,
      },
    ],
    secondaryClassification: '甜点',
  },
  makeSewingTartLv2: {
    id: 'makeSewingTartLv2',
    name: '制作缝纫增幅蛋挞',
    icon: 'resource:baseTart',
    description: '制作缝纫助力蛋挞',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'sewingTart',
          count: 1,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
        {
          id: 'grape',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'sewingTartLv2',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 24,
      },
    ],
    secondaryClassification: '甜点',
  },
  makeCookingTartLv2: {
    id: 'makeCookingTartLv2',
    name: '制作烹饪增幅蛋挞',
    icon: 'resource:baseTart',
    description: '制作烹饪助力蛋挞',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'cookingTart',
          count: 1,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
        {
          id: 'grape',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'cookingTartLv2',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 24,
      },
    ],
    secondaryClassification: '甜点',
  },
  makeManufactureAndForgingTartLv2: {
    id: 'makeManufactureAndForgingTartLv2',
    name: '制作制造增幅蛋挞',
    icon: 'resource:baseTart',
    description: '制作制造助力蛋挞',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'manufactureAndForgingTart',
          count: 1,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
        {
          id: 'grape',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'manufactureAndForgingTartLv2',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 24,
      },
    ],
    secondaryClassification: '甜点',
  },
  makeKnowledgeTartLv2: {
    id: 'makeKnowledgeTartLv2',
    name: '制作知识增幅蛋挞',
    icon: 'resource:baseTart',
    description: '制作知识助力蛋挞',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'knowledgeTart',
          count: 1,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
        {
          id: 'grape',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'knowledgeTartLv2',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 24,
      },
    ],
    secondaryClassification: '甜点',
  },
  makeExploreTartLv2: {
    id: 'makeExploreTartLv2',
    name: '制作探索增幅蛋挞',
    icon: 'resource:baseTart',
    description: '制作探索助力蛋挞',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'kitchen',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'exploreTart',
          count: 1,
        },
        {
          id: 'nutrientEssence',
          count: 1,
        },
        {
          id: 'grape',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'cooking',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'exploreTartLv2',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'cooking',
        increaseExp: 24,
      },
    ],
    secondaryClassification: '甜点',
  },
  makeWoodPulp: {
    id: 'makeWoodPulp',
    name: '木浆',
    icon: 'resource:woodPulp',
    description: '使用木头制浆',
    baseDuration: 1e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
        {
          id: 'wood',
          count: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'woodPulp',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 1,
      },
    ],
  },
  makePaperByWoodPulp: {
    id: 'makePaperByWoodPulp',
    name: '木浆造纸',
    icon: '📃',
    description: '使用木浆造纸',
    baseDuration: 2e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
        {
          id: 'woodPulp',
          count: 4,
        },
      ],
    },
    rewards: [
      {
        id: 'paper',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 1,
      },
    ],
    secondaryClassification: '文具',
  },
  makePaper: {
    id: 'makePaper',
    name: '造纸',
    icon: '📃',
    description: '竹简也算一种纸',
    baseDuration: 22e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
        {
          id: 'bamboo',
          count: 6,
        },
      ],
    },
    rewards: [
      {
        id: 'paper',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 1,
      },
    ],
    secondaryClassification: '文具',
  },
  makeBook: {
    id: 'makeBook',
    name: '封装书',
    icon: '📖',
    description: '将纸封装为一本空白的书',
    baseDuration: 6e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 3,
        },
        {
          id: 'paper',
          count: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'book',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '文具',
  },
  makePencil: {
    id: 'makePencil',
    name: '制作碳笔',
    icon: '✏️',
    description: '制作一支简单的碳笔',
    baseDuration: 2e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
        {
          id: 'wood',
          count: 3,
        },
        {
          id: 'coal',
          count: 2,
        },
      ],
    },
    rewards: [
      {
        id: 'pencil',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 1,
      },
    ],
    secondaryClassification: '文具',
  },
  makeOwlQuillpen: {
    id: 'makeOwlQuillpen',
    name: '制作智慧羽毛笔',
    icon: '🪶',
    description: '制作智慧羽毛笔',
    baseDuration: 25e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'workshop',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 25,
        },
        {
          id: 'owlFeather',
          count: 8,
        },
        {
          id: 'knowledgeEssence',
          count: 10,
        },
        {
          id: 'mysticalEssence',
          count: 2,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 20,
        },
        {
          status: 'manufacturing',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'owlQuillpen',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'manufacturing',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '文具',
  },
  compileStrengthBook: {
    id: 'compileStrengthBook',
    name: '复习战斗知识-力量',
    icon: '📖',
    banToKitty: !0,
    description: '对战斗中学到的知识进行复习',
    baseDuration: 14e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'book',
          count: 1,
        },
        {
          id: 'pencil',
          count: 1,
        },
        {
          id: 'experienceOfStrength',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'bookOfStrength',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'strength',
        increaseExp: 15,
      },
    ],
    secondaryClassification: '学习',
  },
  compileDexterityBook: {
    id: 'compileDexterityBook',
    name: '复习战斗知识-敏捷',
    icon: '📖',
    banToKitty: !0,
    description: '对战斗中学到的知识进行复习',
    baseDuration: 14e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'book',
          count: 1,
        },
        {
          id: 'pencil',
          count: 1,
        },
        {
          id: 'experienceOfDexterity',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'bookOfDexterity',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'dexterity',
        increaseExp: 15,
      },
    ],
    secondaryClassification: '学习',
  },
  compileIntelligenceBook: {
    id: 'compileIntelligenceBook',
    name: '复习战斗知识-智力',
    icon: '📖',
    banToKitty: !0,
    description: '对战斗中学到的知识进行复习',
    baseDuration: 14e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'book',
          count: 1,
        },
        {
          id: 'pencil',
          count: 1,
        },
        {
          id: 'experienceOfIntelligence',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'bookOfIntelligence',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'intelligence',
        increaseExp: 15,
      },
    ],
    secondaryClassification: '学习',
  },
  compileBookOfWorkSkillTreePoint: {
    id: 'compileBookOfWorkSkillTreePoint',
    name: '编写生活专精手册',
    icon: '📖',
    banToKitty: !0,
    description: '编写生活专精手册',
    baseDuration: 18e5,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'book',
          count: 1,
        },
        {
          id: 'pencil',
          count: 1,
        },
        {
          id: 'sewingEssence',
          count: 100,
        },
        {
          id: 'craftingEssence',
          count: 100,
        },
        {
          id: 'nutrientEssence',
          count: 100,
        },
        {
          id: 'knowledgeEssence',
          count: 100,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'bookOfWorkSkillTreePoint',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'knowledge',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '学习',
  },
  compileBookOfBattleSkillTreePoint: {
    id: 'compileBookOfBattleSkillTreePoint',
    name: '编写战斗专精手册',
    icon: '📖',
    banToKitty: !0,
    description: '编写战斗专精手册',
    baseDuration: 18e5,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'book',
          count: 1,
        },
        {
          id: 'pencil',
          count: 1,
        },
        {
          id: 'knowledgeEssence',
          count: 50,
        },
        {
          id: 'pure_monster_essence_lv1',
          count: 50,
        },
        {
          id: 'pure_monster_essence_lv2',
          count: 40,
        },
        {
          id: 'pure_monster_essence_lv3',
          count: 30,
        },
        {
          id: 'pure_monster_essence_lv4',
          count: 15,
        },
        {
          id: 'experienceOfStrength',
          count: 25,
        },
        {
          id: 'experienceOfDexterity',
          count: 25,
        },
        {
          id: 'experienceOfIntelligence',
          count: 25,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'bookOfBattleSkillTreePoint',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'knowledge',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '学习',
  },
  farming: {
    id: 'farming',
    name: '种植',
    icon: '🌱',
    description: '种植作物获得食物',
    baseDuration: 24e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {},
    rewards: [
      {
        id: 'berry',
        percent: 0.8,
        range: {
          min: 1,
          max: 2,
        },
      },
      {
        id: 'mushroom',
        percent: 0.8,
        range: {
          min: 1,
          max: 2,
        },
      },
      {
        id: 'herb',
        percent: 0.8,
        range: {
          min: 1,
          max: 2,
        },
      },
      {
        id: 'bamboo',
        percent: 0.8,
        range: {
          min: 1,
          max: 2,
        },
      },
      {
        id: 'collectRing',
        percent: 0.01,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'farmingPlant',
        increaseExp: 1,
      },
    ],
    secondaryClassification: '种植',
  },
  farmingGrape: {
    id: 'farmingGrape',
    name: '种植葡萄',
    icon: '🍇',
    description: '种植葡萄',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      characterStatus: [
        {
          status: 'farmingPlant',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'grape',
        percent: 1,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'farmingPlant',
        increaseExp: 6,
      },
    ],
    secondaryClassification: '种植',
  },
  farmingRye: {
    id: 'farmingRye',
    name: '种植黑麦',
    icon: 'resource:rye',
    description: '种植黑麦',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      characterStatus: [
        {
          status: 'farmingPlant',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'rye',
        percent: 1,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'farmingPlant',
        increaseExp: 6,
      },
    ],
    secondaryClassification: '种植',
  },
  gatherMushroom: {
    id: 'gatherMushroom',
    name: '采蘑菇',
    icon: '🍄',
    description: '在森林中采集蘑菇',
    baseDuration: 12e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
      ],
    },
    rewards: [
      {
        id: 'mushroom',
        percent: 1,
        range: {
          min: 2,
          max: 4,
        },
      },
      {
        id: 'luminousMoss',
        percent: 0.08,
        count: 1,
      },
      {
        id: 'luckyCatBox',
        percent: 0.01,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'collecting',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '野外',
  },
  pickBerry: {
    id: 'pickBerry',
    name: '采浆果',
    icon: 'resource:berry',
    description: '在灌木丛中采摘新鲜浆果',
    baseDuration: 12e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
      ],
    },
    rewards: [
      {
        id: 'berry',
        percent: 1,
        range: {
          min: 2,
          max: 4,
        },
      },
      {
        id: 'amberSap',
        percent: 0.08,
        count: 1,
      },
      {
        id: 'luckyCatBox',
        percent: 0.01,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'collecting',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '野外',
  },
  collectHerb: {
    id: 'collectHerb',
    name: '采草药',
    icon: '🌿',
    description: '在野外采集有用的草药',
    baseDuration: 12e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
      ],
    },
    rewards: [
      {
        id: 'herb',
        percent: 1,
        range: {
          min: 2,
          max: 4,
        },
      },
      {
        id: 'amberSap',
        percent: 0.08,
        count: 1,
      },
      {
        id: 'luckyCatBox',
        percent: 0.01,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'collecting',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '野外',
  },
  collectFlower: {
    id: 'collectFlower',
    name: '采集花草',
    icon: '🪴',
    description: '在野外采集一些特别的花花草草',
    baseDuration: 16e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 2,
        },
      ],
    },
    rewards: [
      {
        id: 'mushroom',
        percent: 0.8,
        range: {
          min: 1,
          max: 2,
        },
      },
      {
        id: 'herb',
        percent: 0.8,
        range: {
          min: 2,
          max: 4,
        },
      },
      {
        id: 'dawnBlossom',
        percent: 0.1,
        count: 1,
      },
      {
        id: 'luminousMoss',
        percent: 0.1,
        count: 1,
      },
      {
        id: 'windBellHerb',
        percent: 0.1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'collecting',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '野外',
  },
  collectHoney: {
    id: 'collectHoney',
    name: '采蜂蜜',
    icon: '🍯',
    description: '小心翼翼地采集蜂巢中的蜂蜜',
    baseDuration: 12e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 2,
        },
      ],
    },
    rewards: [
      {
        id: 'honey',
        percent: 1,
        range: {
          min: 3,
          max: 4,
        },
      },
      {
        id: 'luckyCatBox',
        percent: 0.01,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'collecting',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '野外',
  },
  woodcutting: {
    id: 'woodcutting',
    name: '砍树',
    icon: '🪓',
    description: '砍伐树木获得木材',
    baseDuration: 8e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 3,
        },
      ],
    },
    rewards: [
      {
        id: 'wood',
        percent: 1,
        range: {
          min: 1,
          max: 3,
        },
      },
      {
        id: 'luckyCatBox',
        percent: 0.01,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'collecting',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '农田',
  },
  cutBamboo: {
    id: 'cutBamboo',
    name: '砍竹子',
    icon: '🎍',
    description: '砍伐竹林获得竹子',
    baseDuration: 12e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
      ],
    },
    rewards: [
      {
        id: 'bamboo',
        percent: 1,
        range: {
          min: 3,
          max: 4,
        },
      },
      {
        id: 'luckyCatBox',
        percent: 0.01,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'collecting',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '农田',
  },
  pickShell: {
    id: 'pickShell',
    name: '捡贝壳',
    icon: '🐚',
    description: '在海边捡拾美丽的贝壳',
    baseDuration: 12e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 2,
        },
      ],
    },
    rewards: [
      {
        id: 'shell',
        percent: 1,
        range: {
          min: 3,
          max: 4,
        },
      },
      {
        id: 'luckyCatBox',
        percent: 0.01,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'collecting',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '海边',
  },
  getSand: {
    id: 'getSand',
    name: '挖沙',
    icon: 'resource:sand',
    description: '在海边挖沙子',
    baseDuration: 12e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 2,
        },
      ],
    },
    rewards: [
      {
        id: 'sand',
        percent: 1,
        range: {
          min: 2,
          max: 3,
        },
      },
      {
        id: 'luckyCatBox',
        percent: 0.01,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'collecting',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '海边',
  },
  dawnBlossom: {
    id: 'dawnBlossom',
    name: '晨露花',
    icon: 'resource:dawnBlossom',
    description: '清晨盛开的花朵，花瓣带有淡淡露水香气',
    baseDuration: 45e3,
    hidden: !0,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'collecting',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'dawnBlossom',
        percent: 1,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'collecting',
        increaseExp: 6,
      },
    ],
    secondaryClassification: '森林',
  },
  amberSap: {
    id: 'amberSap',
    name: '琥珀汁',
    icon: 'resource:amberSap',
    description: '从古树流出的琥珀色树汁，粘稠且珍贵',
    baseDuration: 45e3,
    hidden: !0,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'collecting',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'amberSap',
        percent: 1,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'collecting',
        increaseExp: 6,
      },
    ],
    secondaryClassification: '森林',
  },
  luminousMoss: {
    id: 'luminousMoss',
    name: '夜光苔',
    icon: 'resource:luminousMoss',
    description: '夜晚微微发光的苔藓，常被用于炼金和照明',
    baseDuration: 45e3,
    hidden: !0,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'collecting',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'luminousMoss',
        percent: 1,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'collecting',
        increaseExp: 6,
      },
    ],
    secondaryClassification: '森林',
  },
  windBellHerb: {
    id: 'windBellHerb',
    name: '风铃草',
    icon: 'resource:windBellHerb',
    description: '山风吹拂时会发出清脆铃音的神奇草药',
    baseDuration: 45e3,
    hidden: !0,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'collecting',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'windBellHerb',
        percent: 1,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'collecting',
        increaseExp: 6,
      },
    ],
    secondaryClassification: '森林',
  },
  pickCloudCotton: {
    id: 'pickCloudCotton',
    name: '收集云絮',
    icon: 'resource:cloudCotton',
    description: '飘渺的云絮，在正式使用前只能装在瓶子里',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'hotAirBalloon',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 3,
        },
        {
          id: 'glassBottles',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'collecting',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'cloudCotton',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'collecting',
        increaseExp: 15,
      },
    ],
    secondaryClassification: '天空',
  },
  pickRainbowShard: {
    id: 'pickRainbowShard',
    name: '收集彩虹碎片',
    icon: 'resource:rainbowShard',
    description: '彩虹消散时留下的七彩碎片，在正式使用前只能装在瓶子里',
    baseDuration: 7e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      building: [
        {
          id: 'hotAirBalloon',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 6,
        },
        {
          id: 'glassBottles',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'collecting',
          min: 40,
        },
      ],
    },
    rewards: [
      {
        id: 'rainbowShard',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'collecting',
        increaseExp: 31,
      },
    ],
    secondaryClassification: '天空',
  },
  fishing: {
    id: 'fishing',
    name: '钓鱼',
    icon: '🎣',
    description: '在湖边钓鱼获得鱼类',
    baseDuration: 6e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
      ],
    },
    rewards: [
      {
        id: 'fish',
        percent: 1,
        range: {
          min: 1,
          max: 3,
        },
      },
      {
        id: 'moonlightShrimp',
        percent: 0.08,
        count: 1,
      },
      {
        id: 'crystalCarp',
        percent: 0.06,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'fishing',
        increaseExp: 2,
      },
    ],
    secondaryClassification: '近海',
  },
  netFish: {
    id: 'netFish',
    name: '捞鱼',
    icon: '🐟',
    description: '狠狠的捞鱼',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 3,
        },
      ],
      characterStatus: [
        {
          status: 'fishing',
          min: 1,
        },
      ],
    },
    rewards: [
      {
        id: 'fish',
        percent: 1,
        range: {
          min: 3,
          max: 5,
        },
      },
    ],
    characterImprove: [
      {
        status: 'fishing',
        increaseExp: 3,
      },
    ],
    secondaryClassification: '近海',
  },
  catFishing: {
    id: 'catFishing',
    name: '猫咪捕鱼',
    icon: '🐱',
    description: '让猫咪帮忙抓鱼',
    baseDuration: 45e3,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 2,
        },
      ],
      characterStatus: [
        {
          status: 'fishing',
          min: 1,
        },
      ],
    },
    rewards: [
      {
        id: 'fish',
        percent: 1,
        range: {
          min: 2,
          max: 5,
        },
      },
      {
        id: 'catHairball',
        percent: 0.2,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'fishing',
        increaseExp: 1,
      },
    ],
    secondaryClassification: '近海',
  },
  deepSeaFishing: {
    id: 'deepSeaFishing',
    name: '深海捕鱼',
    icon: '🎣',
    description: '在深海区域钓取大型鱼类',
    baseDuration: 18e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'fishing',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'fish',
        percent: 1,
        range: {
          min: 5,
          max: 7,
        },
      },
      {
        id: 'salmon',
        percent: 0.8,
        range: {
          min: 1,
          max: 3,
        },
      },
      {
        id: 'tuna',
        percent: 0.6,
        range: {
          min: 1,
          max: 3,
        },
      },
      {
        id: 'jadeTuna',
        percent: 0.05,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'fishing',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '近海',
  },
  mysticalFishing: {
    id: 'mysticalFishing',
    name: '神秘钓鱼',
    icon: '🎣',
    description: '在月光下钓取神秘的鱼类',
    baseDuration: 18e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'mysticalEssence',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'fishing',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'fish',
        percent: 1,
        range: {
          min: 5,
          max: 7,
        },
      },
      {
        id: 'tuna',
        percent: 0.8,
        range: {
          min: 3,
          max: 6,
        },
      },
      {
        id: 'rareCatfish',
        percent: 0.5,
        range: {
          min: 1,
          max: 2,
        },
      },
      {
        id: 'mysticalKoi',
        percent: 0.3,
        count: 1,
      },
      {
        id: 'moonlightShrimp',
        percent: 0.5,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'fishing',
        increaseExp: 5,
      },
    ],
    secondaryClassification: '近海',
  },
  fishingJadeTuna: {
    id: 'fishingJadeTuna',
    name: '翡翠金枪鱼',
    icon: 'resource:jadeTuna',
    description: '体色翠绿的巨型金枪鱼，只能在深海钓获',
    baseDuration: 18e4,
    hidden: !0,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'fishing',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'jadeTuna',
        percent: 1,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'fishing',
        increaseExp: 8,
      },
    ],
    secondaryClassification: '深海',
  },
  fishingEmberEel: {
    id: 'fishingEmberEel',
    name: '余烬鳗',
    icon: 'resource:emberEel',
    description: '体表带有微光的火红鳗鱼，生活在火山河流中',
    baseDuration: 18e4,
    hidden: !0,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'fishing',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'emberEel',
        percent: 1,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'fishing',
        increaseExp: 8,
      },
    ],
    secondaryClassification: '深海',
  },
  fishingMoonlightShrimp: {
    id: 'fishingMoonlightShrimp',
    name: '月光虾',
    icon: 'resource:moonlightShrimp',
    description: '夜晚出没的银白色虾类，传说能带来好运',
    baseDuration: 18e4,
    hidden: !0,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'fishing',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'moonlightShrimp',
        percent: 1,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'fishing',
        increaseExp: 8,
      },
    ],
    secondaryClassification: '深海',
  },
  fishingCrystalCarp: {
    id: 'fishingCrystalCarp',
    name: '水晶鲤',
    icon: 'resource:crystalCarp',
    description: '鳞片如水晶般透明的稀有鲤鱼，常见于静谧湖泊',
    baseDuration: 18e4,
    hidden: !0,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'fishing',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'crystalCarp',
        percent: 1,
        range: {
          min: 1,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'fishing',
        increaseExp: 8,
      },
    ],
    secondaryClassification: '深海',
  },
  makeMagicBook: {
    id: 'makeMagicBook',
    name: '制作魔法书',
    icon: 'resource:magicBook',
    description: '一本充满魔法的书籍',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'book',
          count: 1,
        },
        {
          id: 'magicScroll',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'magicBook',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'intelligence',
        increaseExp: 8,
      },
      {
        status: 'knowledge',
        increaseExp: 4,
      },
    ],
    secondaryClassification: '魔法书',
  },
  makeStarDustMagicBook: {
    id: 'makeStarDustMagicBook',
    name: '制作星辰魔法书',
    icon: 'resource:starDustMagicBook',
    description: '一本充满星辰魔法的书籍',
    baseDuration: 6e5,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'magicBook',
          count: 1,
        },
        {
          id: 'starDust',
          count: 20,
        },
        {
          id: 'starRelic',
          count: 4,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'starDustMagicBook',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'intelligence',
        increaseExp: 12,
      },
      {
        status: 'knowledge',
        increaseExp: 8,
      },
    ],
    secondaryClassification: '魔法书',
  },
  makeBookOfUnwriting: {
    id: 'makeBookOfUnwriting',
    name: '制作逆写抄本',
    icon: 'resource:bookOfUnwriting',
    description: '制作逆写抄本',
    baseDuration: 72e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'magicBook',
          count: 1,
        },
        {
          id: 'memoryPage',
          count: 20,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'bookOfUnwriting',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'intelligence',
        increaseExp: 16,
      },
      {
        status: 'knowledge',
        increaseExp: 12,
      },
    ],
    secondaryClassification: '魔法书',
  },
  makeLumenCodex: {
    id: 'makeLumenCodex',
    name: '制作光明法典',
    icon: 'resource:lumenCodex',
    description: '制作光明法典',
    baseDuration: 72e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'magicBook',
          count: 1,
        },
        {
          id: 'tomeFragment',
          count: 20,
        },
        {
          id: 'pureEssence',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'lumenCodex',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'intelligence',
        increaseExp: 20,
      },
      {
        status: 'knowledge',
        increaseExp: 15,
      },
    ],
    secondaryClassification: '魔法书',
  },
  makeUmbralCodex: {
    id: 'makeUmbralCodex',
    name: '制作黑暗法典',
    icon: 'resource:umbralCodex',
    description: '制作黑暗法典',
    baseDuration: 72e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'magicBook',
          count: 1,
        },
        {
          id: 'tomeFragment',
          count: 20,
        },
        {
          id: 'shadowOrb',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'umbralCodex',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'intelligence',
        increaseExp: 20,
      },
      {
        status: 'knowledge',
        increaseExp: 15,
      },
    ],
    secondaryClassification: '魔法书',
  },
  refineMoonlightEssence: {
    id: 'refineMoonlightEssence',
    name: '提炼月光精华',
    icon: '🌙',
    description: '从月光铃铛中提取神秘的月之力',
    baseDuration: 12e3,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 1,
        },
        {
          id: 'moonlightBell',
          count: 1,
        },
        {
          id: 'herb',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 1,
        },
      ],
    },
    rewards: [
      {
        id: 'mysticalEssence',
        percent: 1,
        count: 1,
      },
      {
        id: 'catHairball',
        percent: 0.8,
        range: {
          min: 3,
          max: 6,
        },
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 1,
      },
    ],
    secondaryClassification: '提炼',
  },
  refineEctoplasm: {
    id: 'refineEctoplasm',
    name: '提炼灵质',
    icon: 'resource:purifiedEctoplasm',
    description: '提炼灵质',
    baseDuration: 3e4,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'ectoplasm',
          count: 10,
        },
        {
          id: 'luminousMoss',
          count: 3,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 3,
        },
      ],
    },
    rewards: [
      {
        id: 'purifiedEctoplasm',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 6,
      },
    ],
    secondaryClassification: '提炼',
  },
  refinePureEssence: {
    id: 'refinePureEssence',
    name: '提炼纯净精华',
    icon: 'resource:pureEssence',
    description: '提炼纯净精华',
    baseDuration: 3e4,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'starDust',
          count: 10,
        },
        {
          id: 'luminousMoss',
          count: 2,
        },
        {
          id: 'amberSap',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 3,
        },
      ],
    },
    rewards: [
      {
        id: 'pureEssence',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 6,
      },
    ],
    secondaryClassification: '提炼',
  },
  refineGenesisEssence: {
    id: 'refineGenesisEssence',
    name: '提炼造物精华',
    icon: 'resource:genesisEssence',
    description: '提炼造物精华',
    baseDuration: 6e4,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 100,
        },
        {
          id: 'sewingEssence',
          count: 4,
        },
        {
          id: 'craftingEssence',
          count: 4,
        },
        {
          id: 'nutrientEssence',
          count: 4,
        },
        {
          id: 'knowledgeEssence',
          count: 4,
        },
        {
          id: 'pure_monster_essence_lv1',
          count: 4,
        },
        {
          id: 'mysticalEssence',
          count: 4,
        },
        {
          id: 'catRelic',
          count: 2,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 40,
        },
        {
          status: 'mysterious',
          min: 40,
        },
      ],
    },
    rewards: [
      {
        id: 'genesisEssence',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '提炼',
  },
  refineMoonPearl: {
    id: 'refineMoonPearl',
    name: '附魔月光珍珠',
    icon: 'resource:moonPearl',
    description: '附魔月光精华',
    baseDuration: 12e5,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 25,
        },
        {
          id: 'pearl',
          count: 20,
        },
        {
          id: 'moonlightBell',
          count: 10,
        },
        {
          id: 'nutrientEssence',
          count: 10,
        },
        {
          id: 'mysticalEssence',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 30,
        },
        {
          status: 'mysterious',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'moonPearl',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 15,
      },
    ],
    secondaryClassification: '附灵',
  },
  brewingHealingPotion: {
    id: 'brewingHealingPotion',
    name: '炼制治疗药水',
    icon: 'resource:healingPotion',
    description: '炼制治疗药水',
    baseDuration: 3e4,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'herb',
          count: 10,
        },
        {
          id: 'honey',
          count: 1,
        },
        {
          id: 'glassBottles',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'healingPotion',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 8,
      },
    ],
    secondaryClassification: '制药',
  },
  brewingHealingPotion_2: {
    id: 'brewingHealingPotion_2',
    name: '炼制强效治疗药水',
    icon: 'resource:healingPotion',
    description: '炼制强效治疗药水',
    baseDuration: 3e4,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'healingPotion',
          count: 2,
        },
        {
          id: 'pearl',
          count: 3,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'healingPotion_2',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 16,
      },
    ],
    secondaryClassification: '制药',
  },
  brewingManaPotion: {
    id: 'brewingManaPotion',
    name: '炼制魔法药水',
    icon: 'resource:manaPotion',
    description: '炼制魔法药水',
    baseDuration: 3e4,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'berry',
          count: 10,
        },
        {
          id: 'honey',
          count: 1,
        },
        {
          id: 'glassBottles',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 5,
        },
      ],
    },
    rewards: [
      {
        id: 'manaPotion',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 8,
      },
    ],
    secondaryClassification: '制药',
  },
  brewingHasteElixir: {
    id: 'brewingHasteElixir',
    name: '炼制极速药剂',
    icon: 'resource:hasteElixir',
    description: '炼制极速药剂',
    baseDuration: 35e3,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'herb',
          count: 5,
        },
        {
          id: 'batWing',
          count: 2,
        },
        {
          id: 'milk',
          count: 3,
        },
        {
          id: 'glassBottles',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'mysterious',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'hasteElixir',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '制药',
  },
  brewingMonoPolarElixir: {
    id: 'brewingMonoPolarElixir',
    name: '炼制单极药剂',
    icon: 'resource:monoPolarElixir',
    description: '炼制单极药剂',
    baseDuration: 35e3,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'slimeGel',
          count: 5,
        },
        {
          id: 'slimeCore',
          count: 3,
        },
        {
          id: 'honey',
          count: 2,
        },
        {
          id: 'glassBottles',
          count: 1,
        },
      ],
      characterStatus: [
        {
          status: 'mysterious',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'monoPolarElixir',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '制药',
  },
  writeCatScroll: {
    id: 'writeCatScroll',
    name: '书写卷轴',
    icon: '📜',
    description: '书写卷轴',
    baseDuration: 6e4,
    hidden: !0,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 5,
        },
        {
          id: 'paper',
          count: 4,
        },
        {
          id: 'pencil',
          count: 1,
        },
        {
          id: 'mysticalEssence',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'mysterious',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'catScroll',
        percent: 0.3,
        count: 1,
      },
      {
        id: 'magicScroll',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 10,
      },
    ],
    secondaryClassification: '魔法书',
  },
  toInfuseShadowBlade: {
    id: 'toInfuseShadowBlade',
    name: '附灵影之刃',
    icon: 'resource:infusedshadowBlade',
    description: '附灵影之刃',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'shadowBlade',
          count: 1,
        },
        {
          id: 'purifiedEctoplasm',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 15,
        },
      ],
    },
    rewards: [
      {
        id: 'infusedShadowBlade',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 18,
      },
    ],
    secondaryClassification: '附灵',
  },
  toInfusedGuardianCoreAmulet: {
    id: 'toInfusedGuardianCoreAmulet',
    name: '附灵守护者核心护符',
    icon: 'resource:infusedGuardianCoreAmulet',
    description: '附灵守护者核心护符',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'guardianCoreAmulet',
          count: 1,
        },
        {
          id: 'purifiedEctoplasm',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 12,
        },
      ],
    },
    rewards: [
      {
        id: 'infusedGuardianCoreAmulet',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 14,
      },
    ],
    secondaryClassification: '附灵',
  },
  toInfusedDarkingCuteSword: {
    id: 'toInfusedDarkingCuteSword',
    name: '附灵猫猫剑',
    icon: 'resource:darkingCuteSword',
    description: '附灵猫猫剑',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'cuteSword',
          count: 1,
        },
        {
          id: 'purifiedEctoplasm',
          count: 5,
        },
        {
          id: 'darkCrystal',
          count: 10,
        },
        {
          id: 'shadowOrb',
          count: 10,
        },
        {
          id: 'dark_sigil_fragment',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 12,
        },
      ],
    },
    rewards: [
      {
        id: 'darkingCuteSword',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 14,
      },
    ],
    secondaryClassification: '附灵',
  },
  makeTimeflowCatEyeGenesisEssenceStaff: {
    id: 'makeTimeflowCatEyeGenesisEssenceStaff',
    name: '棱彩时光法杖',
    icon: 'resource:timeflowCatEyeGenesisEssenceStaff',
    description: '棱彩时光法杖',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'timeflowCatEyeStaff+10',
          count: 1,
        },
        {
          id: 'genesisEssence',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'timeflowCatEyeGenesisEssenceStaff',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '造物精华',
  },
  makeGenesisEssenceLuckRainbowRibbon: {
    id: 'makeGenesisEssenceLuckRainbowRibbon',
    name: '棱彩飘带',
    icon: 'resource:genesisEssenceLuckRainbowRibbon',
    description: '棱彩飘带',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'luckRainbowRibbon+5',
          count: 1,
        },
        {
          id: 'genesisEssence',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'genesisEssenceLuckRainbowRibbon',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '造物精华',
  },
  makeGenesisEssenceOwlQuillpen: {
    id: 'makeGenesisEssenceOwlQuillpen',
    name: '棱彩羽毛笔',
    icon: 'resource:genesisEssenceOwlQuillpen',
    description: '棱彩羽毛笔',
    baseDuration: 3e5,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'owlQuillpen+5',
          count: 1,
        },
        {
          id: 'genesisEssence',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 35,
        },
        {
          status: 'mysterious',
          min: 35,
        },
      ],
    },
    rewards: [
      {
        id: 'genesisEssenceOwlQuillpen',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 30,
      },
    ],
    secondaryClassification: '造物精华',
  },
  makeGenesisEssenceShadowSteelSword: {
    id: 'makeGenesisEssenceShadowSteelSword',
    name: '棱彩精铁剑',
    icon: 'resource:genesisEssenceShadowSteelSword',
    description: '棱彩精铁剑',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'shadowSteelSword+10',
          count: 1,
        },
        {
          id: 'genesisEssence',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'genesisEssenceShadowSteelSword',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '造物精华',
  },
  makeDragonScaleGenesisEssencArmor: {
    id: 'makeDragonScaleGenesisEssencArmor',
    name: '棱彩龙鳞甲',
    icon: 'resource:dragonScaleGenesisEssencArmor',
    description: '棱彩龙鳞甲',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'dragonScaleArmor+5',
          count: 1,
        },
        {
          id: 'genesisEssence',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'dragonScaleGenesisEssencArmor',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '造物精华',
  },
  makeGenesisEssenceFangNecklace: {
    id: 'makeGenesisEssenceFangNecklace',
    name: '棱彩兽牙项链',
    icon: 'resource:genesisEssenceFangNecklace',
    description: '棱彩兽牙项链',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'fangNecklace+5',
          count: 1,
        },
        {
          id: 'genesisEssence',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 30,
        },
        {
          status: 'battle',
          min: 70,
        },
      ],
    },
    rewards: [
      {
        id: 'genesisEssenceFangNecklace',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '造物精华',
  },
  makeIntertwinedCatEyeGenesisEssenceStaff: {
    id: 'makeIntertwinedCatEyeGenesisEssenceStaff',
    name: '棱彩交织法杖',
    icon: 'resource:intertwinedCatEyeGenesisEssenceStaff',
    description: '棱彩交织法杖',
    baseDuration: 36e4,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'intertwinedCatEyeStaff+10',
          count: 1,
        },
        {
          id: 'genesisEssence',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 30,
        },
      ],
    },
    rewards: [
      {
        id: 'intertwinedCatEyeGenesisEssenceStaff',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 20,
      },
    ],
    secondaryClassification: '造物精华',
  },
  reductionInfuseShadowBlade: {
    id: 'reductionInfuseShadowBlade',
    name: '净化魂灵之刃',
    icon: 'resource:shadowBlade',
    description: '净化魂灵之刃',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'infusedShadowBlade',
          count: 1,
        },
        {
          id: 'pureEssence',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'shadowBlade',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 12,
      },
    ],
    secondaryClassification: '净化',
  },
  reductionCursedSilkSachet: {
    id: 'reductionCursedSilkSachet',
    name: '净化诅咒香囊',
    icon: 'resource:puredSilkSachet',
    description: '净化诅咒香囊',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'cursedSilkSachet',
          count: 1,
        },
        {
          id: 'pureEssence',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'puredSilkSachet',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 12,
      },
    ],
    secondaryClassification: '净化',
  },
  reductionSealBell: {
    id: 'reductionSealBell',
    name: '净化被封印的铃铛',
    icon: 'resource:echoBellCharm',
    description: '净化被封印的铃铛',
    baseDuration: 48e4,
    hidden: !1,
    ignoreDismantle: !0,
    requirement: {
      building: [
        {
          id: 'mysteriousCabin',
          minLevel: 1,
        },
      ],
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
        {
          id: 'sealBell',
          count: 8,
        },
        {
          id: 'pureEssence',
          count: 5,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 20,
        },
      ],
    },
    rewards: [
      {
        id: 'echoBellCharm',
        percent: 1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'mysterious',
        increaseExp: 24,
      },
    ],
    secondaryClassification: '净化',
  },
  exploreNewArea: {
    id: 'exploreNewArea',
    name: '探索',
    icon: '🧭',
    description: '探索这个世界',
    baseDuration: 3e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
      ],
    },
    rewards: [
      {
        id: 'treasureMap',
        percent: 0.5,
        count: 1,
      },
      {
        id: 'catHairball',
        percent: 1,
        range: {
          min: 4,
          max: 6,
        },
      },
      {
        id: 'berry',
        percent: 0.8,
        range: {
          min: 4,
          max: 6,
        },
      },
      {
        id: 'honey',
        percent: 0.6,
        range: {
          min: 3,
          max: 2,
        },
      },
    ],
    characterImprove: [
      {
        status: 'exploring',
        increaseExp: 6,
      },
    ],
  },
  archaeological: {
    id: 'archaeological',
    name: '考古挖掘',
    icon: '⛏️',
    description: '考古发现远古文明遗迹',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: '__satiety',
          count: 10,
        },
      ],
      characterStatus: [
        {
          status: 'knowledge',
          min: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'catAntiqueShard',
        percent: 1,
        range: {
          min: 2,
          max: 5,
        },
      },
      {
        id: 'treasureMap',
        percent: 0.8,
        range: {
          min: 1,
          max: 4,
        },
      },
      {
        id: 'catStatue',
        percent: 1,
        count: 1,
      },
      {
        id: 'ancientCatBowl',
        percent: 0.1,
        count: 1,
      },
      {
        id: 'catPawCoin',
        percent: 0.01,
        range: {
          min: 1,
          max: 3,
        },
      },
      {
        id: 'catScroll',
        percent: 0.05,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'exploring',
        increaseExp: 3,
      },
      {
        status: 'knowledge',
        increaseExp: 2,
      },
    ],
  },
  treasureHunt: {
    id: 'treasureHunt',
    name: '寻宝',
    icon: '🎁',
    description: '带着藏宝图寻找神秘宝藏！',
    baseDuration: 12e4,
    hidden: !1,
    ignoreDismantle: !1,
    requirement: {
      resource: [
        {
          id: 'treasureMap',
          count: 1,
        },
        {
          id: '__satiety',
          count: 25,
        },
      ],
    },
    rewards: [
      {
        id: 'catnipGem',
        percent: 1,
        count: 1,
      },
      {
        id: 'mysticalEssence',
        percent: 1,
        count: 1,
      },
      {
        id: 'dreamFeatherBag',
        percent: 0.1,
        range: {
          min: 1,
          max: 2,
        },
      },
      {
        id: 'luckyCatCharm',
        percent: 0.2,
        count: 1,
      },
      {
        id: 'whiskerFeather',
        percent: 0.1,
        count: 1,
      },
    ],
    characterImprove: [
      {
        status: 'exploring',
        increaseExp: 24,
      },
    ],
  },
};
