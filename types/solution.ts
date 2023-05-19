import {
  Category,
  Problem,
  Solution as SolutionFromPrisma,
} from '@prisma/client';

import { DIFFICULTIES } from '@/libs/constants/difficulties';

export type Solution = SolutionFromPrisma & {
  category?: Category;
  problem?: Problem;
};

export type Difficulty = (typeof DIFFICULTIES)[number];
