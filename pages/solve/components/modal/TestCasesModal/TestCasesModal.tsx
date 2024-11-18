import { useState } from 'react';

import TestCaseList from './TestCaseList/TestCaseList';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import useModal from '@/hooks/useModal';
import TestCaseForm from '@/pages/solve/components/modal/TestCasesModal/TestCaseForm';
import { problemState } from '@/states/problem';
import { addedTestCasesState, editingTestCaseState } from '@/states/test-case';

import styles from './TestCasesModal.module.scss';

const TestCasesModal = () => {
  const problem = useRecoilValue(problemState);
  const [addedTestCases, setAddedTestCases] =
    useRecoilState(addedTestCasesState);
  const testCasesLength = problem.examples.length + addedTestCases.length;
  const [testCasesOpen, setTestCasesOpen] = useState(
    Array(testCasesLength).fill(true)
  );
  const setEditingTestCase = useSetRecoilState(editingTestCaseState);
  const { openModal, closeModal } = useModal();

  const handleEdit = (index: number) => () => {
    setEditingTestCase(index);
    openModal('editTestCase');
  };

  const handleDelete = (index: number) => () => {
    setAddedTestCases((prevAddedTestCases) => {
      const newAddedTestCases = [...prevAddedTestCases];
      newAddedTestCases.splice(index, 1);
      return newAddedTestCases;
    });
  };

  const handleOpenAll = () => {
    setTestCasesOpen(Array(testCasesLength).fill(true));
  };

  const handleCloseAll = () => {
    setTestCasesOpen(Array(testCasesLength).fill(false));
  };

  const toggleOpen = (index: number) => {
    const newTestCasesOpen = [...testCasesOpen];
    newTestCasesOpen[index] = !newTestCasesOpen[index];
    setTestCasesOpen(newTestCasesOpen);
  };

  return (
    <Modal name="testCaseList">
      <div className={styles.container}>
        <TestCaseList
          examples={problem.examples}
          addedTestCases={addedTestCases}
          onEdit={handleEdit}
          onDelete={handleDelete}
          testCasesOpen={testCasesOpen}
          toggleOpen={toggleOpen}
        />
        <div className={styles.controls}>
          <div>
            <Button onClick={handleOpenAll}>전체 펼치기</Button>
            <Button onClick={handleCloseAll}>전체 접기</Button>
          </div>
          <div>
            <Button onClick={() => openModal('addTestCase')}>추가하기</Button>
            <Button outlined onClick={() => closeModal('testCaseList')}>
              닫기
            </Button>
          </div>
        </div>

        <Modal name="addTestCase">
          <TestCaseForm mode="add" />
        </Modal>
        <Modal name="editTestCase">
          <TestCaseForm mode="edit" />
        </Modal>
      </div>
    </Modal>
  );
};

export default TestCasesModal;
