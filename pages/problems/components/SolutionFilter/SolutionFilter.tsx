import CategoryFilter from '@/pages/problems/components/SolutionFilter/CategoryFilter/CategoryFilter';
import DifficultyFilter from '@/pages/problems/components/SolutionFilter/DifficultyFilter/DifficultyFilter';
import Search from '@/pages/problems/components/SolutionFilter/Search/Search';

import styles from './SolutionFilter.module.scss';

const SolutionFilter = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <CategoryFilter />
        <DifficultyFilter />
      </div>
      <Search />
    </div>
  );
};

export default SolutionFilter;
