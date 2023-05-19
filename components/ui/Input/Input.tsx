import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

import styles from './Input.module.scss';

interface InputProps {
  type: HTMLInputTypeAttribute;
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  id,
  name,
  required,
  disabled,
  placeholder,
  min,
  max,
  value,
  onChange,
}) => {
  return (
    <input
      id={id}
      name={name}
      className={styles.input}
      type={type}
      required={required}
      disabled={disabled}
      placeholder={placeholder || ''}
      min={min}
      max={max}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
