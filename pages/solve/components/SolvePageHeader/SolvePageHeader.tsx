import AssociatedProblems from './AssociatedProblems';
import HomeIcon from './HomeIcon';
import LanguageSelector from './LanguageSelector';
import ProblemTitle from './ProblemTitle';
import ThemeToggle from './ThemeToggle';
import { useRecoilValue } from 'recoil';

import Navigate from '@/pages/solve/components/SolvePageHeader/Navigate';
import { problemState } from '@/states/problem';

import styles from './SolvePageHeader.module.scss';

const SolvePageHeader = () => {
  const problem = useRecoilValue(problemState);

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <HomeIcon />
        <ProblemTitle id={problem.id} title={problem.title} />
        {problem.associations.length > 0 && (
          <AssociatedProblems associations={problem.associations} />
        )}
      </div>
      <div className={styles.headerRight}>
        <Navigate />
        <LanguageSelector />
        <div className={styles.theme}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default SolvePageHeader;
