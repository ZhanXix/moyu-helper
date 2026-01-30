/**
 * 快速炼金功能模块
 */

import { render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { logger, toast, ws, dataCache } from '@/core';
import { Modal, Card, FormGroup, Select, Input, Button } from '@/ui/components';
import { analytics, getResourceDetail } from '@/utils';
import ESSENCE_CLASSIFICATION from '@/config/monster-essence-classification.json';

interface RecipeInput {
  [key: string]: { count: number };
}

interface AlchemyRecipe {
  id: string;
  name: string;
  recipes: Array<{
    recipeIndex: number;
    inputs: RecipeInput;
    description?: string;
  }>;
  category: 'essence' | 'potion';
}

const ALCHEMY_RECIPES: AlchemyRecipe[] = [
  // 战力精华系列
  {
    id: 'pure_monster_essence_lv1',
    name: '战力精华Lv1',
    recipes: [{ recipeIndex: 0, inputs: { '(monster_essence_lv1)': { count: 32 }, mysticalEssence: { count: 5 } } }],
    category: 'essence',
  },
  {
    id: 'pure_monster_essence_lv2',
    name: '战力精华Lv2',
    recipes: [{ recipeIndex: 0, inputs: { '(monster_essence_lv2)': { count: 24 }, mysticalEssence: { count: 5 } } }],
    category: 'essence',
  },
  {
    id: 'pure_monster_essence_lv3',
    name: '战力精华Lv3',
    recipes: [{ recipeIndex: 0, inputs: { '(monster_essence_lv3)': { count: 12 }, mysticalEssence: { count: 5 } } }],
    category: 'essence',
  },
  {
    id: 'pure_monster_essence_lv4',
    name: '战力精华Lv4',
    recipes: [{ recipeIndex: 0, inputs: { '(monster_essence_lv4)': { count: 4 }, mysticalEssence: { count: 5 } } }],
    category: 'essence',
  },
  // 专精精华系列
  {
    id: 'sewingEssence',
    name: '织物精华',
    recipes: [
      { recipeIndex: 0, inputs: { catHairball: { count: 10 }, wool: { count: 33 } }, description: '猫毛球+羊毛' },
      { recipeIndex: 1, inputs: { catHairball: { count: 10 }, cashmere: { count: 1 } }, description: '猫毛球+羊绒' },
      { recipeIndex: 2, inputs: { catHairball: { count: 10 }, silk: { count: 33 } }, description: '猫毛球+蚕丝' },
      { recipeIndex: 3, inputs: { catHairball: { count: 10 }, silkFabric: { count: 1 } }, description: '猫毛球+丝绸' },
      { recipeIndex: 4, inputs: { catHairball: { count: 10 }, fluff: { count: 12 } }, description: '猫毛球+绒毛' },
      { recipeIndex: 5, inputs: { catHairball: { count: 10 }, fluffFabric: { count: 1 } }, description: '猫毛球+绒布' },
    ],
    category: 'essence',
  },
  {
    id: 'knowledgeEssence',
    name: '知识精华',
    recipes: [
      {
        recipeIndex: 0,
        inputs: { '(lv1SkillBook)': { count: 150 }, magicScroll: { count: 1 } },
        description: 'Lv1技能书',
      },
      {
        recipeIndex: 1,
        inputs: { '(lv2SkillBook)': { count: 75 }, magicScroll: { count: 1 } },
        description: 'Lv2技能书',
      },
      {
        recipeIndex: 2,
        inputs: { '(lv3SkillBook)': { count: 50 }, magicScroll: { count: 1 } },
        description: 'Lv3技能书',
      },
      {
        recipeIndex: 3,
        inputs: { '(lv4SkillBook)': { count: 25 }, magicScroll: { count: 1 } },
        description: 'Lv4技能书',
      },
    ],
    category: 'essence',
  },
  {
    id: 'nutrientEssence',
    name: '营养精华',
    recipes: [
      { recipeIndex: 0, inputs: { '(lv1Food)': { count: 100 } }, description: 'Lv1食物' },
      { recipeIndex: 1, inputs: { '(lv2Food)': { count: 50 } }, description: 'Lv2食物' },
      { recipeIndex: 2, inputs: { '(lv3Food)': { count: 25 } }, description: 'Lv3食物' },
      { recipeIndex: 3, inputs: { '(lv4Food)': { count: 10 } }, description: 'Lv4食物' },
    ],
    category: 'essence',
  },
  {
    id: 'craftingEssence',
    name: '矿物精华',
    recipes: [
      { recipeIndex: 0, inputs: { iron: { count: 10 }, steel: { count: 10 } }, description: '铁+钢' },
      { recipeIndex: 1, inputs: { iron: { count: 10 }, silverOre: { count: 33 } }, description: '铁+银矿' },
      { recipeIndex: 2, inputs: { iron: { count: 10 }, silverIngot: { count: 10 } }, description: '铁+银锭' },
      { recipeIndex: 3, inputs: { iron: { count: 10 }, mithrilOre: { count: 33 } }, description: '铁+秘银矿' },
      { recipeIndex: 4, inputs: { iron: { count: 10 }, mithrilIngot: { count: 10 } }, description: '铁+秘银锭' },
      { recipeIndex: 5, inputs: { iron: { count: 10 }, fishscaleMineral: { count: 35 } }, description: '铁+鱼鳞矿' },
      {
        recipeIndex: 6,
        inputs: { iron: { count: 10 }, fishscaleMineralIgnot: { count: 6 } },
        description: '铁+鱼鳞锭',
      },
      { recipeIndex: 7, inputs: { iron: { count: 10 }, shadowSteel: { count: 4 } }, description: '铁+暗影钢' },
    ],
    category: 'essence',
  },
  // 药水系列
  {
    id: 'manaPotion',
    name: '魔力药水',
    recipes: [
      { recipeIndex: 0, inputs: { berry: { count: 10 }, honey: { count: 1 }, '(glass,container)': { count: 1 } } },
    ],
    category: 'potion',
  },
  {
    id: 'monoPolarElixir',
    name: '单极药剂',
    recipes: [
      {
        recipeIndex: 0,
        inputs: {
          slimeGel: { count: 5 },
          slimeCore: { count: 3 },
          honey: { count: 2 },
          '(glass,container)': { count: 1 },
        },
        description: '史莱姆凝胶+蜂蜜',
      },
      {
        recipeIndex: 1,
        inputs: {
          '(slime)': { count: 5 },
          slimeCore: { count: 3 },
          '(liquid)': { count: 2 },
          '(glass,container)': { count: 1 },
        },
        description: '史莱姆+液体',
      },
    ],
    category: 'potion',
  },
  {
    id: 'magicalMonoPolarElixir',
    name: '魔法单极药剂',
    recipes: [
      {
        recipeIndex: 0,
        inputs: { magicalElixir: { count: 1 }, '(slime)': { count: 1 }, monoPolarElixir: { count: 1 } },
      },
    ],
    category: 'potion',
  },
];

const ESSENCE_LEVEL_MAP: Record<string, number> = {
  pure_monster_essence_lv1: 1,
  pure_monster_essence_lv2: 2,
  pure_monster_essence_lv3: 3,
  pure_monster_essence_lv4: 4,
};

// 特殊标签对应的资源映射
const TAG_RESOURCE_MAP: Record<string, string[]> = {
  '(glass,container)': ['glassBottles'],
  '(slime)': ['slimeGel', 'iceGel'],
  '(liquid)': [
    'honey',
    'amberSap',
    'milk',
    'fishSoup',
    'mushroomStew',
    'berryWine',
    'dawnBlossomWine',
    'windBellWine',
    'battleKnowledgeCocktail',
    'milkManaShake',
    'windBellMilkShake',
    'grapeMilkManaShake',
    'grapeWindBellMilkShake',
    'healingPotion',
    'manaPotion',
    'hasteElixir',
    'monoPolarElixir',
    'healingPotion_2',
    'swiftElixir',
    'magicalElixir',
    'cognitionStrikeElixir',
    'swiftMonoPolarElixir',
    'magicalMonoPolarElixir',
    'breezeElixir',
    'slimeGel',
    'iceGel',
  ],
  '(lv1SkillBook)': [
    'boneShieldSkillBook',
    'baseHealSkillBook',
    'poisonSkillBook',
    'doubleStrikeSkillBook',
    'freezeSkillBook',
    'iceBombSkillBook',
    'ironWallSkillBook',
    'curseSkillBook',
    'bindSkillBook',
    'confuseSkillBook',
  ],
  '(lv2SkillBook)': [
    'corrosiveBreathSkillBook',
    'summonBerryBirdSkillBook',
    'selfHealSkillBook',
    'sweepSkillBook',
    'baseGroupHealSkillBook',
    'powerStrikeSkillBook',
    'lowestHpStrikeSkillBook',
    'explosiveShotSkillBook',
    'lifeDrainSkillBook',
    'roarSkillBook',
    'groupCurseSkillBook',
    'holyLightSkillBook',
    'blessSkillBook',
    'groupRegenSkillBook',
    'astralBarrierSkillBook',
    'astralBlastSkillBook',
    'selfRepairSkillBook',
    'cleanseSkillBook',
    'cometStrikeSkillBook',
    'armorBreakSkillBook',
    'starTrapSkillBook',
    'ambushSkillBook',
    'poisonClawSkillBook',
    'shadowStepSkillBook',
    'silenceStrikeSkillBook',
    'slientSmokeScreenSkillBook',
    'stardustMouseSwapSkillBook',
    'dizzySpinSkillBook',
    'carouselOverdriveSkillBook',
    'candyBombSkillBook',
    'prankSmokeSkillBook',
    'starlightSanctuarySkillBook',
    'sealMagicSkillBook',
    'banishSkillBook',
  ],
  '(lv3SkillBook)': [
    'groupShieldSkillBook',
    'guardianLaserSkillBook',
    'lavaBreathSkillBook',
    'dragonRoarSkillBook',
    'blizzardSkillBook',
    'shadowBurstSkillBook',
    'reviveSkillBook',
    'groupSilenceSkillBook',
    'astralStormSkillBook',
    'mirrorImageSkillBook',
    'shadowAssassinUltSkillBook',
    'mercenaryTauntSkillBook',
    'plushTauntSkillBook',
    'ghostlyStrikeSkillBook',
    'paradeHornSkillBook',
    'clownSummonSkillBook',
    'kingAegisSkillBook',
    'detectMagicSkillBook',
    'punishSkillBook',
    'forbiddenMagicSkillBook',
  ],
  '(lv4SkillBook)': [
    'threadingNeedleSkillBook',
    'natureGiftSkillBook',
    'knowledgeInspirationSkillBook',
    'sowMelonsReapMelonsSkillBook',
    'enhanceEmpowerSkillBook',
    'enhanceStrikeSkillBook',
    'fishmanSkillSkillBook',
    'forgeSkillCraftTurretSkillBook',
    'forgeSkillCraftMeowColossusSkillBook',
    'chefSkillSkillBook',
    'beastpackRoarSkillBook',
  ],
  '(lv1Food)': ['mushroom', 'berry', 'honey', 'fish'],
  '(lv2Food)': [
    'simpleSalad',
    'wildFruitMix',
    'fishSoup',
    'berryPie',
    'mushroomStew',
    'catMint',
    'catSnack',
    'ryeBread',
    'ryeEnergyBar',
  ],
  '(lv3Food)': [
    'luxuryCatFood',
    'sashimiPlatter',
    'custardPudding',
    'luckyMint',
    'luckySashimiPlatter',
    'ryeEggPancake',
    'moltenRyeEggTart',
    'cloudFluffCandy',
    'milkManaShake',
    'windBellMilkShake',
    'grapeMilkManaShake',
    'grapeWindBellMilkShake',
    'cannedTuna',
    'cannedShrimp',
    'cannedRainbowFish',
    'cannedMysticalKoi',
    'collectingTart',
    'fishingTart',
    'miningTart',
    'manufactureAndForgingTart',
    'collectingTartLv2',
    'fishingTartLv2',
    'miningTartLv2',
    'manufactureAndForgingTartLv2',
  ],
  '(lv4Food)': [
    'superLuckyBerryPie',
    'superLuckyMushroomStew',
    'cannedCrystalCarpTuna',
    'cannedCrystalCarpShrimp',
    'cannedCrystalCarpRainbowFish',
    'cannedCrystalCarpMysticalKoi',
    'farmingAnimalTart',
    'sewingTart',
    'cookingTart',
    'knowledgeTart',
    'exploreTart',
    'farmingAnimalTartLv2',
    'sewingTartLv2',
    'cookingTartLv2',
    'knowledgeTartLv2',
    'exploreTartLv2',
  ],
  '(monster_essence_lv1)': [
    'slimeGel',
    'slimeCore',
    'goblinEar',
    'goblinDagger',
    'batWing',
    'batTooth',
    'wolfFang',
    'wolfPelt',
    'skeletonBone',
    'skeletonShield',
    'lizardScale',
    'lizardTail',
    'trollHide',
    'scorpionStinger',
    'scorpionCarapace',
    'iceGel',
    'snowWolfFur',
    'iceBomb',
    'iceBatWing',
    'snowRabbitFur',
    'shadowFur',
    'ironPawArmor',
    'phantomWhisker',
    'toxicFur',
    'smokeBall',
  ],
  '(monster_essence_lv2)': [
    'toxicSpore',
    'mushroomCap',
    'spiritEssence',
    'ectoplasm',
    'trollClub',
    'guardianCore',
    'ancientGear',
    'frostCrystal',
    'frostDagger',
    'frostEssence',
    'snowBeastHide',
    'catShadowGem',
    'golemCore',
    'witchHat',
    'abyssalCloak',
    'starEssence',
    'starShard',
    'trapParts',
    'starDust',
    'nightEyeGem',
    'whiskerCharm',
    'shadowCape',
    'candyBomb',
    'plushFur',
    'sealBell',
    'tomeFragment',
    'memoryPage',
    'rusted_chain_link',
    'soul_energy_shard',
    'dark_sigil_fragment',
    'faded_remnant',
    'loose_gear_piece',
  ],
  '(monster_essence_lv3)': [
    'lavaHeart',
    'dragonScale',
    'snowBeastFang',
    'curseWing',
    'shadowOrb',
    'starRelic',
    'rareClaw',
    'ghostEssence',
    'owlFeather',
    'darkCrystal',
    'royal_claw_fragment',
    'phantom_minor_core',
    'br1_onyx_shield_shard',
    'wd1_wardens_verdict',
    'wd1_oathbound_link',
    'ma1_tremor_fur',
    'ec1_echoing_stone',
    'ec1_resonance_lattice',
    'rg1_riftclaw_talon',
    'sw1_hushwoven_thread',
    'nb1_duskshade_whisker',
    'nb1_shadow_pounce_band',
    'ha1_hexstring_bowstring',
    'ha1_binding_arrowhead',
    'vc1_void_ichor',
    'mk1_mirror_etched_shard',
    'mk1_inverted_step_lace',
    'qn_chorus_veil',
    'hb_faceless_membrane',
    'hb_paradox_core',
    'oc_xuansteel_slab',
  ],
  '(monster_essence_lv4)': [
    'frostCrown',
    'ancestorCrown',
    'starCrown',
    'paradeCape',
    'empressCloak',
    'loadOfamusementPark',
    'knowledgeCrown',
    'libraryKingBadge',
    'domination_seal',
    'overloadCrown',
    'qn_echo_diadem',
    'kg_nocturne_scepter_grip',
    'kg_obsidian_crown_shard',
    'hb_null_signature',
    'oc_fortress_heart',
  ],
};

// 名称缓存
const nameCache = new Map<string, string>();

function getCachedResourceName(id: string): string {
  if (!nameCache.has(id)) {
    nameCache.set(id, getResourceDetail(id)?.name || id);
  }
  return nameCache.get(id)!;
}

// ==================== 炼金管理器 ====================

class AlchemyManager {
  async quickAlchemy(recipeId: string, recipeIndex: number, inputs: RecipeInput, times: number): Promise<void> {
    try {
      const alchemyData = {
        input: inputs,
        times,
      };

      toast.info(`正在提交炼金任务 ${getCachedResourceName(recipeId)} x${times}...`);
      await ws.sendAndListen('alchemy:auto:create', alchemyData, 30000);
      toast.success(`✅ 炼金任务提交成功！`);
      analytics.track('炼金', 'quick_alchemy_success', `${getCachedResourceName(recipeId)} x${times}`);
    } catch (error) {
      logger.error('炼金失败', error);
      toast.error('炼金任务提交失败');
    }
  }
}

export const alchemyManager = new AlchemyManager();

// ==================== 炼金面板 ====================

interface AlchemyPanelProps {
  onClose: () => void;
}

function AlchemyPanelContent({ onClose }: AlchemyPanelProps) {
  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [times, setTimes] = useState(1);
  const [recipeOptions, setRecipeOptions] = useState<{ value: string; label: string }[]>([]);
  const [materialOptions, setMaterialOptions] = useState<{ value: string; label: string }[]>([]);
  const [tagSelections, setTagSelections] = useState<Record<string, string>>({});
  const [tagOptions, setTagOptions] = useState<Record<string, { value: string; label: string }[]>>({});
  const [materialPreview, setMaterialPreview] = useState<Array<{
    name: string;
    required: number;
    available: number;
  }> | null>(null);

  useEffect(() => {
    const loadInventory = async () => {
      const inventory = await dataCache.getAsync('inventory', true);
      const options = ALCHEMY_RECIPES.map((recipe) => {
        const count = inventory[recipe.id]?.count || 0;
        const categoryLabel = recipe.category === 'essence' ? '精华' : '药水';
        return {
          value: recipe.id,
          label: `[${categoryLabel}] ${recipe.name} (库存: ${count})`,
        };
      });
      setRecipeOptions(options);
    };
    loadInventory();
  }, []);

  useEffect(() => {
    const updateMaterials = async () => {
      if (!selectedRecipe) {
        setMaterialOptions([]);
        setSelectedMaterial('');
        setTagSelections({});
        setTagOptions({});
        setMaterialPreview(null);
        return;
      }

      const inventory = await dataCache.getAsync('inventory', true);
      const recipe = ALCHEMY_RECIPES.find((r) => r.id === selectedRecipe);

      // 初始化标签选择和选项
      if (recipe) {
        const currentRecipe = recipe.recipes[selectedRecipeIndex];
        const newTagSelections: Record<string, string> = {};
        const newTagOptions: Record<string, { value: string; label: string }[]> = {};

        for (const materialId of Object.keys(currentRecipe.inputs)) {
          if (TAG_RESOURCE_MAP[materialId]) {
            const resources = TAG_RESOURCE_MAP[materialId];
            const opts = resources
              .map((id) => ({
                id,
                count: inventory[id]?.count || 0,
                label: `${getCachedResourceName(id)} (库存: ${inventory[id]?.count || 0})`,
              }))
              .sort((a, b) => b.count - a.count);

            newTagOptions[materialId] = opts.map((o) => ({ value: o.id, label: o.label }));
            newTagSelections[materialId] = opts[0]?.id || resources[0];
          } else if (materialId.startsWith('(monster_essence_lv')) {
            const level = ESSENCE_LEVEL_MAP[selectedRecipe];
            if (level) {
              const essenceKey = `monster_essence_lv${level}` as keyof typeof ESSENCE_CLASSIFICATION;
              const materials = ESSENCE_CLASSIFICATION[essenceKey];
              if (materials && materials.length > 0) {
                const options = materials
                  .map((id) => {
                    const count = inventory[id]?.count || 0;
                    const name = getCachedResourceName(id);
                    return { value: id, label: `${name} (库存: ${count})`, count };
                  })
                  .sort((a, b) => b.count - a.count);
                setMaterialOptions(options);
                setSelectedMaterial(options[0]?.value || '');
              }
            }
          }
        }
        setTagSelections(newTagSelections);
        setTagOptions(newTagOptions);
      }
    };

    updateMaterials();
  }, [selectedRecipe, selectedRecipeIndex]);

  useEffect(() => {
    const updatePreview = async () => {
      if (!selectedRecipe) {
        setMaterialPreview(null);
        return;
      }

      const recipe = ALCHEMY_RECIPES.find((r) => r.id === selectedRecipe);
      if (!recipe) return;

      const currentRecipe = recipe.recipes[selectedRecipeIndex];
      const inventory = await dataCache.getAsync('inventory', true);

      const preview: Array<{ name: string; required: number; available: number }> = [];

      for (const [materialId, { count }] of Object.entries(currentRecipe.inputs)) {
        if (TAG_RESOURCE_MAP[materialId]) {
          const selectedResource = tagSelections[materialId];
          if (selectedResource) {
            preview.push({
              name: getCachedResourceName(selectedResource),
              required: count * times,
              available: inventory[selectedResource]?.count || 0,
            });
          }
        } else if (materialId.startsWith('(monster_essence_lv')) {
          if (selectedMaterial) {
            preview.push({
              name: getCachedResourceName(selectedMaterial),
              required: count * times,
              available: inventory[selectedMaterial]?.count || 0,
            });
          }
        } else {
          preview.push({
            name: getCachedResourceName(materialId),
            required: count * times,
            available: inventory[materialId]?.count || 0,
          });
        }
      }

      setMaterialPreview(preview);
    };

    updatePreview();
  }, [selectedRecipe, selectedRecipeIndex, selectedMaterial, tagSelections, times]);

  const handleSubmit = async () => {
    if (!selectedRecipe) {
      toast.warning('请选择配方');
      return;
    }

    const recipe = ALCHEMY_RECIPES.find((r) => r.id === selectedRecipe);
    if (!recipe) return;

    const currentRecipe = recipe.recipes[selectedRecipeIndex];
    const finalInputs: RecipeInput = {};

    for (const [materialId, { count }] of Object.entries(currentRecipe.inputs)) {
      if (TAG_RESOURCE_MAP[materialId]) {
        const selectedResource = tagSelections[materialId];
        if (!selectedResource) {
          toast.warning(`请选择 ${materialId} 的材料`);
          return;
        }
        finalInputs[selectedResource] = { count };
      } else if (materialId.startsWith('(monster_essence_lv')) {
        if (!selectedMaterial) {
          toast.warning('请选择怪物精华');
          return;
        }
        finalInputs[selectedMaterial] = { count };
      } else {
        finalInputs[materialId] = { count };
      }
    }

    await alchemyManager.quickAlchemy(selectedRecipe, currentRecipe.recipeIndex, finalInputs, times);
  };

  const selectedRecipeData = ALCHEMY_RECIPES.find((r) => r.id === selectedRecipe);

  return (
    <>
      <FormGroup label="选择配方">
        <Select
          value={selectedRecipe}
          onChange={(value) => {
            setSelectedRecipe(value);
            setSelectedRecipeIndex(0);
          }}
          options={recipeOptions}
          placeholder="-- 请选择配方 --"
        />
      </FormGroup>

      {selectedRecipeData && selectedRecipeData.recipes.length > 1 && (
        <FormGroup label="配方选项">
          <Select
            value={String(selectedRecipeIndex)}
            onChange={(value) => setSelectedRecipeIndex(Number(value))}
            options={selectedRecipeData.recipes.map((r, idx) => ({
              value: String(idx),
              label: r.description || `配方 ${idx + 1}`,
            }))}
          />
        </FormGroup>
      )}

      {materialOptions.length > 0 && (
        <FormGroup label="选择怪物精华">
          <Select value={selectedMaterial} onChange={(value) => setSelectedMaterial(value)} options={materialOptions} />
        </FormGroup>
      )}

      {Object.entries(tagOptions).map(([tag, options]) => (
        <FormGroup key={tag} label={`选择 ${tag}`}>
          <Select
            value={tagSelections[tag] || ''}
            onChange={(value) => setTagSelections({ ...tagSelections, [tag]: value })}
            options={options}
          />
        </FormGroup>
      ))}

      <FormGroup label="制作次数">
        <Input
          type="number"
          value={times}
          onChange={(value) => setTimes(Math.min(1000, Number(value)))}
          min={1}
          max={1000}
        />
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          {[10, 100, 1000].map((value) => (
            <Button
              key={value}
              variant="secondary"
              onClick={() => setTimes((prev) => Math.min(1000, prev + value))}
              style={{ flex: 1, padding: '6px 12px', fontSize: '12px' }}
            >
              +{value}
            </Button>
          ))}
        </div>
      </FormGroup>

      {materialPreview && (
        <Card title="材料预览" style={{ minHeight: '60px' }}>
          <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
            {materialPreview.map((item, idx) => (
              <div key={idx} style={{ color: item.available >= item.required ? '#52c41a' : '#ff4d4f' }}>
                {item.name}: {item.required} / {item.available}
              </div>
            ))}
          </div>
        </Card>
      )}

      <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
        <Button variant="secondary" onClick={onClose} style={{ flex: 1 }}>
          取消
        </Button>
        <Button onClick={handleSubmit} style={{ flex: 1 }}>
          提交
        </Button>
      </div>
    </>
  );
}

export class AlchemyPanel {
  private container: HTMLDivElement | null = null;
  private isOpen = false;

  show(): void {
    if (this.isOpen) return;
    this.isOpen = true;

    if (!this.container) {
      this.container = document.createElement('div');
      document.body.appendChild(this.container);
    }

    render(
      <Modal isOpen={true} onClose={() => this.hide()} title="⚗️ 快速炼金">
        <AlchemyPanelContent onClose={() => this.hide()} />
      </Modal>,
      this.container,
    );
  }

  hide(): void {
    if (!this.isOpen) return;
    this.isOpen = false;

    if (this.container) {
      render(null, this.container);
    }
  }
}
