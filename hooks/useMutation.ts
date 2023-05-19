import axios, { AxiosError } from 'axios';
import { Key } from 'swr';
import useSWRMutation from 'swr/mutation';

import { convertAxiosErrorToApiError } from '@/libs/api/api-error';

function useMutation<U, V = unknown>({
  url,
  method,
}: {
  url: string;
  method: string;
}) {
  async function mutate(url: string, { arg }: { arg: V }) {
    try {
      const response = await axios({
        url,
        method,
        data: arg,
      });
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw convertAxiosErrorToApiError(err);
      } else {
        throw err;
      }
    }
  }

  const { data, trigger } = useSWRMutation<U, unknown, Key, V>(url, mutate);

  return { data, trigger };
}

export default useMutation;
