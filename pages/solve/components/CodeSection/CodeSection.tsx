import { useEffect, useRef, useState } from 'react';

import SectionHeader from '../SectionHeader/SectionHeader';
import { useRecoilState, useRecoilValue } from 'recoil';

import Editor from '@/components/ui/Editor/Editor';
import { codeState, languageState } from '@/states/code';

import styles from './CodeSection.module.scss';

const CODE_SAVE_INTERVAL = 5000; // 5초

interface CodeSectionProps {
  problemNumber: number;
  fitToCode?: boolean;
}

const CodeSection: React.FC<CodeSectionProps> = ({
  problemNumber,
  fitToCode,
}) => {
  const language = useRecoilValue(languageState);
  const [code, setCode] = useRecoilState(codeState);
  const [codeHeight, setCodeHeight] = useState<number>(250);
  const codeRef = useRef<string>(code);
  const CODE_SAVE_KEY = `code-${problemNumber}-${language}`;

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || '');
    const viewLines = Array.from(document.querySelectorAll('.view-line'));
    const topValues = viewLines.map((line) =>
      parseInt(getComputedStyle(line).top)
    );
    setCodeHeight(Math.max(...topValues));
  };

  useEffect(() => {
    const initialCodeJs = `// 입력을 받아오기 위해 아래 두줄의 코드를 사용하세요. (수정 금지)
const fs = require('fs');
const stdin = fs.readFileSync('/dev/stdin').toString().trim();
`;
    if (language === 'javascript') {
      setCode(initialCodeJs);
    } else {
      setCode('');
    }

    const savedCode = localStorage.getItem(CODE_SAVE_KEY);
    if (savedCode) {
      setCode(savedCode);
    }
  }, [CODE_SAVE_KEY, language, problemNumber, setCode]);

  useEffect(() => {
    codeRef.current = code;
  }, [code]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      localStorage.setItem(CODE_SAVE_KEY, codeRef.current);
    }, CODE_SAVE_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, [CODE_SAVE_KEY, problemNumber]);

  return (
    <div className={styles.container}>
      <SectionHeader title="풀이 코드" />
      <div
        className={styles.content}
        style={{
          height: fitToCode && codeHeight ? `${codeHeight + 70}px` : '100%',
        }}
      >
        <Editor language={language} value={code} onChange={handleCodeChange} />
      </div>
    </div>
  );
};

export default CodeSection;
