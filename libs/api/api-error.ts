import { AxiosError } from 'axios';

export const ERROR_NAMES = [
  'BadRequestBody',
  'NotAuthenticated',
  'SolutionNotAuthorized',
  'SnippetNotAuthorized',
  'SolutionNotFound',
  'SnippetNotFound',
  'MethodNotAllowed',
  'SnippetAlreadyExists',
  'UncaughtError',
  'DbConnectionError',
  'RunServerError',
] as const;

export type ErrorName = (typeof ERROR_NAMES)[number];

export class ApiError extends Error {
  errorName?: ErrorName;
}

export const isApiError = (error: unknown): error is ApiError =>
  error instanceof ApiError;

export const checkApiError = (
  error: unknown,
  errorName: ErrorName
): error is ApiError => {
  return isApiError(error) && error.errorName === errorName;
};

export const convertAxiosErrorToApiError = (err: AxiosError) => {
  const apiError = new ApiError();
  const { errorName, message } = err.response?.data as ApiError;
  apiError.errorName = errorName;
  apiError.message = message;
  return apiError;
};
