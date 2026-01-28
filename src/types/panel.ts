/**
 * 面板按钮类型定义
 */
export interface PanelButton {
  text: string;
  onClick: () => void;
  order?: number;
}
