import { useRouter } from 'next/router';

import { AxiosError } from 'axios';

import Button from '@/components/ui/Button';
import useSolutions from '@/hooks/useSolutions';
import { formatDate } from '@/libs/utils/format';
import { getLanguageLabel } from '@/libs/utils/language';
import { notifyError, notifySuccess } from '@/libs/utils/notification';
import SolutionDetailContents from '@/pages/problems/components/SolutionDetail/contents';
import { deleteSolution } from '@/services/solutions';
import { Solution } from '@/types/solution';

import styles from './SolutionDetail.module.scss';

interface SolutionDetailProps {
  solution: Solution;
  onDelete: () => void;
}

const SolutionDetail: React.FC<SolutionDetailProps> = ({
  solution,
  onDelete,
}) => {
  const router = useRouter();
  const { mutate } = useSolutions();

  const { problem, difficulty, category, language, createdAt, revisit } =
    solution;

  const handleDelete = async () => {
    const confirmDelete = confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete) {
      return;
    }

    const { error } = await deleteSolution(solution.id);

    if (error instanceof AxiosError && error.response?.status === 404) {
      alert('존재하지 않는 풀이입니다.');
      onDelete();
      return;
    }

    if (!error) {
      void router.push(router.asPath);
      notifySuccess('풀이를 삭제했습니다.');
      onDelete();
      await mutate();
    } else {
      notifyError();
    }
  };

  return (
    <div className={styles.container}>
      <SolutionDetailContents
        problemId={problem?.id}
        problemTitle={problem?.title}
        categoryName={category?.name}
        difficulty={difficulty}
        language={getLanguageLabel(language)}
        createdAt={formatDate(createdAt)}
        revisit={revisit}
      />
      <div className={styles.controls}>
        <Button href={`/solve/${problem?.id}?language=${language}`}>
          문제 보기
        </Button>
        <Button outlined onClick={handleDelete}>
          문제 삭제
        </Button>
      </div>
    </div>
  );
};

export default SolutionDetail;
