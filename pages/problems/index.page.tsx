import { useState } from 'react';

import Layout from '@/components/Layout';
import Modal from '@/components/ui/Modal';
import Pagination from '@/components/ui/Pagination';
import useModal from '@/hooks/useModal';
import useSolutions from '@/hooks/useSolutions';
import SolutionDetail from '@/pages/problems/components/SolutionDetail';
import SolutionFilter from '@/pages/problems/components/SolutionFilter/SolutionFilter';
import SolutionTable from '@/pages/problems/components/SolutionTable/SolutionTable';
import { Solution } from '@/types/solution';

import styles from './index.module.scss';

const ProblemsPage = () => {
  const { solutions, totalPages } = useSolutions();
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(
    null
  );
  const { openModal } = useModal();

  const handleSolutionClick = (solution: Solution) => {
    openModal('problemDetail');
    setSelectedSolution(solution);
  };

  const handleDelete = () => {
    setSelectedSolution(null);
  };

  return (
    <Layout
      hasHeader
      title="문제 저장소"
      description="저장한 문제 목록을 보여줍니다."
    >
      <div className={styles.container}>
        {typeof totalPages === 'number' && (
          <>
            <SolutionFilter />
            {!solutions || solutions.length === 0 ? (
              <p className={styles.empty}>저장된 문제가 없습니다</p>
            ) : (
              <>
                <Pagination totalPages={totalPages} maxVisiblePages={9} />
                <div className={styles.main}>
                  <div className={styles.table}>
                    <SolutionTable
                      solutions={solutions}
                      onClick={handleSolutionClick}
                    />
                  </div>
                  {selectedSolution && (
                    <Modal name="problemDetail">
                      <div className={styles.detail}>
                        <SolutionDetail
                          solution={selectedSolution}
                          onDelete={handleDelete}
                        />
                      </div>
                    </Modal>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProblemsPage;
