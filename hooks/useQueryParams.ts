import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useQueryParams = ({ queryName }: { queryName: string }) => {
  const [value, setValue] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const queryValue = router.query[queryName];

    if (router.isReady) {
      if (!Array.isArray(queryValue)) {
        setValue(queryValue || '');
      }
    }
  }, [queryName, router]);

  return value;
};

export default useQueryParams;
