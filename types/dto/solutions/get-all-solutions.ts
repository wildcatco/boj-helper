import { Solution } from '../../solution';

export interface GetAllSolutionsResponse {
  solutions: Solution[];
  totalPages: number;
}
