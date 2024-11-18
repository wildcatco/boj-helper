import { NextApiResponse } from 'next';

import { createHandler } from '@/libs/api/create-handler';
import { prisma } from '@/libs/db/prisma';
import { NextApiRequestWithUser } from '@/types/api';

const handler = createHandler({ authRequired: true });

handler.post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
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
});

export default handler;
