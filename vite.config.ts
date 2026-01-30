import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import preact from '@preact/preset-vite';
import path from 'path';
import pkg from './package.json';

export default defineConfig({
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    preact(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: '摸鱼助手 (Moyu Helper)-夕湛自用版',
        namespace: 'https://github.com/ZhanXix/moyu-helper',
        version: pkg.version,
        description: '摸鱼放置游戏自动化辅助脚本 - 任务管理、智能制造、资源监控、技能树优化',
        author: 'NanGuaChui & ZhanXix',
        match: ['https://www.moyu-idle.com/*', 'https://moyu-idle.com/*'],
        'run-at': 'document-end',
        updateURL: 'https://github.com/ZhanXix/moyu-helper/releases/latest/download/moyu-helper-xz-personal.user.js',
        downloadURL: 'https://github.com/ZhanXix/moyu-helper/releases/latest/download/moyu-helper-xz-personal.user.js',
        grant: ['unsafeWindow', 'GM.getValue', 'GM.setValue', 'GM_addStyle'],
      },
      server: {
        mountGmApi: true,
      },
    }),
  ],
  build: {
    minify: 'esbuild',
    target: 'es2015',
  },
});
