import { ExecutionResult } from '@/types/execution-result';

import styles from './ResultSummary.module.scss';

interface ResultSummaryProps {
  results: ExecutionResult[];
}

const ResultSummary: React.FC<ResultSummaryProps> = ({ results }) => {
  const successCases = results
    .filter((result) => result.pass)
    .map((result) => result.caseNumber);
  const failCases = results
    .filter((result) => !result.error && !result.pass)
    .map((result) => result.caseNumber);
  const errorCases = results
    .filter((result) => result.error)
    .map((result) => result.caseNumber);

  if (!results.length) {
    return null;
  }

  return (
    <div className={styles.summary}>
      <p className={styles.case}>
        <span>🟢</span>
        <span>성공 케이스</span>
        <span>{successCases.join(', ')}</span>
      </p>
      <p className={styles.case}>
        <span>🔴</span>
        <span>실패 케이스</span>
        <span>{failCases.join(', ')}</span>
      </p>
      <p className={styles.case}>
        <span>🟠</span>
        <span>에러 케이스</span>
        <span>{errorCases.join(', ')}</span>
      </p>
    </div>
  );
};

export default ResultSummary;
