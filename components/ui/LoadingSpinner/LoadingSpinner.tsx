import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import styles from './LoadingSpinner.module.scss';

const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <AiOutlineLoading3Quarters className={`${styles.spinner} ${className}`} />
  );
};

export default LoadingSpinner;
