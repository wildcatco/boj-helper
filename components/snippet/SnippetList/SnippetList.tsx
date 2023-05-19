import { useState } from 'react';

import SnippetCode from './SnippetCode';
import SnippetTable from './SnippetTable';
import { Snippet } from '@prisma/client';

import EditSnippetModal from '@/components/snippet/modal/EditSnippetModal';
import Modal from '@/components/ui/Modal';
import useModal from '@/hooks/useModal';

import styles from './SnippetList.module.scss';

interface SnippetListProps {
  snippets: Snippet[];
  editable?: boolean;
}

const SnippetList: React.FC<SnippetListProps> = ({ snippets, editable }) => {
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const { openModal } = useModal();

  const handleSnippetClick = (snippet: Snippet) => {
    setSelectedSnippet(snippet);
    openModal('snippetCode');
  };

  const handleSnippetEdit = (snippet: Snippet) => {
    setSelectedSnippet(snippet);
  };

  const handleDelete = () => {
    setSelectedSnippet(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <SnippetTable snippets={snippets} onClick={handleSnippetClick} />
      </div>
      {selectedSnippet && (
        <Modal name="snippetCode">
          <div className={styles.detail}>
            <SnippetCode
              editable={editable}
              snippet={selectedSnippet}
              onDelete={handleDelete}
            />
          </div>
        </Modal>
      )}

      <EditSnippetModal snippet={selectedSnippet} onEdit={handleSnippetEdit} />
    </div>
  );
};

export default SnippetList;
