/**
 * Checkbox 组件
 */
import { JSX } from 'preact';

interface CheckboxProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  style?: JSX.CSSProperties;
  className?: string;
  disabled?: boolean;
  onClick?: (e: Event) => void;
  indeterminate?: boolean;
}

const CONTAINER_STYLE: JSX.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  fontSize: '13px',
  color: '#333',
};

const CHECKBOX_STYLE: JSX.CSSProperties = {
  width: '18px',
  height: '18px',
  cursor: 'pointer',
  accentColor: '#6366f1',
  WebkitAppearance: 'none',
  appearance: 'none',
  border: '2px solid rgba(0, 0, 0, 0.2)',
  borderRadius: '4px',
  position: 'relative',
  backgroundColor: '#fff',
};

export function Checkbox({ checked, onChange, label, style = {}, className = '', disabled = false, onClick, indeterminate = false }: CheckboxProps) {
  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (onChange) {
      onChange(target.checked);
    }
  };

  const handleClick = (e: Event) => {
    if (onClick) {
      onClick(e);
    }
  };

  const checkboxStyle = {
    ...CHECKBOX_STYLE,
    ...(checked || indeterminate
      ? {
          backgroundColor: indeterminate ? '#94a3b8' : '#6366f1',
          borderColor: indeterminate ? '#94a3b8' : '#6366f1',
          boxShadow: indeterminate ? 'inset 0 0 0 2px #fff, inset 0 2px 0 2px #94a3b8' : 'inset 0 0 0 2px #fff',
        }
      : {}),
  };

  return (
    <label
      className={className}
      style={{
        ...CONTAINER_STYLE,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
      onClick={handleClick}
    >
      <input type="checkbox" style={checkboxStyle} checked={checked} onChange={handleChange} disabled={disabled} />
      {label && <span>{label}</span>}
    </label>
  );
}
