import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import styles from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
  return <AiOutlineLoading3Quarters className={styles.spinner} />;
};

export default LoadingSpinner;
