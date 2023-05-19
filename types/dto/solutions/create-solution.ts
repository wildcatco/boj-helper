import { Solution } from '@prisma/client';

import { Language } from '@/types/language';
import { Difficulty } from '@/types/solution';

export interface CreateSolutionBody {
  categoryName: string;
  difficulty: Difficulty;
  code: string;
  language: Language;
  problemId: string;
  revisit: boolean;
}

export interface CreateSolutionResponse {
  solution: Solution;
}
