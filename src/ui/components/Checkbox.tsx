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

export function Checkbox({ checked, onChange, label, style = {}, className = '', disabled = false }: CheckboxProps) {
  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (onChange) {
      onChange(target.checked);
    }
  };

  const checkboxStyle = {
    ...CHECKBOX_STYLE,
    ...(checked
      ? {
          backgroundColor: '#6366f1',
          borderColor: '#6366f1',
          boxShadow: 'inset 0 0 0 2px #fff',
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
    >
      <input type="checkbox" style={checkboxStyle} checked={checked} onChange={handleChange} disabled={disabled} />
      {label && <span>{label}</span>}
    </label>
  );
}
