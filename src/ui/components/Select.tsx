/**
 * Select 组件
 */
import { JSX } from 'preact';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectGroupOption {
  label: string;
  value?: string;
  options: SelectOption[];
}

interface SelectProps {
  value: string;
  onChange?: (value: string) => void;
  options: (SelectOption | SelectGroupOption)[];
  placeholder?: string;
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
  cursor: 'pointer',
  outline: 'none',
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  backgroundImage:
    "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  backgroundSize: '14px',
  paddingRight: '28px',
};

export function Select({
  value,
  onChange,
  options,
  placeholder,
  style = {},
  className = '',
  disabled = false,
}: SelectProps) {
  const handleChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    if (onChange) {
      onChange(target.value);
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

  // 渲染选项（支持混合类型）
  const renderOptions = () => {
    return options.map((opt, index) => {
      // 检查是否为分组选项
      if ('options' in opt && Array.isArray(opt.options)) {
        // 分组选项
        const group = opt as SelectGroupOption;
        return (
          <optgroup key={group.value || `group-${index}`} label={group.label}>
            {group.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </optgroup>
        );
      } else {
        // 平面选项
        const option = opt as SelectOption;
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      }
    });
  };

  return (
    <select
      className={className}
      style={{ ...BASE_STYLE, ...style }}
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {renderOptions()}
    </select>
  );
}
