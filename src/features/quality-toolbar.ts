/**
 * 工具栏管理器
 *
 * 功能说明：
 * - 将生活质量工具栏转换为图标模式
 * - 节省屏幕空间，提升游戏体验
 * - 支持点击展开/收起
 */

/**
 * 工具栏管理器类
 */
class QualityToolbarManager {
  private collapsed = true;
  private observer: MutationObserver | null = null;
  private processed = false;
  private clickHandler: ((e: Event) => void) | null = null;

  /**
   * 初始化工具栏管理器
   */
  init(): void {
    this.checkAndTransform();
    this.startObserver();
  }

  /**
   * 检查并转换工具栏
   */
  private checkAndTransform(): void {
    if (this.processed) return;

    const toolbar = this.findToolbar();
    if (toolbar) {
      this.transformToIcon(toolbar);
      this.processed = true;
      this.stopObserver();
    }
  }

  /**
   * 查找工具栏元素
   */
  private findToolbar(): HTMLElement | null {
    const spans = document.querySelectorAll('span');
    for (const el of spans) {
      if (el.textContent?.includes('生活质量工具栏')) {
        return el as HTMLElement;
      }
    }
    return null;
  }

  private startObserver(): void {
    this.observer = new MutationObserver(() => this.checkAndTransform());
    this.observer.observe(document.body, { childList: true, subtree: true });
  }

  private stopObserver(): void {
    this.observer?.disconnect();
    this.observer = null;
  }

  /**
   * 将工具栏转换为图标模式
   */
  private transformToIcon(toolbar: HTMLElement): void {
    let container = toolbar;
    while (container && container.style.position !== 'fixed') {
      container = container.parentElement as HTMLElement;
      if (!container) return;
    }

    const titleSpan = container.querySelector('span');
    const toggleBtn = container.querySelector<HTMLButtonElement>('.fp-toggle-btn');
    const subContent = container.querySelector<HTMLElement>('.fp-sub-content');

    if (!titleSpan || !toggleBtn || !subContent) return;

    const iconState = {
      width: '48px',
      height: '48px',
      minWidth: '48px',
      padding: '0',
      borderRadius: '50%',
    };

    const expandedState = {
      width: 'auto',
      height: 'auto',
      minWidth: '120px',
      padding: '10px 16px',
      borderRadius: '12px',
    };

    titleSpan.textContent = '🛠️';
    titleSpan.style.fontSize = '20px';
    titleSpan.style.lineHeight = '1';
    toggleBtn.style.display = 'none';
    subContent.style.display = 'none';

    Object.assign(container.style, iconState, {
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });

    const header = container.querySelector<HTMLElement>('div');
    if (header) {
      header.style.width = '100%';
      header.style.justifyContent = 'center';
    }

    this.clickHandler = (e) => {
      e.stopPropagation();
      this.collapsed = !this.collapsed;

      if (this.collapsed) {
        Object.assign(container.style, iconState);
        titleSpan.textContent = '🛠️';
        titleSpan.style.fontSize = '20px';
        toggleBtn.style.display = 'none';
        subContent.style.display = 'none';
        if (header) header.style.justifyContent = 'center';
      } else {
        Object.assign(container.style, expandedState);
        titleSpan.textContent = '生活质量工具栏';
        titleSpan.style.fontSize = '14px';
        toggleBtn.style.display = 'inline-block';
        subContent.style.display = 'block';
        if (header) header.style.justifyContent = 'space-between';
      }
    };

    container.addEventListener('click', this.clickHandler);
  }

  /**
   * 清理资源
   */
  destroy(): void {
    this.stopObserver();
    this.clickHandler = null;
    this.processed = false;
  }
}

export const qualityToolbarManager = new QualityToolbarManager();
