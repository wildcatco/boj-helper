import useSWR from 'swr';

import { fetcher } from '@/libs/utils/fetcher';
import { GetSolutionResponse } from '@/types/dto/solutions/get-solution';

const useSolution = (problemId: string) => {
  const { data, error, mutate } = useSWR<GetSolutionResponse>(
    `/api/solutions/${problemId}`,
    fetcher,
    {
      onErrorRetry: (error) => {
        if (error.status === 404) return;
      },
    }
  );

  return {
    solution: data?.solution || null,
    error,
    mutate,
  };
};

export default useSolution;
