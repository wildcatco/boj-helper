import { SUPPORTED_LANGUAGES } from '../constants/languages';

import { Language } from '@/types/language';

export const isLanguageSupported = (language: string): language is Language => {
  return SUPPORTED_LANGUAGES.some((lang) => lang === language);
};

export const getLanguageLabel = (language: string) => {
  const map: Record<string, string> = {
    cpp: 'C++',
    javascript: 'JavaScript',
    python: 'Python3',
  };

  return map[language];
};
