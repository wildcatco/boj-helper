import { NextApiResponse } from 'next';

import { SOLUTIONS_PER_PAGE } from '@/libs/constants/pagination';
import { prisma } from '@/libs/db/prisma';
import { serialize } from '@/libs/utils/serialize';
import { NextApiRequestWithUser } from '@/types/api';
import { GetAllSolutionsResponse } from '@/types/dto/solutions/get-all-solutions';
import { ErrorResponse } from '@/types/error-response';

export const getSolutions = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse<GetAllSolutionsResponse | ErrorResponse>
) => {
  const {
    page = '1',
    category,
    difficulty,
    language,
    query = '',
    searchBy = 'title',
  } = req.query as {
    page?: string;
    category?: string;
    difficulty?: string;
    language?: string;
    query?: string;
    searchBy?: 'problem-id' | 'problem-title';
  };

  let queryFilter: object;
  if (searchBy === 'problem-title') {
    queryFilter = {
      problem: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
    };
  } else if (searchBy === 'problem-id') {
    queryFilter = {
      problemId: {
        contains: query,
      },
    };
  } else {
    queryFilter = {};
  }

  const total = await prisma.solution.count({
    where: {
      user: {
        id: req.userId,
      },
      category: {
        name: {
          in: category ? category.split(',') : undefined,
        },
      },
      difficulty: {
        in: difficulty ? difficulty.split(',') : undefined,
      },
      language,
      ...queryFilter,
    },
  });

  const solutions = await prisma.solution.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    skip: page === 'all' ? undefined : SOLUTIONS_PER_PAGE * (+page - 1),
    take: page === 'all' ? undefined : SOLUTIONS_PER_PAGE,
    where: {
      user: {
        id: req.userId,
      },
      category: {
        name: {
          in: category ? category.split(',') : undefined,
        },
      },
      difficulty: {
        in: difficulty ? difficulty.split(',') : undefined,
      },
      language,
      ...queryFilter,
    },
    include: {
      category: true,
      problem: true,
    },
  });

  return res.json({
    solutions: serialize(solutions),
    totalPages: Math.ceil(total / SOLUTIONS_PER_PAGE),
  });
};
