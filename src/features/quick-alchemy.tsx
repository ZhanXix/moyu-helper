/**
 * 快速炼金功能模块
 */

import { render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { logger, toast, ws, dataCache } from '@/core';
import { Modal, FormGroup, Select, Input, Button } from '@/ui/components';
import { analytics, getResourceDetail } from '@/utils';
import ESSENCE_CLASSIFICATION from '../../scripts/monster-essence-classification.json';

interface AlchemyItem {
  id: string;
  level: number;
  requiredCount: number;
}

const ALCHEMY_ITEMS: AlchemyItem[] = [
  { id: 'pure_monster_essence_lv1', level: 1, requiredCount: 32 },
  { id: 'pure_monster_essence_lv2', level: 2, requiredCount: 24 },
  { id: 'pure_monster_essence_lv3', level: 3, requiredCount: 12 },
  { id: 'pure_monster_essence_lv4', level: 4, requiredCount: 4 },
];

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
  async quickAlchemy(itemId: string, materialId: string, times: number): Promise<void> {
    try {
      const item = ALCHEMY_ITEMS.find((i) => i.id === itemId);
      if (!item) {
        toast.error('未找到炼金配方');
        return;
      }

      if (!materialId) {
        toast.error('请选择材料');
        return;
      }

      // 构建炼金参数
      const alchemyData = {
        input: {
          mysticalEssence: {
            count: 5,
          },
          [materialId]: {
            count: item.requiredCount,
          },
        },
        times,
      };

      toast.info(`正在提交炼金任务 ${getCachedResourceName(item.id)} x${times}...`);

      // 发送炼金请求
      await ws.sendAndListen('alchemy:auto:create', alchemyData, 'alchemy:auto:create:success', 30000);

      toast.success(`✅ 炼金任务提交成功！`);
      analytics.track('炼金', 'quick-alchemy-success', `${getCachedResourceName(item.id)} x${times}`);
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
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [times, setTimes] = useState(1);
  const [itemOptions, setItemOptions] = useState<{ value: string; label: string }[]>([]);
  const [materialOptions, setMaterialOptions] = useState<{ value: string; label: string }[]>([]);
  const [materialPreview, setMaterialPreview] = useState<{
    mysticalEssence: { name: string; required: number; available: number };
    material: { name: string; required: number; available: number };
  } | null>(null);

  useEffect(() => {
    const loadInventory = async () => {
      const inventory = await dataCache.getAsync('inventory', true);
      const options = ALCHEMY_ITEMS.map((item) => {
        const count = inventory[item.id]?.count || 0;
        const name = getCachedResourceName(item.id);
        return {
          value: item.id,
          label: `${name} (库存: ${count})`,
        };
      });
      setItemOptions(options);
    };
    loadInventory();
  }, []);

  useEffect(() => {
    const updateMaterials = async () => {
      if (!selectedItem) {
        setMaterialOptions([]);
        setSelectedMaterial('');
        setMaterialPreview(null);
        return;
      }

      const item = ALCHEMY_ITEMS.find((i) => i.id === selectedItem);
      if (!item) return;

      const essenceKey = `monster_essence_lv${item.level}` as keyof typeof ESSENCE_CLASSIFICATION;
      const materials = ESSENCE_CLASSIFICATION[essenceKey];
      if (!materials || materials.length === 0) return;

      const inventory = await dataCache.getAsync('inventory', true);
      const options = materials
        .map((id) => {
          const count = inventory[id]?.count || 0;
          const name = getCachedResourceName(id);
          return {
            value: id,
            label: `${name} (库存: ${count})`,
            count,
          };
        })
        .sort((a, b) => b.count - a.count);
      setMaterialOptions(options);

      // 默认选择库存最多的
      let maxId = '';
      let maxCount = 0;
      for (const id of materials) {
        const count = inventory[id]?.count || 0;
        if (count > maxCount) {
          maxCount = count;
          maxId = id;
        }
      }
      setSelectedMaterial(maxId);
    };

    updateMaterials();
  }, [selectedItem]);

  useEffect(() => {
    const updatePreview = async () => {
      if (!selectedItem || !selectedMaterial) {
        setMaterialPreview(null);
        return;
      }

      const item = ALCHEMY_ITEMS.find((i) => i.id === selectedItem);
      if (!item) return;

      const inventory = await dataCache.getAsync('inventory', true);
      const materialCount = inventory[selectedMaterial]?.count || 0;
      const mysticalCount = inventory['mysticalEssence']?.count || 0;

      setMaterialPreview({
        mysticalEssence: {
          name: getCachedResourceName('mysticalEssence'),
          required: 5 * times,
          available: mysticalCount,
        },
        material: {
          name: getCachedResourceName(selectedMaterial),
          required: item.requiredCount * times,
          available: materialCount,
        },
      });
    };

    updatePreview();
  }, [selectedItem, selectedMaterial, times]);

  const handleQuickAdd = (value: number) => {
    setTimes((prev) => prev + value);
  };

  const handleAlchemy = async () => {
    if (!selectedItem) {
      toast.warning('请先选择要炼金的物品');
      return;
    }
    if (!selectedMaterial) {
      toast.warning('请先选择材料');
      return;
    }
    if (times < 1) {
      toast.warning('次数必须大于0');
      return;
    }
    onClose();
    await alchemyManager.quickAlchemy(selectedItem, selectedMaterial, times);
  };

  return (
    <>
      <div
        style={{
          padding: '12px',
          backgroundColor: '#f0f9ff',
          borderRadius: '6px',
          marginBottom: '16px',
          fontSize: '13px',
          lineHeight: '1.6',
          color: '#0369a1',
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>💡 功能说明</div>
        <div>
          • 选择要炼金的物品后，系统会自动加载对应等级的魔物精华
        </div>
        <div>• 默认选择库存最多的材料，也可手动切换</div>
        <div>• 材料需求：Lv1(32个) / Lv2(24个) / Lv3(12个) / Lv4(4个) + 神秘精华(5个)</div>
      </div>

      <FormGroup label="选择物品">
        <Select value={selectedItem} onChange={setSelectedItem} options={itemOptions} placeholder="-- 请选择物品 --" />
      </FormGroup>

      {materialOptions.length > 0 && (
        <FormGroup label="选择材料">
          <Select value={selectedMaterial} onChange={setSelectedMaterial} options={materialOptions} placeholder="-- 请选择材料 --" />
        </FormGroup>
      )}

      <FormGroup label="炼金次数">
        <Input type="number" value={times} onChange={(v) => setTimes(parseInt(v) || 1)} min={1} step={1} />
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          {[5, 10, 100, 1000].map((value) => (
            <Button
              key={value}
              variant="secondary"
              onClick={() => handleQuickAdd(value)}
              style={{ flex: 1, padding: '6px 12px', fontSize: '12px' }}
            >
              +{value}
            </Button>
          ))}
        </div>
      </FormGroup>

      {materialPreview && (
        <div
          style={{
            padding: '12px',
            backgroundColor: '#fef3c7',
            borderRadius: '6px',
            marginBottom: '16px',
            fontSize: '13px',
            lineHeight: '1.6',
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>📦 材料预览</div>
          <div
            style={{
              color:
                materialPreview.mysticalEssence.required > materialPreview.mysticalEssence.available ? '#dc2626' : '#059669',
            }}
          >
            • {materialPreview.mysticalEssence.name}: {materialPreview.mysticalEssence.required} 个 (库存:{' '}
            {materialPreview.mysticalEssence.available})
          </div>
          <div
            style={{
              color: materialPreview.material.required > materialPreview.material.available ? '#dc2626' : '#059669',
            }}
          >
            • {materialPreview.material.name}: {materialPreview.material.required} 个 (库存:{' '}
            {materialPreview.material.available})
          </div>
        </div>
      )}

      <Button onClick={handleAlchemy}>开始炼金</Button>
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
