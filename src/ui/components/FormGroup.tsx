/**
 * FormGroup 组件
 */
import { JSX, ComponentChildren } from 'preact';

interface FormGroupProps {
  label?: string;
  children: ComponentChildren;
  style?: JSX.CSSProperties;
  className?: string;
}

const FORM_GROUP_STYLE: JSX.CSSProperties = {
  marginBottom: '12px',
};

const LABEL_STYLE: JSX.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: '600',
  color: '#333',
  marginBottom: '5px',
};

export function FormGroup({ label, children, style = {}, className = '' }: FormGroupProps) {
  return (
    <div className={className} style={{ ...FORM_GROUP_STYLE, ...style }}>
      {label && <label style={LABEL_STYLE}>{label}</label>}
      {children}
    </div>
  );
}
