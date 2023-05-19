import { NextApiResponse } from 'next';

import { prisma } from '@/libs/db/prisma';
import { NextApiRequestWithUser } from '@/types/api';
import { GetAllCategoriesResponse } from '@/types/dto/categories/get-all-categories';

export const getAllCategories = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse<GetAllCategoriesResponse>
) => {
  const categories = await prisma.category.findMany({
    where: {
      user: {
        id: req.userId,
      },
    },
    orderBy: {
      name: 'asc',
    },
  });

  return res.json({ categories });
};
