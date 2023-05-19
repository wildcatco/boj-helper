import { toast } from 'react-toastify';

export const notifySuccess = (message: string) => toast.success(message);

export const notifyError = (message?: string) => {
  if (message) {
    toast.error(message);
  } else {
    toast.error('에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
};
