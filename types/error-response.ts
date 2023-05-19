import { ErrorName } from '../libs/api/api-error';

export interface ErrorResponse {
  errorName: ErrorName;
  message: string;
}
