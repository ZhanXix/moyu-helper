/**
 * 快速炼金功能模块
 */

import { render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { logger, toast, ws, dataCache } from '@/core';
import { Modal, Card, FormGroup, Select, Input, Button } from '@/ui/components';
import { analytics, getResourceDetail } from '@/utils';
import ESSENCE_CLASSIFICATION from '@/config/monster-essence-classification.json';
import { ALCHEMY_RECIPES, ESSENCE_LEVEL_MAP, TAG_RESOURCE_MAP } from '@/config/alchemy-recipes';

interface RecipeInput {
  [key: string]: { count: number };
}

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
  async quickAlchemy(recipeId: string, inputs: RecipeInput, times: number): Promise<void> {
    try {
      const alchemyData = {
        input: inputs,
        times,
      };

      toast.info(`正在提交炼金任务 ${getCachedResourceName(recipeId)} x${times}...`);
      await ws.sendAndListen('alchemy:auto:create', alchemyData, 30000);
      toast.success(`✅ 炼金任务提交成功！`);
      analytics.track('炼金', 'quick_alchemy_success', `${getCachedResourceName(recipeId)} x${times}`);
    } catch (error: any) {
      logger.error('炼金失败', error);
      const errorMsg = error?.payload?.data?.msg || '炼金任务提交失败';
      toast.error(errorMsg);
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

    await alchemyManager.quickAlchemy(selectedRecipe, finalInputs, times);
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
