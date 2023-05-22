import { useEffect } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import Button from '@/components/ui/Button';
import useModal from '@/hooks/useModal';
import useSolution from '@/hooks/useSolution';
import useUser from '@/hooks/useUser';
import { checkApiError } from '@/libs/api/api-error';
import { notifyError } from '@/libs/utils/notification';
import StopWatch from '@/pages/solve/components/SolvePageFooter/StopWatch/StopWatch';
import LoginModal from '@/pages/solve/components/modal/LoginModal';
import SaveProblemModal from '@/pages/solve/components/modal/SaveProblemModal';
import SnippetsModal from '@/pages/solve/components/modal/SnippetsModal';
import SolutionModal from '@/pages/solve/components/modal/SolutionModal';
import TestCasesModal from '@/pages/solve/components/modal/TestCasesModal';
import { runCode } from '@/services/run-code';
import { codeState, languageState } from '@/states/code';
import { executionResultsState } from '@/states/execution-results';
import { problemState } from '@/states/problem';
import { addedTestCasesState } from '@/states/test-case';

import styles from './SolvePageFooter.module.scss';

const SolvePageFooter = () => {
  const code = useRecoilValue(codeState);
  const problem = useRecoilValue(problemState);
  const [executionResults, setExecutionResults] = useRecoilState(
    executionResultsState
  );
  const language = useRecoilValue(languageState);
  const addedTestCases = useRecoilValue(addedTestCasesState);
  const { openModal } = useModal();
  const { isLoggedIn, isLoading } = useUser();
  const { solution } = useSolution(problem.id);

  const handleRun = async () => {
    if (!code) {
      return;
    }
    setExecutionResults({ data: [], loading: true });

    const { results, error } = await runCode({
      language,
      code,
      testCases: [...problem.examples, ...addedTestCases],
    });

    if (!error && results) {
      setExecutionResults({ data: results, loading: false });
      await fetch('/api/increase', {method: 'POST'})
    } else {
      if (checkApiError(error, 'RunServerError')) {
        notifyError('채점 서버 에러');
      } else {
        notifyError();
      }
      setExecutionResults({ data: [], loading: false });
    }
  };

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      openModal('login');
    }
  }, [isLoggedIn, isLoading, openModal]);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <Button
          disabled={!Boolean(solution)}
          onClick={() => openModal('solution')}
          className={styles.button}
        >
          저장된 풀이
        </Button>
        <Button onClick={() => openModal('testCaseList')}>테스트 케이스</Button>
        <Button onClick={() => openModal('snippetList')}>코드 스니핏</Button>
        <div className={styles.stopWatch}>
          <StopWatch />
        </div>
      </div>
      <div className={styles.footerRight}>
        <div className={styles.submit}>
          <Button outlined>
            <a
              href={`https://www.acmicpc.net/submit/${problem.id}`}
              target="_blank"
              rel="noreferrer"
            >
              제출하기
            </a>
          </Button>
        </div>
        <Button onClick={() => openModal('saveProblem')}>문제 저장</Button>
        <Button onClick={handleRun} disabled={executionResults.loading}>
          코드 실행
        </Button>
      </div>

      <SolutionModal
        solution={
          solution ? { code: solution.code, language: solution.language } : null
        }
      />
      <TestCasesModal />
      <SnippetsModal />
      <SaveProblemModal />
      <LoginModal />
    </footer>
  );
};

export default SolvePageFooter;
