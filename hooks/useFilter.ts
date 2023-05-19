import usePushWithParams from '@/hooks/usePushWithParams';

const useFilter = () => {
  const { push } = usePushWithParams();

  const filter = (key: string, value: string) => {
    push({
      params: {
        [key]: value,
        page: '',
      },
      keepRestParams: true,
    });
  };

  return {
    filter,
  };
};

export default useFilter;
