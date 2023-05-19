import ResultItem from './ResultItem/ResultItem';

import { ExecutionResult } from '@/types/execution-result';

interface ResultListProps {
  results: ExecutionResult[];
}

const ResultList: React.FC<ResultListProps> = ({ results }) => {
  return (
    <div>
      {results.map((result) => (
        <ResultItem key={result.caseNumber} result={result} />
      ))}
    </div>
  );
};

export default ResultList;
