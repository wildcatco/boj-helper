import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';

import { Category } from '@prisma/client';
import axios from 'axios';
import { useRecoilValue } from 'recoil';

import Layout from '@/components/Layout';
import Button from '@/components/ui/Button';
import CheckBox from '@/components/ui/CheckBox';
import Label from '@/components/ui/Label';
import useCategories from '@/hooks/useCategories';
import { languageState } from '@/states/code';
import { Difficulty, Solution } from '@/types/solution';

import styles from './index.module.scss';

interface ExercisePageProps {
  categories: Category[];
}

const ExercisePage: NextPage<ExercisePageProps> = () => {
  const { categories } = useCategories();
  const language = useRecoilValue(languageState);
  const router = useRouter();
  const initialDifficultyChecked: Record<Difficulty, boolean> = {
    easy: false,
    normal: false,
    hard: false,
  };
  const initialCategoryChecked: Record<string, boolean> = {};
  (categories || []).forEach((category) => {
    initialCategoryChecked[category.name] = false;
  });

  const [difficultyChecked, setDifficultyChecked] = useState(
    initialDifficultyChecked
  );
  const [categoryChecked, setCategoryChecked] = useState(
    initialCategoryChecked
  );

  const handleDifficultySelect = (e: ChangeEvent<HTMLInputElement>) => {
    setDifficultyChecked({
      ...difficultyChecked,
      [e.target.name]: !difficultyChecked[e.target.name as Difficulty],
    });
  };

  const handleCategorySelect = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryChecked({
      ...categoryChecked,
      [e.target.name]: !categoryChecked[e.target.name],
    });
  };

  const handleButtonClick = async () => {
    const difficulty = Object.keys(difficultyChecked).filter(
      (key) => difficultyChecked[key as Difficulty]
    );
    const category = Object.keys(categoryChecked).filter(
      (key) => categoryChecked[key]
    );

    if (!difficulty.length) {
      return alert('난이도를 하나 이상 선택해주세요.');
    }
    if (!category.length) {
      return alert('분류를 하나 이상 선택해주세요.');
    }

    const response = await axios<{ solutions: Solution[] }>(
      `/api/solutions?page=all&category=${category.join(
        ','
      )}&difficulty=${difficulty.join(',')}`
    );

    const solutions = response.data.solutions.filter(
      (solution) => solution.revisit
    );
    if (!solutions.length) {
      return alert('해당하는 문제가 없습니다.');
    }

    const problemIds = solutions.map((s) => s.problemId);
    problemIds.sort(() => Math.random() - 0.5);

    void router.push(
      `/solve/${problemIds[0]}?language=${language}&list=${problemIds.join(
        ','
      )}`
    );
  };

  const handleAllDifficultyCheck = () => {
    setDifficultyChecked({
      easy: true,
      normal: true,
      hard: true,
    });
  };

  const handleAllDifficultyUncheck = () => {
    setDifficultyChecked(initialDifficultyChecked);
  };

  const handleAllCategoryCheck = () => {
    const checked = { ...initialCategoryChecked };
    Object.keys(checked).forEach((key) => {
      checked[key] = true;
    });
    setCategoryChecked(checked);
  };

  const handleAllCategoryUncheck = () => {
    setCategoryChecked(initialCategoryChecked);
  };

  return (
    <Layout
      title="문제 연습"
      hasHeader
      description="저장한 문제를 다시 풀어봅니다."
    >
      {!categories || categories.length === 0 ? (
        <p className={styles.empty}>저장된 문제가 없습니다</p>
      ) : (
        <div className={styles.container}>
          <div className={styles.difficulty}>
            <Label text="난이도" size="xl" />
            <div className={styles.controls}>
              <span
                className={styles.checkControl}
                onClick={handleAllDifficultyCheck}
              >
                전체 선택
              </span>
              <span
                className={styles.checkControl}
                onClick={handleAllDifficultyUncheck}
              >
                전체 해제
              </span>
            </div>
            <div className={styles.difficultyList}>
              <CheckBox
                id="difficulty-easy"
                name="easy"
                label="쉬움"
                checked={difficultyChecked.easy}
                onChange={handleDifficultySelect}
              />
              <CheckBox
                id="difficulty-normal"
                name="normal"
                label="보통"
                checked={difficultyChecked.normal}
                onChange={handleDifficultySelect}
              />
              <CheckBox
                id="difficulty-hard"
                name="hard"
                label="어려움"
                checked={difficultyChecked.hard}
                onChange={handleDifficultySelect}
              />
            </div>
          </div>
          <div className={styles.category}>
            <Label text="분류" size="xl" />
            <div className={styles.controls}>
              <span
                className={styles.checkControl}
                onClick={handleAllCategoryCheck}
              >
                전체 선택
              </span>
              <span
                className={styles.checkControl}
                onClick={handleAllCategoryUncheck}
              >
                전체 해제
              </span>
            </div>
            <div className={styles.categoryList}>
              {categories &&
                categories.map((category) => (
                  <CheckBox
                    key={category.name}
                    id={`category-${category.name}`}
                    name={category.name}
                    label={category.name}
                    checked={categoryChecked[category.name]}
                    onChange={handleCategorySelect}
                  />
                ))}
            </div>
          </div>
          <Button onClick={handleButtonClick} className={styles.button}>
            문제 풀기
          </Button>
        </div>
      )}
    </Layout>
  );
};

export default ExercisePage;
