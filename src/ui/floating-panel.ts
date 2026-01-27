/**
 * 悬浮面板组件 - 优化版
 */

import type { PanelButton } from '@/types';

const STYLES = `
.mh-fab{position:fixed;bottom:calc(var(--spacing) * 25);z-index:999;width:60px;height:60px;border-radius:50%;border:none;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,.12),0 2px 8px rgba(0,0,0,.08);color:#6366f1;font-size:20px;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1)}
.mh-fab-menu{position:fixed;bottom:calc(var(--spacing) * 25 + 68px);z-index:998;width:180px;background:#fff;border-radius:12px;border:1px solid rgba(0,0,0,.08);box-shadow:0 8px 28px rgba(0,0,0,.12);padding:8px;opacity:0;transform:translateY(12px) scale(.95);pointer-events:none;transition:all .25s cubic-bezier(.4,0,.2,1)}
.mh-fab-menu.open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}
.mh-fab-item{width:100%;padding:12px 16px;border:none;border-radius:8px;background:transparent;color:#333;font-size:14px;text-align:left;cursor:pointer;transition:all .15s ease;margin-bottom:4px}
.mh-fab-item:hover{background:#f8f9fa;transform:translateX(-2px)}
@media (max-width: 768px){
  .mh-fab{width:50px;height:50px;bottom:calc(var(--spacing) * 22);}
  .mh-fab-menu{bottom:calc(var(--spacing) * 22 + 68px);}
}
`;

GM.addStyle(STYLES);

interface PanelOptions {
  subButtons?: PanelButton[] | (() => PanelButton[]);
}

class FloatingPanel {
  private buttonSource: PanelButton[] | (() => PanelButton[]);
  private fab: HTMLButtonElement;
  private menu: HTMLDivElement;
  private isOpen = false;

  constructor(options: PanelOptions = {}) {
    this.buttonSource = options.subButtons || [];
    this.fab = this.createFab();
    this.menu = this.createMenu();
    this.bindEvents();
  }

  private getButtons(): PanelButton[] {
    return typeof this.buttonSource === 'function' ? this.buttonSource() : this.buttonSource;
  }

  private createFab(): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.className = 'mh-fab right-6 md:right-8';
    btn.innerHTML = '☰';
    btn.onclick = (e) => {
      e.stopPropagation();
      this.toggle();
    };
    btn.onmouseenter = () => {
      btn.style.transform = 'scale(1.08)';
      btn.style.boxShadow = '0 6px 20px rgba(0,0,0,.15),0 3px 10px rgba(0,0,0,.1)';
    };
    btn.onmouseleave = () => {
      if (!this.isOpen) {
        btn.style.transform = 'scale(1)';
        btn.style.boxShadow = '0 4px 16px rgba(0,0,0,.12),0 2px 8px rgba(0,0,0,.08)';
      }
    };
    document.body.appendChild(btn);
    return btn;
  }

  private createMenu(): HTMLDivElement {
    const menu = document.createElement('div');
    menu.className = 'mh-fab-menu right-6 md:right-8';
    document.body.appendChild(menu);
    return menu;
  }

  private renderButtons(): void {
    this.menu.innerHTML = '';
    this.getButtons().forEach((btn) => {
      const el = document.createElement('button');
      el.className = 'mh-fab-item';
      el.innerHTML = btn.text;
      el.onclick = () => {
        btn.onClick();
        this.close();
      };
      this.menu.appendChild(el);
    });
  }

  private bindEvents(): void {
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.fab.contains(e.target as Node) && !this.menu.contains(e.target as Node)) {
        this.close();
      }
    });

    window.addEventListener('settings-updated', () => {
      if (this.isOpen) this.renderButtons();
    });
  }

  private toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private open(): void {
    this.renderButtons();
    this.isOpen = true;
    this.menu.classList.add('open');
    this.fab.innerHTML = '✕';
    Object.assign(this.fab.style, {
      transform: 'scale(1.08) rotate(90deg)',
      background: '#6366f1',
      color: 'white',
    });
  }

  private close(): void {
    this.isOpen = false;
    this.menu.classList.remove('open');
    this.fab.innerHTML = '☰';
    Object.assign(this.fab.style, {
      transform: 'scale(1) rotate(0deg)',
      background: '#fff',
      color: '#6366f1',
    });
  }
}

export { FloatingPanel };
