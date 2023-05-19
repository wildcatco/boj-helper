import { useRouter } from 'next/router';

import useUser from './useUser';
import useSWR from 'swr';

import { fetcher } from '@/libs/utils/fetcher';
import { getQueryString } from '@/libs/utils/query-string';
import { GetAllSnippets } from '@/types/dto/snippets/get-all-snippets';

const useSnippets = () => {
  const router = useRouter();
  const { isLoggedIn } = useUser();

  const { data } = useSWR<GetAllSnippets>(
    isLoggedIn && router.isReady
      ? `/api/snippets?${getQueryString(router.query, ['page', 'name'])}`
      : null,
    fetcher,
    { suspense: true }
  );

  return {
    snippets: data?.snippets,
    totalPages: data?.totalPages,
  };
};

export default useSnippets;
