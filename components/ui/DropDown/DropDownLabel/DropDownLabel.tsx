import { RiArrowDownSFill } from 'react-icons/ri';

import styles from './DropDownLabel.module.scss';

interface DropDownLabelProps {
  label: string;
  onToggle: () => void;
}

const DropDownLabel: React.FC<DropDownLabelProps> = ({ label, onToggle }) => {
  return (
    <div onClick={onToggle} className={styles.label}>
      <span>{label}</span>
      <RiArrowDownSFill />
    </div>
  );
};

export default DropDownLabel;
