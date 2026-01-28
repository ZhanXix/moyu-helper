// 此文件由 scripts/transform-data.js 自动生成，请勿手动修改

import type { CraftItemCategory } from '@/types';

/**
 * 物品制造依赖配置（树形结构）
 * 自动从游戏数据生成
 */
export const DEFAULT_CRAFT_ITEMS: CraftItemCategory[] = [
  {
    "value": "collection_required_actions",
    "label": "收藏",
    "items": [
      {
        "value": "exploreNewArea",
        "label": "探索",
        "actionId": "exploreNewArea",
        "rewards": [
          {
            "itemId": "treasureMap",
            "count": 0.5
          },
          {
            "itemId": "catHairball",
            "count": 4
          },
          {
            "itemId": "berry",
            "count": 3.2
          },
          {
            "itemId": "honey",
            "count": 1.7999999999999998
          }
        ]
      },
      {
        "value": "sericulture",
        "label": "养蚕",
        "actionId": "sericulture",
        "rewards": [
          {
            "itemId": "silk",
            "count": 2
          }
        ]
      },
      {
        "value": "pearlCultivation",
        "label": "培育珍珠",
        "actionId": "pearlCultivation",
        "rewards": [
          {
            "itemId": "pearl",
            "count": 1
          },
          {
            "itemId": "moonPearl",
            "count": 0.05
          },
          {
            "itemId": "blackPearl",
            "count": 0.01
          }
        ],
        "dependencies": [
          {
            "itemId": "sand",
            "count": 15
          },
          {
            "itemId": "nutrientEssence",
            "count": 10
          }
        ]
      },
      {
        "value": "farmingSheep",
        "label": "照料绵羊",
        "actionId": "farmingSheep",
        "rewards": [
          {
            "itemId": "wool",
            "count": 2
          },
          {
            "itemId": "animalManure",
            "count": 0.24
          }
        ]
      },
      {
        "value": "farmingChicken",
        "label": "照料小鸡仔",
        "actionId": "farmingChicken",
        "rewards": [
          {
            "itemId": "chickenEgg",
            "count": 2
          },
          {
            "itemId": "animalManure",
            "count": 0.1
          }
        ]
      },
      {
        "value": "farmingCow",
        "label": "照料奶牛",
        "actionId": "farmingCow",
        "rewards": [
          {
            "itemId": "milk",
            "count": 2
          },
          {
            "itemId": "animalManure",
            "count": 0.24
          }
        ]
      },
      {
        "value": "miningFishscaleMineral",
        "label": "开采鱼鳞矿",
        "actionId": "miningFishscaleMineral",
        "rewards": [
          {
            "itemId": "gold",
            "count": 0.30000000000000004
          },
          {
            "itemId": "stone",
            "count": 8
          },
          {
            "itemId": "fishscaleMineral",
            "count": 0.8
          }
        ]
      },
      {
        "value": "charcoalMaking",
        "label": "烧制炭",
        "actionId": "charcoalMaking",
        "rewards": [
          {
            "itemId": "coal",
            "count": 2
          }
        ]
      },
      {
        "value": "sewCashmere",
        "label": "缝制羊绒布料",
        "actionId": "sewCashmere",
        "rewards": [
          {
            "itemId": "cashmere",
            "count": 1
          }
        ],
        "dependencies": [
          {
            "itemId": "catHairball",
            "count": 10
          },
          {
            "itemId": "wool",
            "count": 30
          }
        ]
      },
      {
        "value": "sewSilkFabric",
        "label": "缝制丝绸布料",
        "actionId": "sewSilkFabric",
        "rewards": [
          {
            "itemId": "silkFabric",
            "count": 1
          }
        ],
        "dependencies": [
          {
            "itemId": "catHairball",
            "count": 10
          },
          {
            "itemId": "cashmere",
            "count": 1
          },
          {
            "itemId": "silk",
            "count": 20
          }
        ]
      },
      {
        "value": "pickRainbowShard",
        "label": "收集彩虹碎片",
        "actionId": "pickRainbowShard",
        "rewards": [
          {
            "itemId": "rainbowShard",
            "count": 1
          }
        ],
        "dependencies": [
          {
            "itemId": "glassBottles",
            "count": 1
          }
        ]
      },
      {
        "value": "cutBamboo",
        "label": "砍竹子",
        "actionId": "cutBamboo",
        "rewards": [
          {
            "itemId": "bamboo",
            "count": 3
          },
          {
            "itemId": "luckyCatBox",
            "count": 0.01
          }
        ]
      },
      {
        "value": "reading",
        "label": "读书",
        "actionId": "reading",
        "rewards": []
      },
      {
        "value": "swim",
        "label": "游泳",
        "actionId": "swim",
        "rewards": [],
        "dependencies": [
          {
            "itemId": "gold",
            "count": 25
          }
        ]
      }
    ]
  },
  {
    "value": "道具",
    "label": "道具",
    "items": [
      {
        "value": "makeGlassBottle",
        "label": "制造玻璃瓶",
        "actionId": "makeGlassBottle",
        "rewards": [
          {
            "itemId": "glassBottles",
            "count": 1
          }
        ],
        "dependencies": [
          {
            "itemId": "sand",
            "count": 10
          }
        ]
      }
    ]
  },
  {
    "value": "海边",
    "label": "海边",
    "items": [
      {
        "value": "getSand",
        "label": "挖沙",
        "actionId": "getSand",
        "rewards": [
          {
            "itemId": "sand",
            "count": 2
          },
          {
            "itemId": "luckyCatBox",
            "count": 0.01
          }
        ]
      }
    ]
  },
  {
    "value": "基础缝纫",
    "label": "基础缝纫",
    "items": [
      {
        "value": "separateFluffstone",
        "label": "分离绒毛",
        "actionId": "separateFluffstone",
        "rewards": [
          {
            "itemId": "fluff",
            "count": 1
          },
          {
            "itemId": "stone",
            "count": 0.2
          },
          {
            "itemId": "iron",
            "count": 0.2
          },
          {
            "itemId": "coal",
            "count": 0.2
          }
        ],
        "dependencies": [
          {
            "itemId": "fluffstone",
            "count": 3
          }
        ]
      },
      {
        "value": "sewFluffFabric",
        "label": "缝制绒毛布料",
        "actionId": "sewFluffFabric",
        "rewards": [
          {
            "itemId": "fluffFabric",
            "count": 1
          }
        ],
        "dependencies": [
          {
            "itemId": "catHairball",
            "count": 10
          },
          {
            "itemId": "silkFabric",
            "count": 1
          },
          {
            "itemId": "fluff",
            "count": 5
          }
        ]
      }
    ]
  },
  {
    "value": "近海",
    "label": "近海",
    "items": [
      {
        "value": "catFishing",
        "label": "猫咪捕鱼",
        "actionId": "catFishing",
        "rewards": [
          {
            "itemId": "fish",
            "count": 2
          },
          {
            "itemId": "catHairball",
            "count": 0.2
          }
        ]
      }
    ]
  },
  {
    "value": "矿洞",
    "label": "矿洞",
    "items": [
      {
        "value": "miningFluffstone",
        "label": "开采绒毛岩",
        "actionId": "miningFluffstone",
        "rewards": [
          {
            "itemId": "gold",
            "count": 0.30000000000000004
          },
          {
            "itemId": "stone",
            "count": 8
          },
          {
            "itemId": "fluffstone",
            "count": 0.8
          }
        ]
      },
      {
        "value": "miningWithShaft",
        "label": "矿井采矿",
        "actionId": "miningWithShaft",
        "rewards": [
          {
            "itemId": "gold",
            "count": 0.05
          },
          {
            "itemId": "stone",
            "count": 10
          },
          {
            "itemId": "iron",
            "count": 8
          },
          {
            "itemId": "coal",
            "count": 8
          }
        ]
      },
      {
        "value": "deepMining",
        "label": "深度开采",
        "actionId": "deepMining",
        "rewards": [
          {
            "itemId": "gold",
            "count": 1
          },
          {
            "itemId": "iron",
            "count": 6
          },
          {
            "itemId": "silverOre",
            "count": 3.2
          },
          {
            "itemId": "mithrilOre",
            "count": 2
          }
        ]
      },
      {
        "value": "mining",
        "label": "挖矿",
        "actionId": "mining",
        "rewards": [
          {
            "itemId": "gold",
            "count": 0.05
          },
          {
            "itemId": "stone",
            "count": 1
          },
          {
            "itemId": "iron",
            "count": 0.5
          },
          {
            "itemId": "coal",
            "count": 0.5
          }
        ]
      }
    ]
  },
  {
    "value": "猫舍家具",
    "label": "猫舍家具",
    "items": [
      {
        "value": "makeScratchingPost",
        "label": "制作猫抓板",
        "actionId": "makeScratchingPost",
        "rewards": [
          {
            "itemId": "scratchingPost",
            "count": 1
          }
        ],
        "dependencies": [
          {
            "itemId": "catPotion",
            "count": 2
          },
          {
            "itemId": "whiskerFeather",
            "count": 2
          }
        ]
      },
      {
        "value": "makeAutoFeeder",
        "label": "制作自动喂食器",
        "actionId": "makeAutoFeeder",
        "rewards": [
          {
            "itemId": "autoFeeder",
            "count": 1
          }
        ],
        "dependencies": [
          {
            "itemId": "ancientCatBowl",
            "count": 1
          },
          {
            "itemId": "glassBottles",
            "count": 1
          },
          {
            "itemId": "iron",
            "count": 25
          },
          {
            "itemId": "ancientGear",
            "count": 10
          }
        ]
      }
    ]
  },
  {
    "value": "美食",
    "label": "美食",
    "items": [
      {
        "value": "makeCustardPudding",
        "label": "制作蛋奶布丁",
        "actionId": "makeCustardPudding",
        "rewards": [
          {
            "itemId": "custardPudding",
            "count": 1
          }
        ],
        "dependencies": [
          {
            "itemId": "milk",
            "count": 10
          },
          {
            "itemId": "chickenEgg",
            "count": 8
          }
        ]
      },
      {
        "value": "makeRyeBread",
        "label": "制作黑麦面包",
        "actionId": "makeRyeBread",
        "rewards": [
          {
            "itemId": "ryeBread",
            "count": 1
          }
        ],
        "dependencies": [
          {
            "itemId": "rye",
            "count": 10
          }
        ]
      },
      {
        "value": "makeCloudFluffCandy",
        "label": "制作软软棉花糖",
        "actionId": "makeCloudFluffCandy",
        "rewards": [
          {
            "itemId": "cloudFluffCandy",
            "count": 1
          }
        ],
        "dependencies": [
          {
            "itemId": "cloudCotton",
            "count": 2
          },
          {
            "itemId": "honey",
            "count": 4
          },
          {
            "itemId": "slimeGel",
            "count": 1
          }
        ]
      }
    ]
  },
  {
    "value": "酿造",
    "label": "酿造",
    "items": [
      {
        "value": "makeDawnBlossomWine",
        "label": "酿造晨露精酿",
        "actionId": "makeDawnBlossomWine",
        "rewards": [
          {
            "itemId": "dawnBlossomWine",
            "count": 1
          }
        ],
        "dependencies": [
          {
            "itemId": "dawnBlossom",
            "count": 4
          },
          {
            "itemId": "honey",
            "count": 1
          },
          {
            "itemId": "glassBottles",
            "count": 1
          }
        ]
      },
      {
        "value": "makeBerryWine",
        "label": "酿造浆果酒",
        "actionId": "makeBerryWine",
        "rewards": [
          {
            "itemId": "berryWine",
            "count": 1
          }
        ],
        "dependencies": [
          {
            "itemId": "glassBottles",
            "count": 1
          }
        ]
      },
      {
        "value": "makeWindBellWine",
        "label": "酿造铃语精酿",
        "actionId": "makeWindBellWine",
        "rewards": [
          {
            "itemId": "windBellWine",
            "count": 1
          }
        ],
        "dependencies": [
          {
            "itemId": "windBellHerb",
            "count": 4
          },
          {
            "itemId": "honey",
            "count": 1
          },
          {
            "itemId": "glassBottles",
            "count": 1
          }
        ]
      }
    ]
  },
  {
    "value": "其他",
    "label": "其他",
    "items": [
      {
        "value": "makeFishSoup",
        "label": "熬制鱼汤",
        "actionId": "makeFishSoup",
        "rewards": [
          {
            "itemId": "fishSoup",
            "count": 1
          },
          {
            "itemId": "mysteryCan",
            "count": 0.05
          }
        ]
      },
      {
        "value": "archaeological",
        "label": "考古挖掘",
        "actionId": "archaeological",
        "rewards": [
          {
            "itemId": "catAntiqueShard",
            "count": 2
          },
          {
            "itemId": "treasureMap",
            "count": 0.8
          },
          {
            "itemId": "catStatue",
            "count": 1
          },
          {
            "itemId": "ancientCatBowl",
            "count": 0.1
          },
          {
            "itemId": "catPawCoin",
            "count": 0.01
          },
          {
            "itemId": "catScroll",
            "count": 0.05
          }
        ]
      },
      {
        "value": "brewMysticalCatnipPotion",
        "label": "炼制猫薄荷药剂",
        "actionId": "brewMysticalCatnipPotion",
        "rewards": [
          {
            "itemId": "catPotion",
            "count": 1
          },
          {
            "itemId": "moonlightBell",
            "count": 0.3
          }
        ],
        "dependencies": [
          {
            "itemId": "catnipGem",
            "count": 1
          },
          {
            "itemId": "mysticalEssence",
            "count": 1
          }
        ]
      },
      {
        "value": "makeWoodPulp",
        "label": "木浆",
        "actionId": "makeWoodPulp",
        "rewards": [
          {
            "itemId": "woodPulp",
            "count": 1
          }
        ]
      },
      {
        "value": "assembleCatRelicMosaic",
        "label": "拼接猫咪文物",
        "actionId": "assembleCatRelicMosaic",
        "rewards": [
          {
            "itemId": "catStatue",
            "count": 1
          },
          {
            "itemId": "moonlightBell",
            "count": 0.3
          }
        ],
        "dependencies": [
          {
            "itemId": "catAntiqueShard",
            "count": 5
          },
          {
            "itemId": "catHairball",
            "count": 20
          }
        ]
      },
      {
        "value": "treasureHunt",
        "label": "寻宝",
        "actionId": "treasureHunt",
        "rewards": [
          {
            "itemId": "catnipGem",
            "count": 1
          },
          {
            "itemId": "mysticalEssence",
            "count": 1
          },
          {
            "itemId": "dreamFeatherBag",
            "count": 0.1
          },
          {
            "itemId": "luckyCatCharm",
            "count": 0.2
          },
          {
            "itemId": "whiskerFeather",
            "count": 0.1
          }
        ],
        "dependencies": [
          {
            "itemId": "treasureMap",
            "count": 1
          }
        ]
      },
      {
        "value": "makeSimpleSalad",
        "label": "制作野草沙拉",
        "actionId": "makeSimpleSalad",
        "rewards": [
          {
            "itemId": "simpleSalad",
            "count": 1
          }
        ],
        "dependencies": [
          {
            "itemId": "herb",
            "count": 1
          }
        ]
      }
    ]
  },
  {
    "value": "森林",
    "label": "森林",
    "items": [
      {
        "value": "dawnBlossom",
        "label": "晨露花",
        "actionId": "dawnBlossom",
        "rewards": [
          {
            "itemId": "dawnBlossom",
            "count": 1
          }
        ]
      },
      {
        "value": "windBellHerb",
        "label": "风铃草",
        "actionId": "windBellHerb",
        "rewards": [
          {
            "itemId": "windBellHerb",
            "count": 1
          }
        ]
      }
    ]
  },
  {
    "value": "特殊物品",
    "label": "特殊物品",
    "items": [
      {
        "value": "sewCashmereToy",
        "label": "缝制毛绒玩具",
        "actionId": "sewCashmereToy",
        "rewards": [
          {
            "itemId": "cashmereToy",
            "count": 1
          }
        ],
        "dependencies": [
          {
            "itemId": "wool",
            "count": 20
          },
          {
            "itemId": "cashmere",
            "count": 8
          },
          {
            "itemId": "plushFur",
            "count": 5
          }
        ]
      },
      {
        "value": "sewSilkCurtain",
        "label": "缝制遮光窗帘",
        "actionId": "sewSilkCurtain",
        "rewards": [
          {
            "itemId": "silkCurtain",
            "count": 1
          }
        ],
        "dependencies": [
          {
            "itemId": "fluffFabric",
            "count": 6
          },
          {
            "itemId": "catPotion",
            "count": 1
          }
        ]
      },
      {
        "value": "sewSilkKittyNest",
        "label": "制作舒适猫窝",
        "actionId": "sewSilkKittyNest",
        "rewards": [
          {
            "itemId": "silkKittyNest",
            "count": 1
          }
        ],
        "dependencies": [
          {
            "itemId": "wool",
            "count": 30
          },
          {
            "itemId": "silkFabric",
            "count": 20
          }
        ]
      }
    ]
  },
  {
    "value": "提炼",
    "label": "提炼",
    "items": [
      {
        "value": "refineMoonlightEssence",
        "label": "提炼月光精华",
        "actionId": "refineMoonlightEssence",
        "rewards": [
          {
            "itemId": "mysticalEssence",
            "count": 1
          },
          {
            "itemId": "catHairball",
            "count": 2.4000000000000004
          }
        ],
        "dependencies": [
          {
            "itemId": "moonlightBell",
            "count": 1
          },
          {
            "itemId": "herb",
            "count": 10
          }
        ]
      }
    ]
  },
  {
    "value": "天空",
    "label": "天空",
    "items": [
      {
        "value": "pickCloudCotton",
        "label": "收集云絮",
        "actionId": "pickCloudCotton",
        "rewards": [
          {
            "itemId": "cloudCotton",
            "count": 1
          }
        ],
        "dependencies": [
          {
            "itemId": "glassBottles",
            "count": 1
          }
        ]
      }
    ]
  },
  {
    "value": "文具",
    "label": "文具",
    "items": [
      {
        "value": "makeBook",
        "label": "封装书",
        "actionId": "makeBook",
        "rewards": [
          {
            "itemId": "book",
            "count": 1
          }
        ],
        "dependencies": [
          {
            "itemId": "paper",
            "count": 10
          }
        ]
      },
      {
        "value": "makePaperByWoodPulp",
        "label": "木浆造纸",
        "actionId": "makePaperByWoodPulp",
        "rewards": [
          {
            "itemId": "paper",
            "count": 1
          }
        ],
        "dependencies": [
          {
            "itemId": "woodPulp",
            "count": 4
          }
        ]
      },
      {
        "value": "makePaper",
        "label": "造纸",
        "actionId": "makePaper",
        "rewards": [
          {
            "itemId": "paper",
            "count": 1
          }
        ]
      },
      {
        "value": "makePencil",
        "label": "制作碳笔",
        "actionId": "makePencil",
        "rewards": [
          {
            "itemId": "pencil",
            "count": 1
          }
        ]
      }
    ]
  },
  {
    "value": "野外",
    "label": "野外",
    "items": [
      {
        "value": "collectHerb",
        "label": "采草药",
        "actionId": "collectHerb",
        "rewards": [
          {
            "itemId": "herb",
            "count": 2
          },
          {
            "itemId": "amberSap",
            "count": 0.08
          },
          {
            "itemId": "luckyCatBox",
            "count": 0.01
          }
        ]
      },
      {
        "value": "collectHoney",
        "label": "采蜂蜜",
        "actionId": "collectHoney",
        "rewards": [
          {
            "itemId": "honey",
            "count": 3
          },
          {
            "itemId": "luckyCatBox",
            "count": 0.01
          }
        ]
      },
      {
        "value": "collectFlower",
        "label": "采集花草",
        "actionId": "collectFlower",
        "rewards": [
          {
            "itemId": "mushroom",
            "count": 0.8
          },
          {
            "itemId": "herb",
            "count": 1.6
          },
          {
            "itemId": "dawnBlossom",
            "count": 0.1
          },
          {
            "itemId": "luminousMoss",
            "count": 0.1
          },
          {
            "itemId": "windBellHerb",
            "count": 0.1
          }
        ]
      }
    ]
  },
  {
    "value": "种植",
    "label": "种植",
    "items": [
      {
        "value": "farming",
        "label": "种植",
        "actionId": "farming",
        "rewards": [
          {
            "itemId": "berry",
            "count": 0.8
          },
          {
            "itemId": "mushroom",
            "count": 0.8
          },
          {
            "itemId": "herb",
            "count": 0.8
          },
          {
            "itemId": "bamboo",
            "count": 0.8
          },
          {
            "itemId": "collectRing",
            "count": 0.01
          }
        ]
      },
      {
        "value": "farmingRye",
        "label": "种植黑麦",
        "actionId": "farmingRye",
        "rewards": [
          {
            "itemId": "rye",
            "count": 1
          }
        ]
      }
    ]
  }
];
