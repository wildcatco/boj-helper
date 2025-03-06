import { toast } from 'react-toastify';

export const notifySuccess = (
  message: string,
  options?: { preserve?: boolean }
) =>
  toast.success(message, {
    autoClose: options?.preserve ? false : 5000,
  });

export const notifyError = (message?: string) => {
  if (message) {
    toast.error(message);
  } else {
    toast.error('에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
};
