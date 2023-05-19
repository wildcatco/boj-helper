import { ChangeEventHandler } from 'react';

import styles from './Select.module.scss';

interface SelectProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  children?: React.ReactNode;
  disabled?: boolean;
  defaultValue?: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  value,
  onChange,
  children,
  disabled,
  defaultValue,
}) => {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      defaultValue={defaultValue}
      className={styles.select}
    >
      {children}
    </select>
  );
};

export default Select;
