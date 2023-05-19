import { Solution } from '@prisma/client';

import { Language } from '@/types/language';
import { Difficulty } from '@/types/solution';

export interface UpdateSolutionBody {
  categoryName: string;
  difficulty: Difficulty;
  code: string;
  language: Language;
}

export interface UpdateSolutionResponse {
  solution: Solution;
}
