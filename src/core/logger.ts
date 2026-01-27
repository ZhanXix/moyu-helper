/**
 * 日志系统
 * 支持多级别日志输出和日志级别过滤
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'success';

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
};

class Logger {
  private enabled = false;
  private minLevel: LogLevel = 'debug';

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  setMinLevel(level: LogLevel): void {
    this.minLevel = level;
  }

  private shouldLog(level: LogLevel): boolean {
    return this.enabled && LOG_CONFIGS[level].priority >= LOG_CONFIGS[this.minLevel].priority;
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
