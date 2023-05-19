import { useRouter } from 'next/router';

import { getQueryString } from '@/libs/utils/query-string';

interface PushProps {
  pathname?: string;
  params: Record<string, string>;
  keepRestParams?: boolean;
}

const usePushWithParams = () => {
  const router = useRouter();

  const push = ({ pathname, params, keepRestParams = true }: PushProps) => {
    if (!router.isReady) return;

    let queryString: string;

    if (keepRestParams) {
      const { query } = router;
      Object.keys(params).forEach((key) => {
        query[key] = params[key];
      });
      queryString = getQueryString(query);
    } else {
      queryString = getQueryString(params);
    }

    void router.push(
      `${pathname || router.pathname}${queryString ? '?' + queryString : ''}`
    );
  };

  return { push };
};

export default usePushWithParams;
