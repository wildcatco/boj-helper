import { ChangeEvent, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import TextArea from '@/components/ui/TextArea';
import useModal from '@/hooks/useModal';
import { addedTestCasesState, editingTestCaseState } from '@/states/test-case';
import { TestCase } from '@/types/problem';

import styles from './TestCaseForm.module.scss';

interface TestCaseFormProps {
  mode: 'add' | 'edit';
}

const TestCaseForm: React.FC<TestCaseFormProps> = ({ mode }) => {
  const editingTestCase = useRecoilValue(editingTestCaseState);
  const [addedTestCases, setAddedTestCases] =
    useRecoilState(addedTestCasesState);
  const initialValue =
    mode === 'add'
      ? { input: '', output: '' }
      : addedTestCases[editingTestCase];
  const [testCase, setTestCase] = useState<TestCase>(initialValue);
  const { closeModal } = useModal();

  const modalName = mode === 'add' ? 'addTestCase' : 'editTestCase';

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTestCase({
      ...testCase,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickOk = () => {
    if (!testCase.input.trim() || !testCase.output.trim()) {
      return;
    }

    if (mode === 'add') {
      setAddedTestCases((prevAddedTestCases) => [
        ...prevAddedTestCases,
        testCase,
      ]);
    } else {
      const newAddedTestCases = [...addedTestCases];
      newAddedTestCases[editingTestCase] = testCase;
      setAddedTestCases(newAddedTestCases);
    }

    closeModal(modalName);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputs}>
        <div className={styles.input}>
          <Label htmlFor="input" text="입력" />
          <TextArea
            id="input"
            name="input"
            rows={8}
            value={testCase.input}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.input}>
          <Label htmlFor="output" text="출력" />
          <TextArea
            id="output"
            name="output"
            rows={8}
            value={testCase.output}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className={styles.controls}>
        <Button onClick={handleClickOk}>
          {mode === 'add' ? '추가' : '수정'}
        </Button>
        <Button outlined onClick={() => closeModal(modalName)}>
          취소
        </Button>
      </div>
    </div>
  );
};

export default TestCaseForm;
