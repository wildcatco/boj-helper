import { NextApiResponse } from 'next';

import { SNIPPETS_PER_PAGE } from '@/libs/constants/pagination';
import { prisma } from '@/libs/db/prisma';
import { serialize } from '@/libs/utils/serialize';
import { NextApiRequestWithUser } from '@/types/api';
import { GetAllSnippets } from '@/types/dto/snippets/get-all-snippets';
import { ErrorResponse } from '@/types/error-response';

export const getSnippets = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse<GetAllSnippets | ErrorResponse>
) => {
  const { page = '1', name } = req.query as {
    page?: string;
    name?: string;
  };

  const total = await prisma.snippet.count({
    where: {
      userId: req.userId,
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
  });

  const snippets = await prisma.snippet.findMany({
    skip: SNIPPETS_PER_PAGE * (+page - 1),
    take: SNIPPETS_PER_PAGE,
    orderBy: [
      {
        createdAt: 'desc',
      },
      {
        name: 'desc',
      },
    ],
    where: {
      userId: req.userId,
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
  });

  return res.json({
    snippets: serialize(snippets),
    totalPages: Math.ceil(total / SNIPPETS_PER_PAGE),
  });
};
