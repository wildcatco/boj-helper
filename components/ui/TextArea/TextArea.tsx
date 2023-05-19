import { ChangeEventHandler } from 'react';

import styles from './TextArea.module.scss';

interface TextAreaProps {
  id?: string;
  name?: string;
  rows?: number;
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  disabled?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  name,
  rows,
  value,
  onChange,
  disabled,
}) => {
  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={styles.textArea}
    />
  );
};

export default TextArea;
