import Layout from '@/components/Layout';
import SnippetList from '@/components/snippet/SnippetList/SnippetList';
import SnippetSearch from '@/components/snippet/SnippetSearch/SnippetSearch';
import AddSnippetModal from '@/components/snippet/modal/AddSnippetModal';
import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination/Pagination';
import useModal from '@/hooks/useModal';
import useSnippets from '@/hooks/useSnippets';

import styles from './index.module.scss';

const SnippetsPage = () => {
  const { snippets, totalPages } = useSnippets();
  const { openModal } = useModal();

  return (
    <Layout
      hasHeader
      title="코드 스니핏"
      description="코드 스니핏을 저장해 문제를 풀 때 참고할 수 있습니다."
    >
      <div className={styles.container}>
        <>
          <SnippetSearch />
          {snippets && snippets.length > 0 && typeof totalPages === 'number' ? (
            <>
              <Pagination totalPages={totalPages} maxVisiblePages={9} />
              <SnippetList editable snippets={snippets} />
            </>
          ) : (
            <p className={styles.empty}>저장된 코드 스니핏이 없습니다</p>
          )}
        </>
        <Button
          className={styles.button}
          onClick={() => openModal('addSnippet')}
        >
          코드 스니핏 추가
        </Button>
      </div>
      <AddSnippetModal />
    </Layout>
  );
};

export default SnippetsPage;
