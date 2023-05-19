import useSWR from 'swr';

import { fetcher } from '@/libs/utils/fetcher';
import { GetAllCategoriesResponse } from '@/types/dto/categories/get-all-categories';

const useCategories = () => {
  const { data, error } = useSWR<GetAllCategoriesResponse>(
    '/api/categories',
    fetcher
  );

  if (error) {
    throw error;
  }

  return {
    categories: data?.categories || null,
  };
};

export default useCategories;
