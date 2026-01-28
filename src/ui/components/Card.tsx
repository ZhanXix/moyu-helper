/**
 * Card 组件
 */
import { JSX, ComponentChildren } from 'preact';

interface CardProps {
  title?: string;
  children: ComponentChildren;
  style?: JSX.CSSProperties;
  className?: string;
}

const CARD_STYLE: JSX.CSSProperties = {
  background: '#f8f9fa',
  border: '1px solid rgba(0, 0, 0, 0.06)',
  borderRadius: '10px',
  padding: '14px',
  marginBottom: '14px',
};

const TITLE_STYLE: JSX.CSSProperties = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#1a1a1a',
  marginBottom: '12px',
};

export function Card({ title, children, style = {}, className = '' }: CardProps) {
  return (
    <div className={className} style={{ ...CARD_STYLE, ...style }}>
      {title && <div style={TITLE_STYLE}>{title}</div>}
      {children}
    </div>
  );
}
