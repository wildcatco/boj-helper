import {
  AiFillCaretDown,
  AiFillCaretRight,
  AiOutlineEdit,
} from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';

import { Example } from '@/types/problem';

import styles from './TestCaseItem.module.scss';

interface TestCaseProps {
  caseNumber: number;
  example: Example;
  isAdded?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  isOpen: boolean;
  toggleOpen: () => void;
}

const TestCaseItem: React.FC<TestCaseProps> = ({
  caseNumber,
  example,
  isAdded = false,
  onEdit,
  onDelete,
  isOpen = true,
  toggleOpen,
}) => {
  return (
    <li>
      <div className={styles.header}>
        <div className={styles.title} onClick={toggleOpen}>
          <span>{isOpen ? <AiFillCaretDown /> : <AiFillCaretRight />}</span>
          <span>테스트 케이스 {caseNumber}</span>
        </div>
        {isAdded && onEdit && onDelete && (
          <div className={styles.actions}>
            <AiOutlineEdit className={styles.action} onClick={onEdit} />
            <BsTrash className={styles.action} onClick={onDelete} />
          </div>
        )}
      </div>

      {isOpen && (
        <div className={styles.contents}>
          <h4>입력</h4>
          <div className="bootstrap">
            <pre>{example.input}</pre>
          </div>
          <h4>출력</h4>
          <div className="bootstrap">
            <pre>{example.output}</pre>
          </div>
        </div>
      )}
    </li>
  );
};

export default TestCaseItem;
