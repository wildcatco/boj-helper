import { atom } from 'recoil';

import { Example } from '@/types/problem';

export const addedTestCasesState = atom<Example[]>({
  key: 'addedTestCasesState',
  default: [],
});

export const editingTestCaseState = atom<number>({
  key: 'editingTestCase',
  default: 0,
});
