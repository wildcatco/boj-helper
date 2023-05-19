import { atom } from 'recoil';

export type ModalName =
  | 'testCaseList'
  | 'addTestCase'
  | 'editTestCase'
  | 'saveProblem'
  | 'addSnippet'
  | 'editSnippet'
  | 'snippetList'
  | 'login'
  | 'solution'
  | 'problemDetail'
  | 'snippetCode';

export const modalState = atom<Record<ModalName, boolean>>({
  key: 'modalState',
  default: {
    testCaseList: false,
    addTestCase: false,
    editTestCase: false,
    saveProblem: false,
    addSnippet: false,
    editSnippet: false,
    snippetList: false,
    login: false,
    solution: false,
    problemDetail: false,
    snippetCode: false,
  },
});
