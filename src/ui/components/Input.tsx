/**
 * Input 组件
 */
import { JSX } from 'preact';

interface InputProps {
  type?: 'text' | 'number';
  value: string | number;
  onChange?: (value: string) => void;
  onInput?: (value: string) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  style?: JSX.CSSProperties;
  className?: string;
  disabled?: boolean;
}

const BASE_STYLE: JSX.CSSProperties = {
  width: '100%',
  padding: '6px 8px',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: '6px',
  fontSize: '13px',
  color: '#1a1a1a',
  background: '#ffffff',
  transition: 'all 0.2s ease',
  boxSizing: 'border-box',
  outline: 'none',
  WebkitAppearance: 'none',
  appearance: 'none',
};

export function Input({
  type = 'text',
  value,
  onChange,
  onInput,
  placeholder,
  min,
  max,
  step,
  style = {},
  className = '',
  disabled = false,
}: InputProps) {
  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const newValue = target.value;
    if (onInput) {
      onInput(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleFocus = (e: Event) => {
    const target = e.target as HTMLElement;
    target.style.borderColor = '#6366f1';
    target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
  };

  const handleBlur = (e: Event) => {
    const target = e.target as HTMLElement;
    target.style.borderColor = 'rgba(0, 0, 0, 0.12)';
    target.style.boxShadow = 'none';
  };

  return (
    <input
      type={type}
      className={className}
      style={{ ...BASE_STYLE, ...style }}
      value={value}
      onInput={handleInput}
      onChange={handleInput}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
    />
  );
}
