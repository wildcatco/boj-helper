import React, { useEffect } from 'react';

import SectionHeader from '../SectionHeader';
import { useRecoilValue } from 'recoil';

import BootstrapWrapper from '@/components/ui/BootstrapWrapper/BootstrapWrapper';
import useMounted from '@/hooks/useMounted';
import ProblemSectionSubHeader from '@/pages/solve/components/ProblemSection/ProblemSectionSubHeader';
import { problemState } from '@/states/problem';

import styles from './ProblemSection.module.scss';

const ProblemSection = () => {
  const { descriptionHtml, inputHtml, outputHtml, limitHtml, examples } =
    useRecoilValue(problemState);
  const mounted = useMounted();

  useEffect(() => {
    if (mounted) {
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
      });
    }
  }, [mounted]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (typeof window?.MathJax !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (typeof window.MathJax.typeset === 'function') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.MathJax.typeset();
      }
    }
  }, []);

  const content = (
    <>
      <div>
        <ProblemSectionSubHeader title="문제" />
        <BootstrapWrapper html={descriptionHtml} tag="div" />
      </div>
      <div>
        {inputHtml && (
          <>
            <ProblemSectionSubHeader title="입력" />
            <BootstrapWrapper html={inputHtml} tag="div" />
          </>
        )}
      </div>
      <div>
        {outputHtml && (
          <>
            <ProblemSectionSubHeader title="출력" />
            <BootstrapWrapper html={outputHtml} tag="div" />
          </>
        )}
      </div>
      {limitHtml && (
        <div>
          <ProblemSectionSubHeader title="제한" />
          <BootstrapWrapper html={limitHtml} tag="div" />
        </div>
      )}
      <div>
        {[...examples]
          .sort((a, b) => a.number - b.number)
          .map((example, index) => (
            <div key={index}>
              <div>
                <ProblemSectionSubHeader title={`예제 입력 ${index + 1}`} />
                <BootstrapWrapper html={example.input} tag="pre" />
              </div>
              <div>
                <ProblemSectionSubHeader title={`예제 출력 ${index + 1}`} />
                <BootstrapWrapper html={example.output} tag="pre" />
              </div>
              {example.explain && (
                <div>
                  <BootstrapWrapper html={example.explain} tag="div" />
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );

  return (
    <div className={styles.container}>
      <SectionHeader title="문제 설명" />
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export default ProblemSection;
