import Link from 'next/link';
import { useRouter } from 'next/router';

import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';

import { problemState } from '@/states/problem';

import styles from './Navigate.module.scss';

const Navigate = () => {
  const router = useRouter();
  const problem = useRecoilValue(problemState);
  const {
    query: { list },
  } = router;

  if (!list || typeof list !== 'string') {
    return null;
  }

  const problemList = list.split(',');
  const currentIndex = problemList.findIndex((v) => v === problem.id);

  return (
    <div className={styles.container}>
      {currentIndex > 0 && (
        <Link
          href={router.asPath.replace(
            problem.id,
            problemList[currentIndex - 1]
          )}
          className={styles.link}
        >
          <AiFillCaretLeft />
          이전 문제
        </Link>
      )}
      {currentIndex < problemList.length - 1 && (
        <Link
          href={router.asPath.replace(
            problem.id,
            problemList[currentIndex + 1]
          )}
          className={styles.link}
        >
          다음 문제
          <AiFillCaretRight />
        </Link>
      )}
    </div>
  );
};

export default Navigate;
