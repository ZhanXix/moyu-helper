/**
 * Modal 组件
 */
import { JSX, ComponentChildren } from 'preact';
import { useEffect } from 'preact/hooks';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ComponentChildren;
  width?: string;
  maxWidth?: string;
  maxHeight?: string;
  className?: string;
  contentStyle?: JSX.CSSProperties;
}

const OVERLAY_STYLE: JSX.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.4)',
  zIndex: 10000,
  opacity: 0,
  transition: 'opacity 0.3s ease',
};

const PANEL_STYLE: JSX.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  background: '#ffffff',
  borderRadius: '16px',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
  color: '#1a1a1a',
  display: 'flex',
  flexDirection: 'column',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  zIndex: 10001,
};

const HEADER_STYLE: JSX.CSSProperties = {
  padding: '14px 16px',
  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const TITLE_STYLE: JSX.CSSProperties = {
  margin: 0,
  fontSize: '18px',
  fontWeight: '600',
  color: '#1a1a1a',
};

const CLOSE_BTN_STYLE: JSX.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: '#666',
  fontSize: '20px',
  cursor: 'pointer',
  width: '28px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '6px',
  transition: 'all 0.2s ease',
};

const CONTENT_STYLE: JSX.CSSProperties = {
  padding: '16px',
  paddingBottom: '16px',
  overflowY: 'auto',
  flex: 1,
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  width = '90%',
  maxWidth = '420px',
  maxHeight = '80vh',
  className = '',
  contentStyle,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      // 触发动画
      setTimeout(() => {
        const overlay = document.querySelector('.mh-modal-overlay') as HTMLElement;
        const panel = document.querySelector('.mh-modal-panel') as HTMLElement;
        if (overlay) overlay.style.opacity = '1';
        if (panel) panel.style.opacity = '1';
      }, 10);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    const overlay = document.querySelector('.mh-modal-overlay') as HTMLElement;
    const panel = document.querySelector('.mh-modal-panel') as HTMLElement;
    if (overlay) overlay.style.opacity = '0';
    if (panel) panel.style.opacity = '0';
    setTimeout(onClose, 300);
  };

  const handlePanelClick = (e: Event) => {
    e.stopPropagation();
  };

  const handleCloseMouseEnter = (e: Event) => {
    const target = e.target as HTMLElement;
    target.style.background = 'rgba(0, 0, 0, 0.05)';
  };

  const handleCloseMouseLeave = (e: Event) => {
    const target = e.target as HTMLElement;
    target.style.background = 'transparent';
  };

  return (
    <>
      <div className="mh-modal-overlay" style={OVERLAY_STYLE} onClick={handleOverlayClick} />
      <div
        className={`mh-modal-panel ${className}`}
        style={{ ...PANEL_STYLE, width, maxWidth, maxHeight }}
        onClick={handlePanelClick}
      >
        {title && (
          <div style={HEADER_STYLE}>
            <h2 style={TITLE_STYLE}>{title}</h2>
            <button
              style={CLOSE_BTN_STYLE}
              onClick={handleOverlayClick}
              onMouseEnter={handleCloseMouseEnter}
              onMouseLeave={handleCloseMouseLeave}
            >
              ✕
            </button>
          </div>
        )}
        <div style={{ ...CONTENT_STYLE, ...contentStyle }}>{children}</div>
      </div>
    </>
  );
}
