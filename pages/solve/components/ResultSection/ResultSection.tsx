import { useEffect } from 'react';

import SectionHeader from '../SectionHeader';
import ResultList from './ResultList/ResultList';
import ResultSummary from './ResultSummary';
import { useRecoilState } from 'recoil';

import { executionResultsState } from '@/states/execution-results';

import styles from './ResultSection.module.scss';

const ResultSection = () => {
  const [{ data: executionResults, loading }, setExecutionResults] =
    useRecoilState(executionResultsState);

  useEffect(() => {
    return () => {
      setExecutionResults({
        data: [],
        loading: false,
      });
    };
  }, [setExecutionResults]);

  return (
    <div className={styles.container}>
      <SectionHeader title="실행 결과" />
      <div className={styles.content}>
        {loading ? (
          <span>코드 실행 중...</span>
        ) : (
          <>
            <ResultSummary results={executionResults} />
            <ResultList results={executionResults} />
          </>
        )}
      </div>
    </div>
  );
};

export default ResultSection;
