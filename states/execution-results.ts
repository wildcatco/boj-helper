import { atom } from 'recoil';

import { ExecutionResult } from '@/types/execution-result';

export const executionResultsState = atom<{
  data: ExecutionResult[];
  loading: boolean;
}>({
  key: 'executionResultState',
  default: {
    data: [],
    loading: false,
  },
});
