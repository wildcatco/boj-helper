import BootstrapWrapper from '@/components/ui/BootstrapWrapper/BootstrapWrapper';
import { ExecutionResult } from '@/types/execution-result';

import styles from './ResultItem.module.scss';

interface ResultContentProps {
  title: string;
  str: string | null;
}

const ResultContent: React.FC<ResultContentProps> = ({ title, str }) => {
  if (!str) {
    return null;
  }

  return (
    <div className={styles.content}>
      <h4>{title}</h4>
      <BootstrapWrapper html={str} tag="pre" />
    </div>
  );
};

interface ResultProps {
  result: ExecutionResult;
}

const ResultItem: React.FC<ResultProps> = ({ result }) => {
  const { caseNumber, input, expected, output, error } = result;
  const status = result.error ? 'error' : result.pass ? 'success' : 'fail';
  const statusIcon = {
    success: '🟢',
    fail: '🔴',
    error: '🟠',
  };

  return (
    <div>
      <h3 className={styles.header}>
        <span>테스트 케이스 {caseNumber}</span>
        <span>{statusIcon[status]}</span>
      </h3>
      <div className={styles.contents}>
        <ResultContent title="입력" str={input} />
        <ResultContent title="예상 출력" str={expected} />
        <ResultContent title="출력" str={output} />
        <ResultContent title="에러" str={error} />
      </div>
    </div>
  );
};

export default ResultItem;
