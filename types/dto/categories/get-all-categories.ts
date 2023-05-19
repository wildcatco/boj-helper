import { Category } from '@prisma/client';

export interface GetAllCategoriesResponse {
  categories: Category[];
}
