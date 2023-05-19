import { ChangeEvent } from 'react';

import styles from './CheckBox.module.scss';

interface CheckBoxProps {
  id: string;
  label: string;
  name: string;
  checked: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  id,
  label,
  name,
  checked,
  onChange,
}) => {
  return (
    <div>
      <input
        id={id}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className={styles.input}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default CheckBox;
