import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import Layout from '@/components/Layout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { LanguageNotSupported, ProblemNotFound } from '@/libs/constants/errors';
import PatchNote from '@/pages/components/PatchNote';
import { languageState } from '@/states/code';

import styles from './index.module.scss';

const HomePage = () => {
  const [problemId, setProblemId] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const language = useRecoilValue(languageState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    void router.push(`/solve/${problemId}?language=${language}`);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProblemId(e.target.value);
  };

  useEffect(() => {
    const { error } = router.query;
    if (error === ProblemNotFound) {
      alert('존재하지 않는 문제 번호입니다.');
    } else if (error === LanguageNotSupported) {
      alert('지원하지 않는 언어입니다.');
    }
    setLoading(false);
  }, [router]);

  return (
    <Layout
      hasHeader
      title="문제 풀기"
      description="백준 문제의 번호를 입력하여 문제를 생성합니다."
    >
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              type="number"
              required={true}
              placeholder="문제 번호를 입력하세요"
              min={1000}
              max={99999}
              onChange={handleInputChange}
            />
            <Button loading={loading}>문제 풀기</Button>
          </form>
          <Button
            className={styles.like}
            outlined
            href="https://github.com/wildcatco/boj-helper"
            target="_blank"
          >
            <span>사용법 보기</span>
          </Button>
        </div>
        <PatchNote />
      </div>
    </Layout>
  );
};

export default HomePage;
