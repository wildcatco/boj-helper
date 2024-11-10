import { atom } from 'recoil';

import { TestCase } from '@/types/problem';

export const addedTestCasesState = atom<TestCase[]>({
  key: 'addedTestCasesState',
  default: [],
});

export const editingTestCaseState = atom<number>({
  key: 'editingTestCase',
  default: 0,
});
