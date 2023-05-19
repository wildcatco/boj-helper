import axios, { AxiosError } from 'axios';

import { convertAxiosErrorToApiError } from '@/libs/api/api-error';

export async function fetcher(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error(err);
    if (err instanceof AxiosError) {
      throw convertAxiosErrorToApiError(err);
    } else {
      throw err;
    }
  }
}
