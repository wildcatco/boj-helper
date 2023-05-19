import { atom } from 'recoil';

import { Problem } from '@/types/problem';

export const problemState = atom<Problem>({
  key: 'problemState',
  default: {
    id: '',
    title: '',
    descriptionHtml: '',
    inputHtml: '',
    outputHtml: '',
    limitHtml: null,
    examples: [],
    associations: [],
  },
});
