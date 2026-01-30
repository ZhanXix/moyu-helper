/**
 * Section 组件（可折叠区域）
 */
import { JSX, ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';

interface SectionProps {
  title: string;
  children: ComponentChildren;
  defaultExpanded?: boolean;
  style?: JSX.CSSProperties;
  className?: string;
}

const SECTION_STYLE: JSX.CSSProperties = {
  marginBottom: '10px',
  overflow: 'hidden',
};

const TITLE_STYLE: JSX.CSSProperties = {
  fontSize: '12px',
  fontWeight: '600',
  margin: 0,
  letterSpacing: '-0.2px',
  cursor: 'pointer',
  userSelect: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '8px 10px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '8px',
  color: 'white',
  transition: 'all 0.2s ease',
};

const ARROW_STYLE: JSX.CSSProperties = {
  fontSize: '10px',
  transition: 'transform 0.3s ease',
  display: 'inline-block',
};

const CONTENT_STYLE: JSX.CSSProperties = {
  overflow: 'hidden',
  transition: 'max-height 0.3s ease, opacity 0.3s ease',
  marginTop: '8px',
  padding: '0 2px',
};

export function Section({ title, children, defaultExpanded = false, style = {}, className = '' }: SectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMouseEnter = (e: Event) => {
    const target = e.currentTarget as HTMLElement;
    target.style.filter = 'brightness(1.05)';
  };

  const handleMouseLeave = (e: Event) => {
    const target = e.currentTarget as HTMLElement;
    target.style.filter = 'brightness(1)';
  };

  const contentStyle: JSX.CSSProperties = {
    ...CONTENT_STYLE,
    maxHeight: isExpanded ? '2000px' : '0',
    opacity: isExpanded ? 1 : 0,
  };

  const arrowStyle: JSX.CSSProperties = {
    ...ARROW_STYLE,
    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
  };

  return (
    <div className={className} style={{ ...SECTION_STYLE, ...style }}>
      <div style={TITLE_STYLE} onClick={toggleExpanded} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <span style={arrowStyle}>▶</span>
        <span>{title}</span>
      </div>
      <div style={contentStyle}>{children}</div>
    </div>
  );
}
