import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import CodeSection from './components/CodeSection';
import ProblemSection from './components/ProblemSection';
import ResultSection from './components/ResultSection';
import SolvePageFooter from './components/SolvePageFooter';
import SolvePageHeader from './components/SolvePageHeader';
import { useSetRecoilState } from 'recoil';

import Layout from '@/components/Layout';
import HorizontallyResizableWindow from '@/components/ui/ResizableWindow/HorizontallyResizableWindow';
import VerticallyResizableWindow from '@/components/ui/ResizableWindow/VerticallyResizableWindow';
import { LanguageNotSupported, ProblemNotFound } from '@/libs/constants/errors';
import { isLanguageSupported } from '@/libs/utils/language';
import { serialize } from '@/libs/utils/serialize';
import {
  crawlProblem,
  findProblemFromDB,
  saveProblem,
} from '@/services/problems';
import { problemState } from '@/states/problem';
import { addedTestCasesState } from '@/states/test-case';
import { Problem } from '@/types/problem';

import styles from './[id].module.scss';

interface SolvePageProps {
  problem: Problem;
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps<SolvePageProps> = async (
  context
) => {
  const id = context.params?.id as string;
  let isProblemInDB = false;
  let problem: Problem | null = null;

  try {
    problem = await findProblemFromDB(id);
    if (problem) {
      isProblemInDB = true;
    } else {
      problem = await crawlProblem(id);
    }
  } catch (error) {
    throw error;
  }

  if (!problem) {
    return {
      redirect: {
        destination: `/?error=${ProblemNotFound}`,
        permanent: false,
      },
    };
  }

  !isProblemInDB && (await saveProblem(problem));

  return {
    props: {
      problem: serialize(problem),
    },
  };
};

const SolvePage: NextPage<SolvePageProps> = ({ problem }) => {
  const router = useRouter();
  const setProblem = useSetRecoilState(problemState);
  const setAddedTestCase = useSetRecoilState(addedTestCasesState);
  const [windowWidth, setWindowWidth] = useState<number | undefined>();

  useEffect(() => {
    setProblem(problem);
    setAddedTestCase([]);
  }, [problem, setProblem]);

  useEffect(() => {
    if (router.isReady) {
      const { language } = router.query;
      if (typeof language !== 'string' || !isLanguageSupported(language)) {
        void router.replace(`/problems?error=${LanguageNotSupported}`);
      }
    }
  }, [router]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout title={`${problem.id}번 ${problem.title}`}>
      <Script src="https://cdn.jsdelivr.net/pyodide/v0.23.0/full/pyodide.js" />
      <div className={styles.container}>
        <SolvePageHeader />
        <main className={styles.main}>
          {windowWidth && windowWidth > 768 && (
            <HorizontallyResizableWindow initialLeftRatio={0.3}>
              <ProblemSection />
              <VerticallyResizableWindow initialTopRatio={0.7}>
                <CodeSection />
                <ResultSection />
              </VerticallyResizableWindow>
            </HorizontallyResizableWindow>
          )}
          {windowWidth && windowWidth <= 768 && (
            <>
              <ProblemSection />
              <CodeSection fitToCode />
              <ResultSection />
            </>
          )}
        </main>
        <SolvePageFooter />
      </div>
    </Layout>
  );
};

export default SolvePage;
