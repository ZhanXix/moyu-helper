/**
 * 百度统计集成
 */

declare global {
  interface Window {
    _hmt: any[];
  }
}

class Analytics {
  private readonly BAIDU_ID = 'ca4e89cb823766ca0d2ae272aefa3398';

  init() {
    window._hmt = window._hmt || [];
    const script = document.createElement('script');
    script.src = `https://hm.baidu.com/hm.js?${this.BAIDU_ID}`;
    document.head.appendChild(script);
  }

  track(category: string, action: string, label?: string) {
    window._hmt?.push(['_trackEvent', category, action, label]);
  }
}

export const analytics = new Analytics();
