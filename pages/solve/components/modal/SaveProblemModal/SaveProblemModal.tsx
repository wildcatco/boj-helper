import { ChangeEvent, useEffect, useState } from 'react';

import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Modal from '@/components/ui/Modal';
import Select from '@/components/ui/Select';
import useCategories from '@/hooks/useCategories';
import useModal from '@/hooks/useModal';
import useSolution from '@/hooks/useSolution';
import { notifyError, notifySuccess } from '@/libs/utils/notification';
import { createOrUpdateSolution } from '@/services/solutions';
import { codeState, languageState } from '@/states/code';
import { problemState } from '@/states/problem';
import { Difficulty } from '@/types/solution';

import styles from './SaveProblemModal.module.scss';

const SaveProblemModal = () => {
  const code = useRecoilValue(codeState);
  const problem = useRecoilValue(problemState);
  const language = useRecoilValue(languageState);
  const { closeModal } = useModal();
  const { solution, mutate } = useSolution(problem.id);

  const [solutionInfo, setSolutionInfo] = useState({
    category: solution?.category?.name || '',
    difficulty: (solution?.difficulty || 'normal') as Difficulty,
    revisit: solution ? solution.revisit : true,
  });
  const [newCategory, setNewCategory] = useState('');
  const { categories } = useCategories();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setSolutionInfo({
      ...solutionInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleRevisitChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSolutionInfo({
      ...solutionInfo,
      revisit: e.target.checked,
    });
  };

  const handleSave = async () => {
    let category: string;
    if (solutionInfo.category === 'new-category') {
      category = newCategory;
    } else {
      category = solutionInfo.category;
    }

    if (!category) {
      return alert('분류명을 입력해주세요.');
    }

    if (category === '전체') {
      return alert("분류명으로 '전체'를 사용할 수 없습니다");
    }

    let overwrite = false;
    if (solution && solution.code !== code) {
      overwrite = confirm(
        '풀이 코드를 덮어 씌우겠습니까?\n취소를 누르면 분류와 난이도만 갱신됩니다.'
      );
    }

    const { error } = await createOrUpdateSolution({
      categoryName: category,
      difficulty: solutionInfo.difficulty,
      code: solution && !overwrite ? solution.code : code,
      language,
      revisit: solutionInfo.revisit,
      problemId: problem.id,
    });

    if (error instanceof AxiosError && error.response?.status === 409) {
      return alert('이미 존재하는 제목입니다.');
    }

    if (!error) {
      notifySuccess('문제를 저장했습니다!');
      await mutate();
    } else {
      notifyError();
    }

    closeModal('saveProblem');
  };

  const handleNewCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  useEffect(() => {
    setSolutionInfo({
      category: solution?.category?.name || '',
      difficulty: (solution?.difficulty || 'normal') as Difficulty,
      revisit: solution ? solution.revisit : true,
    });
  }, [solution]);

  useEffect(() => {
    if (!categories || solutionInfo.category) {
      return;
    }
    setSolutionInfo((prevSolutionInfo) => ({
      ...prevSolutionInfo,
      category: categories[0]?.name || 'new-category',
    }));
  }, [categories, solutionInfo.category]);

  return (
    <Modal name="saveProblem">
      <div className={styles.container}>
        <div className={styles.contents}>
          <div className={styles.category}>
            <div className={styles.content}>
              <Label text="분류" />
              <Select
                id="category"
                name="category"
                value={solutionInfo.category}
                onChange={handleInputChange}
              >
                {categories &&
                  categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                <option value="new-category">
                  --------새로운 분류 입력--------
                </option>
              </Select>
            </div>
            {solutionInfo.category === 'new-category' && (
              <Input onChange={handleNewCategoryChange} type="text" />
            )}
          </div>
          <div className={styles.content}>
            <Label text="난이도" />
            <Select
              id="difficulty"
              name="difficulty"
              value={solutionInfo.difficulty}
              onChange={handleInputChange}
            >
              <option value="easy">쉬움</option>
              <option value="normal">보통</option>
              <option value="hard">어려움</option>
            </Select>
          </div>
          <div className={styles.checkbox}>
            <input
              id="revisit"
              name="revisit"
              type="checkbox"
              checked={solutionInfo.revisit}
              onChange={handleRevisitChange}
            />
            <label htmlFor="revisit">다시 풀기</label>
          </div>
        </div>
        <div className={styles.controls}>
          <Button onClick={handleSave}>저장</Button>
          <Button outlined onClick={() => closeModal('saveProblem')}>
            취소
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SaveProblemModal;
