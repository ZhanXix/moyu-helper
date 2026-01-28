/**
 * 日志系统
 * 支持多级别日志输出和日志级别过滤
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'success' | 'none';

interface LogConfig {
  emoji: string;
  color: string;
  method: 'log' | 'warn' | 'error';
  priority: number;
}

const LOG_CONFIGS: Record<LogLevel, LogConfig> = {
  debug: { emoji: '🔍', color: '#8b5cf6', method: 'log', priority: 0 },
  info: { emoji: 'ℹ️', color: '#3b82f6', method: 'log', priority: 1 },
  success: { emoji: '✅', color: '#10b981', method: 'log', priority: 2 },
  warn: { emoji: '⚠️', color: '#f59e0b', method: 'warn', priority: 3 },
  error: { emoji: '❌', color: '#ef4444', method: 'error', priority: 4 },
  none: { emoji: '', color: '', method: 'log', priority: 999 },
};

class Logger {
  private minLevel: LogLevel = 'none';

  setMinLevel(level: LogLevel): void {
    this.minLevel = level;
  }

  getMinLevel(): LogLevel {
    return this.minLevel;
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_CONFIGS[level].priority >= LOG_CONFIGS[this.minLevel].priority;
  }

  private log(level: LogLevel, ...args: any[]): void {
    if (!this.shouldLog(level)) return;
    const { emoji, color, method } = LOG_CONFIGS[level];
    console[method](`%c[🐟] ${emoji}`, `color: ${color}; font-weight: bold;`, ...args);
  }

  debug = (...args: any[]) => this.log('debug', ...args);
  info = (...args: any[]) => this.log('info', ...args);
  success = (...args: any[]) => this.log('success', ...args);
  warn = (...args: any[]) => this.log('warn', ...args);
  error = (...args: any[]) => this.log('error', ...args);
}

export const logger = new Logger();
