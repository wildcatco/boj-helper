import Editor from '@/components/ui/Editor/Editor';
import Modal from '@/components/ui/Modal';

import styles from './SolutionModal.module.scss';

interface SolutionModalProps {
  solution: {
    code: string;
    language: string;
  } | null;
}

const SolutionModal: React.FC<SolutionModalProps> = ({ solution }) => {
  if (!solution) {
    return null;
  }

  return (
    <Modal name="solution">
      <div className={styles.container}>
        <Editor language={solution.language} value={solution.code} readOnly />
      </div>
    </Modal>
  );
};

export default SolutionModal;
