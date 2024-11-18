import { NextApiResponse } from 'next';

import { prisma } from '@/libs/db/prisma';
import { NextApiRequestWithUser } from '@/types/api';

export async function increase(
  req: NextApiRequestWithUser,
  res: NextApiResponse
) {
  const user = await prisma.user.update({
    where: {
      id: req.userId,
    },
    data: {
      numOfRuns: {
        increment: 1,
      },
    },
  });

  return res.status(201).json({
    numOfRuns: user.numOfRuns,
  });
}
