/**
 * 消息提示系统
 * 提供统一的用户通知接口，支持多种类型和持久化显示
 */

const TOAST_STYLES = `
.mh-toast-container{position:fixed;top:20px;left:50%;transform:translateX(-50%);width:90%;max-width:600px;z-index:999999;pointer-events:none}
.mh-toast{min-width:300px;margin:0 auto 10px;padding:16px 20px 19px;background:#fff;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.15);display:flex;align-items:center;gap:12px;pointer-events:auto;animation:mhSlideIn .3s ease;position:relative;overflow:hidden}
.mh-toast.removing{animation:mhSlideOut .3s ease forwards}
.mh-toast-msg{flex:1;font-size:14px;color:#333;line-height:1.5;word-break:break-word}
.mh-toast-close{width:20px;height:20px;border:none;background:0 0;cursor:pointer;font-size:18px;color:#999;padding:0;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s}
.mh-toast-close:hover{color:#333;background:rgba(0,0,0,.05);border-radius:50%;transform:scale(1.1)}
.mh-toast-progress{position:absolute;bottom:0;left:0;right:0;height:3px;background:currentColor;opacity:.8;width:100%;transition:width linear}
.mh-toast.info{border:1px solid #3498db}.mh-toast.info .mh-toast-progress{color:#3498db}
.mh-toast.success{border:1px solid #4caf50}.mh-toast.success .mh-toast-progress{color:#4caf50}
.mh-toast.warning{border:1px solid #ff9800}.mh-toast.warning .mh-toast-progress{color:#ff9800}
.mh-toast.error{border:1px solid #f44336}.mh-toast.error .mh-toast-progress{color:#f44336}
.mh-toast-confirm{border:1px solid #3498db}
.mh-toast-buttons{display:flex;gap:8px;margin-top:12px;justify-content:flex-end}
.mh-toast-btn{padding:6px 16px;border:none;border-radius:4px;cursor:pointer;font-size:14px;transition:all .2s;font-weight:500}
.mh-toast-btn:hover{opacity:.85;transform:translateY(-1px)}
.mh-toast-btn:active{transform:translateY(0)}
.mh-toast-btn.primary{background:#3498db;color:#fff}
.mh-toast-btn.secondary{background:#e0e0e0;color:#333}
@keyframes mhSlideIn{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes mhSlideOut{to{transform:translateY(-100%);opacity:0}}
`;

GM.addStyle(TOAST_STYLES);

interface ProgressToast {
  update(msg: string): void;
  hide(): void;
}

type ToastType = 'info' | 'success' | 'warning' | 'error';

class Toast {
  private container: HTMLDivElement | null = null;
  private toastCount = 0;
  private readonly MAX_TOASTS = 5;

  private getContainer(): HTMLDivElement {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'mh-toast-container';
      document.body.appendChild(this.container);
    }
    return this.container;
  }

  private createCloseButton(onClose: () => void): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.className = 'mh-toast-close';
    btn.innerHTML = '×';
    btn.onclick = onClose;
    return btn;
  }

  private async show(type: ToastType, msg: string, timeout: number | false = 2000): Promise<void> {
    return new Promise((resolve) => {
      const container = this.getContainer();

      // 限制同时显示的 toast 数量
      if (this.toastCount >= this.MAX_TOASTS) {
        const oldToast = container.firstElementChild;
        if (oldToast) this.remove(oldToast as HTMLElement);
      }

      const toast = document.createElement('div');
      toast.className = `mh-toast ${type}`;

      const msgEl = document.createElement('div');
      msgEl.className = 'mh-toast-msg';
      msgEl.innerHTML = msg;
      toast.appendChild(msgEl);

      toast.appendChild(this.createCloseButton(() => this.remove(toast, resolve)));

      if (timeout !== false) {
        const progress = document.createElement('div');
        progress.className = 'mh-toast-progress';
        toast.appendChild(progress);

        requestAnimationFrame(() => {
          progress.style.width = '0%';
          progress.style.transitionDuration = `${timeout}ms`;
        });

        setTimeout(() => this.remove(toast, resolve), timeout);
      }

      container.appendChild(toast);
      this.toastCount++;
    });
  }

  private remove(toast: HTMLElement, callback?: () => void): void {
    toast.classList.add('removing');
    this.toastCount = Math.max(0, this.toastCount - 1);
    setTimeout(() => {
      toast.remove();
      callback?.();
    }, 300);
  }

  info = (msg: string, timeout = 2000) => this.show('info', msg, timeout);
  success = (msg: string, timeout = 2500) => this.show('success', msg, timeout);
  warning = (msg: string, timeout = 3000) => this.show('warning', msg, timeout);
  error = (msg: string, timeout = 3500) => this.show('error', msg, timeout);

  progress(msg: string): ProgressToast {
    const container = this.getContainer();
    const toast = document.createElement('div');
    toast.className = 'mh-toast info';

    const msgEl = document.createElement('div');
    msgEl.className = 'mh-toast-msg';
    msgEl.textContent = msg;
    toast.appendChild(msgEl);

    container.appendChild(toast);
    this.toastCount++;

    let isHidden = false;

    return {
      update: (newMsg: string) => {
        if (!isHidden) msgEl.textContent = newMsg;
      },
      hide: () => {
        if (!isHidden) {
          isHidden = true;
          this.remove(toast);
        }
      },
    };
  }

  confirm(msg: string, onConfirm?: () => void, timeout?: number): void {
    const container = this.getContainer();
    const toast = document.createElement('div');
    toast.className = 'mh-toast mh-toast-confirm';

    const content = document.createElement('div');
    content.style.flex = '1';

    const msgEl = document.createElement('div');
    msgEl.className = 'mh-toast-msg';
    msgEl.innerHTML = msg;
    content.appendChild(msgEl);

    const buttons = document.createElement('div');
    buttons.className = 'mh-toast-buttons';

    if (onConfirm) {
      const confirmBtn = document.createElement('button');
      confirmBtn.className = 'mh-toast-btn primary';
      confirmBtn.textContent = '确定';
      confirmBtn.onclick = () => {
        onConfirm();
        this.remove(toast);
      };
      buttons.appendChild(confirmBtn);
    }

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'mh-toast-btn secondary';
    cancelBtn.textContent = onConfirm ? '取消' : '关闭';
    cancelBtn.onclick = () => this.remove(toast);
    buttons.appendChild(cancelBtn);

    content.appendChild(buttons);
    toast.appendChild(content);

    if (timeout) {
      const progress = document.createElement('div');
      progress.className = 'mh-toast-progress';
      toast.appendChild(progress);

      requestAnimationFrame(() => {
        progress.style.width = '0%';
        progress.style.transitionDuration = `${timeout}ms`;
      });

      setTimeout(() => this.remove(toast), timeout);
    }

    container.appendChild(toast);
    this.toastCount++;
  }
}

export const toast = new Toast();
