import SnippetList from '@/components/snippet/SnippetList/SnippetList';
import SnippetSearch from '@/components/snippet/SnippetSearch/SnippetSearch';
import AddSnippetModal from '@/components/snippet/modal/AddSnippetModal';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Pagination from '@/components/ui/Pagination/Pagination';
import useModal from '@/hooks/useModal';
import useSnippets from '@/hooks/useSnippets';

import styles from './SnippetsModal.module.scss';

const SnippetsModal = () => {
  const { snippets, totalPages } = useSnippets();
  const { openModal, closeModal } = useModal();

  return (
    <Modal name="snippetList">
      <div className={styles.container}>
        {snippets && snippets.length > 0 && typeof totalPages === 'number' ? (
          <>
            <SnippetSearch />
            <Pagination totalPages={totalPages} maxVisiblePages={7} />
            <SnippetList editable snippets={snippets} />
          </>
        ) : (
          <p>저장된 코드 스니핏이 없습니다</p>
        )}
      </div>
      <div className={styles.controls}>
        <Button onClick={() => openModal('addSnippet')}>추가하기</Button>
        <Button outlined onClick={() => closeModal('snippetList')}>
          닫기
        </Button>
      </div>
      <AddSnippetModal />
    </Modal>
  );
};

export default SnippetsModal;
