/**
 * Button 组件
 */
import { JSX } from 'preact';

interface ButtonProps {
  onClick?: () => void;
  children: any;
  variant?: 'primary' | 'secondary' | 'danger' | 'kitty';
  disabled?: boolean;
  style?: JSX.CSSProperties;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const BUTTON_STYLES: Record<string, JSX.CSSProperties> = {
  base: {
    padding: '11px 20px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    width: '100%',
    WebkitAppearance: 'none',
    appearance: 'none',
    WebkitTapHighlightColor: 'transparent',
  },
  primary: {
    background: '#6366f1',
    color: 'white',
  },
  secondary: {
    background: '#f3f4f6',
    color: '#374151',
    border: '1px solid rgba(0, 0, 0, 0.08)',
  },
  danger: {
    background: '#ef4444',
    color: 'white',
  },
  kitty: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white',
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};

export function Button({
  onClick,
  children,
  variant = 'primary',
  disabled = false,
  style = {},
  className = '',
  type = 'button',
}: ButtonProps) {
  const combinedStyle = {
    ...BUTTON_STYLES.base,
    ...BUTTON_STYLES[variant],
    ...(disabled ? BUTTON_STYLES.disabled : {}),
    ...style,
  };

  const handleMouseEnter = (e: Event) => {
    if (disabled) return;
    const target = e.target as HTMLElement;
    target.style.transform = 'translateY(-2px)';
    if (variant === 'primary') {
      target.style.background = '#5558e3';
      target.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.3)';
    } else if (variant === 'danger') {
      target.style.background = '#dc2626';
      target.style.boxShadow = '0 8px 24px rgba(239, 68, 68, 0.3)';
    } else if (variant === 'secondary') {
      target.style.background = '#e5e7eb';
      target.style.borderColor = '#6366f1';
    }
  };

  const handleMouseLeave = (e: Event) => {
    if (disabled) return;
    const target = e.target as HTMLElement;
    target.style.transform = 'translateY(0)';
    target.style.boxShadow = 'none';
    if (variant === 'primary') {
      target.style.background = '#6366f1';
    } else if (variant === 'danger') {
      target.style.background = '#ef4444';
    } else if (variant === 'secondary') {
      target.style.background = '#f3f4f6';
      target.style.borderColor = 'rgba(0, 0, 0, 0.08)';
    }
  };

  return (
    <button
      type={type}
      className={className}
      style={combinedStyle}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
