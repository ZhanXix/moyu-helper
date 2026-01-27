/**
 * WebSocket 消息类型定义
 */
export interface WebSocketMessage {
  event: string;
  payload: any;
}

/**
 * WebSocket 事件处理器类型
 */
export type WebSocketEventHandler = (data: WebSocketMessage) => void;

/**
 * WebSocket 用户信息类型
 */
export interface WSUserInfo {
  name: string;
  [key: string]: any;
}
