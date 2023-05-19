import { useRouter } from 'next/router';

import useUser from './useUser';
import useSWR from 'swr';

import { fetcher } from '@/libs/utils/fetcher';
import { getQueryString } from '@/libs/utils/query-string';
import { GetAllSolutionsResponse } from '@/types/dto/solutions/get-all-solutions';

const useSolutions = () => {
  const router = useRouter();
  const { isLoggedIn } = useUser();

  const { data, mutate } = useSWR<GetAllSolutionsResponse>(
    isLoggedIn && router.isReady
      ? `/api/solutions?${getQueryString(router.query, [
          'page',
          'category',
          'difficulty',
          'language',
          'query',
          'searchBy',
        ])}`
      : null,
    fetcher,
    { suspense: true }
  );

  return {
    solutions: data?.solutions,
    totalPages: data?.totalPages,
    mutate,
  };
};

export default useSolutions;
