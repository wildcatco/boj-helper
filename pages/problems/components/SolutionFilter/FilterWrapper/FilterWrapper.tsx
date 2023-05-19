import styles from './FilterWrapper.module.scss';

interface FilterWrapperProps {
  children: React.ReactNode;
}

const FilterWrapper: React.FC<FilterWrapperProps> = ({ children }) => {
  return <div className={styles.filter}>{children}</div>;
};

export default FilterWrapper;
