import { Category, Solution } from '@prisma/client';

export interface GetSolutionResponse {
  solution: Solution & { category: Category };
}
