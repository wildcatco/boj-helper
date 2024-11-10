import TestCaseItem from './TestCaseItem';

import { TestCase } from '@/types/problem';

import styles from './TestCaseList.module.scss';

interface TestCaseListProps {
  examples: TestCase[];
  addedTestCases: TestCase[];
  onEdit: (index: number) => () => void;
  onDelete: (index: number) => () => void;
  testCasesOpen: boolean[];
  toggleOpen: (index: number) => void;
}

const TestCaseList: React.FC<TestCaseListProps> = ({
  examples,
  addedTestCases,
  onEdit,
  onDelete,
  testCasesOpen,
  toggleOpen,
}) => {
  return (
    <ul className={styles.container}>
      {examples.map((example, index) => (
        <TestCaseItem
          key={index}
          example={example}
          caseNumber={index + 1}
          isOpen={testCasesOpen[index]}
          toggleOpen={() => toggleOpen(index)}
        />
      ))}
      {addedTestCases.map((example, index) => (
        <TestCaseItem
          key={index}
          example={example}
          caseNumber={index + 1 + examples.length}
          isAdded
          onEdit={onEdit(index)}
          onDelete={onDelete(index)}
          isOpen={testCasesOpen[index + examples.length]}
          toggleOpen={() => toggleOpen(index + examples.length)}
        />
      ))}
    </ul>
  );
};

export default TestCaseList;
