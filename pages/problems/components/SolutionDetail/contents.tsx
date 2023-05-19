import SolutionDetailContent from './content';

import { DIFFICULTY_MAP } from '@/libs/constants/difficulties';
import { Difficulty } from '@/types/solution';

import styles from './SolutionDetail.module.scss';

interface SolutionDetailContentsProps {
  problemId?: string;
  problemTitle?: string;
  categoryName?: string;
  difficulty: string;
  language: string;
  createdAt: string;
  revisit: boolean;
}

const SolutionDetailContents: React.FC<SolutionDetailContentsProps> = ({
  problemId = '',
  problemTitle = '',
  categoryName = '',
  difficulty,
  language,
  createdAt,
  revisit,
}) => {
  return (
    <div className={styles.contents}>
      <SolutionDetailContent
        label="문제"
        content={`${problemId}번 ${problemTitle}`}
      />
      <SolutionDetailContent label="분류" content={categoryName} />
      <SolutionDetailContent
        label="난이도"
        content={DIFFICULTY_MAP[difficulty as Difficulty]}
      />
      <SolutionDetailContent label="언어" content={language} />
      <SolutionDetailContent label="날짜" content={createdAt} />
      <SolutionDetailContent label="다시 풀기" content={revisit ? 'Y' : 'N'} />
    </div>
  );
};

export default SolutionDetailContents;
