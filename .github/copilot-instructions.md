# AI 编码助手指南 - 摸鱼放置游戏辅助脚本

## 项目概述

这是一个基于 TypeScript 的 Tampermonkey (油猴) 脚本项目，为网页游戏"摸鱼放置"提供自动化功能。使用 **Vite + vite-plugin-monkey** 构建，运行于浏览器环境，通过 WebSocket 与游戏服务端通信。

## 核心架构

### 模块组织（严格分层）

```
src/
├── config/            # 配置层：统一管理所有默认配置和存储键
├── core/              # 基础设施层：日志、消息提示、WebSocket 拦截
├── features/          # 功能模块层：任务、物品、工具栏、资源监控
├── ui/                # UI 层：悬浮面板、设置面板
├── utils/             # 工具层：任务队列、DOM 操作、资源工具
└── types/             # 类型定义
```

**依赖规则：** features → core/utils/config，ui → types/core/config，避免反向依赖。

### WebSocket 拦截机制

- `core/websocket.ts` 包装原生 WebSocket，拦截所有游戏消息
- 通过 `ws.on(event, handler)` 监听特定事件（支持数组批量监听）
- 自动处理二进制消息（pako gzip 压缩）
- `ws.send(method, data)` 发送消息到服务端，内部自动排队等待用户信息初始化

**关键点：** 用户信息 (`userInfo`) 必须先从 WebSocket 获取才能发送消息，否则消息进入待发送队列。

### 任务队列系统

`utils/task-queue.ts` 防止短时间内大量操作触发游戏反作弊：

- **批次控制：** 每 20 个任务后自动暂停 10 秒（可配置）
- **倒计时通知：** 使用 `toast.progress()` 显示等待进度
- **自动重置：** 10 秒无操作后重置计数器

**用法示例：**

```typescript
taskQueue.add(() => {
  // 执行单个操作，队列自动管理间隔和批次
});
```

## 开发规范

### Git Commit 规范

**格式：** `type(scope): 简短描述`

**要求：描述使用中文，保持简洁**

类型（type）：

- `feat` - 新功能
- `fix` - Bug 修复
- `perf` - 性能优化
- `refactor` - 代码重构
- `docs` - 文档更新
- `build` - 构建配置
- `style` - 代码格式

模块（scope）：`quest`/`item`/`toolbar`/`resource`/`ui`/`core`/`utils`

示例：

```
feat(quest): 支持任务自动重试
fix(websocket): 修复消息队列死锁问题
perf(ui): 优化悬浮面板动画流畅度
```

### 命名规则

- **文件名：** kebab-case (`quest.ts`, `floating-panel.ts`)
- **类名：** PascalCase (`QuestManager`, `FloatingPanel`)
- **变量/函数：** camelCase (`questManager`, `refreshCards`)

### 日志系统

使用 `logger` 单例，自动添加 emoji 和颜色：

```typescript
import { logger } from '@/core';
logger.info('信息'); // ℹ️ 蓝色
logger.success('成功'); // ✅ 绿色
logger.error('错误'); // ❌ 红色
```

### Toast 通知

```typescript
import { toast } from '@/core';
toast.success('操作完成');
const progress = toast.progress('处理中...');
progress.update('更新进度');
progress.hide();
```

## 关键工作流

### 开发和构建

```bash
yarn dev      # 启动 Vite 开发服务器（热重载）
yarn build    # 生成 dist/*.user.js 油猴脚本
```

**调试：** 开发模式会在控制台显示详细日志，直接在浏览器刷新页面即可看到更改。

### 添加新功能模块

1. 在 `src/features/` 创建 `新功能.ts`
2. 导出单例对象（如 `export const xxxManager = new XxxManager()`）
3. 在 `src/features/index.ts` 中导出
4. 在 `src/main.ts` 的 `app` 对象中注册
5. 在 `getMenuButtons()` 中添加按钮配置

### 监听游戏事件

```typescript
import { ws } from '@/core';

ws.on('game.event.name', (data) => {
  // 处理事件数据
  console.log(data.payload);
});

// 批量监听多个事件
ws.on(['event1', 'event2'], (data) => {
  // 统一处理
});
```

### 创建 UI 面板按钮

```typescript
const buttons: PanelButton[] = [
  {
    text: '📜 按钮名称',
    onClick: () => {
      // 点击处理逻辑
    },
  },
];
```

## 配置管理

### 统一配置模式

`config/defaults.ts` 提供集中式配置管理：

```typescript
// 定义默认配置
export const DEFAULT_CONFIG = {
  QUEST_BATCH_SIZE: 20,
  TASK_INTERVAL: 0.2,
  ITEM_USE_COUNT: 5,
  RESOURCE_MONITOR_ENABLED: true,
} as const;

// 定义存储键名
export const STORAGE_KEYS = {
  QUEST_BATCH_SIZE: 'quest_batch_size',
  TASK_INTERVAL: 'task_interval',
  // ...
} as const;

// 定义资源配置
export const DEFAULT_RESOURCES: ResourceCategory[] = [...];
```

**要点：**

- 所有默认值统一在此定义，避免魔法数字分散
- `STORAGE_KEYS` 与 `DEFAULT_CONFIG` 对应，保证一致性
- 资源配置支持类型定义（`insufficient`/`excess`）
- 新增功能配置时同步更新 `DEFAULT_CONFIG`、`STORAGE_KEYS` 和类型定义

### 资源监控类型

`config/defaults.ts` 支持两种监控类型：

- **`insufficient`（不足监控）：** 当资源低于阈值时报警
- **`excess`（过量监控）：** 当资源高于阈值时报警

**示例：**

```typescript
{
  name: '其他',
  items: {
    nutrientEssence: { threshold: 10000, type: 'insufficient' },
    cutePoint: { threshold: 120, type: 'excess' }, // 监控可爱值过多
  },
}
```

## 项目特定模式

### MutationObserver 模式（任务管理）

`features/quest.ts` 使用 DOM 监听检测任务状态变化：

```typescript
const observer = new MutationObserver(() => {
  if (isTaskRunning(card)) {
    observer.disconnect();
    resolve(); // 任务完成
  }
});
observer.observe(card, { childList: true, subtree: true });
```

**清理：** 始终在 `cleanup()` 方法中断开所有观察者。

### 动态按钮生成

`main.ts` 中 `getMenuButtons()` 返回函数而非数组，确保每次打开菜单时重新获取按钮列表（支持动态启用/禁用功能）。

### 外部资源引用

- **CDN 库：** iziToast、pako 通过 `vite.config.ts` 的 `require` 和 `externalGlobals` 配置
- **类型声明：** 在 `src/types/globals.d.ts` 中声明全局变量类型

## 常见问题

### WebSocket 消息发送失败

**原因：** 用户信息未初始化。**解决：** 消息会自动排队，等待 `userInfo` 获取后重试，无需手动处理。

### Toast 不显示

**检查：** GM_addStyle 是否正确加载 iziToast CSS 资源（在 `vite.config.ts` 中配置）。

### 任务队列暂停时间过长

**调整：** `taskQueue.setBatchSize(n)` 和 `taskQueue.setInterval(ms)` 动态修改参数。

## 扩展点

- **新的游戏功能：** 在 `features/` 创建管理器类，监听对应 WebSocket 事件
- **自定义 UI：** 参考 `ui/settings-panel.ts` 创建独立面板组件
- **资源监控规则：** 在 `config/defaults.ts` 的 `DEFAULT_RESOURCES` 中添加新资源类型
- **新增配置项：** 在 `config/defaults.ts` 的 `DEFAULT_CONFIG` 和 `STORAGE_KEYS` 中添加配置
