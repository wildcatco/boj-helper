import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { Language } from '@/types/language';

const { persistAtom } = recoilPersist();

export const codeState = atom<string>({
  key: 'codeState',
  default: '',
});

export const languageState = atom<Language>({
  key: 'languageState',
  default: 'python',
  effects: [persistAtom],
});
