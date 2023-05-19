import Table from '@/components/ui/Table';
import { DIFFICULTY_MAP } from '@/libs/constants/difficulties';
import { Difficulty, Solution } from '@/types/solution';

interface SolutionTableProps {
  solutions: Solution[];
  onClick: (solution: Solution) => void;
}

const SolutionTable: React.FC<SolutionTableProps> = ({
  solutions,
  onClick,
}) => {
  return (
    <Table
      header={[
        {
          name: '분류',
          width: '25%',
          center: true,
        },
        {
          name: '문제 번호',
          width: '15%',
          center: true,
        },
        {
          name: '문제 이름',
          width: '30%',
          center: false,
        },
        {
          name: '난이도',
          width: '15%',
          center: true,
        },
        {
          name: '다시 풀기',
          width: '15%',
          center: true,
        },
      ]}
      data={solutions.map((solution) => ({
        id: solution.id,
        contents: [
          solution.category?.name || '',
          solution.problemId,
          solution.problem?.title || '',
          DIFFICULTY_MAP[solution.difficulty as Difficulty],
          solution.revisit ? 'Y' : 'N',
        ],
        onClick: () => onClick(solution),
      }))}
    />
  );
};

export default SolutionTable;
