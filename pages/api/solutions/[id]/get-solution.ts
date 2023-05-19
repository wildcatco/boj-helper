import { NextApiResponse } from 'next';

import { prisma } from '@/libs/db/prisma';
import { NextApiRequestWithUser } from '@/types/api';
import { GetSolutionResponse } from '@/types/dto/solutions/get-solution';
import { ErrorResponse } from '@/types/error-response';

export const getSolution = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse<GetSolutionResponse | ErrorResponse>
) => {
  const userId = req.userId;
  const problemId = req.query.id as string;

  const solution = await prisma.solution.findUnique({
    where: {
      userId_problemId: {
        userId,
        problemId,
      },
    },
    include: {
      user: true,
      category: true,
    },
  });
  if (!solution) {
    return res.status(404).json({
      errorName: 'SolutionNotFound',
      message: '풀이를 찾을 수 없습니다.',
    });
  }

  if (solution.user.id !== req.userId) {
    return res.status(403).json({
      errorName: 'SolutionNotAuthorized',
      message: '해당 풀이에 대한 권한이 없습니다.',
    });
  }

  return res.status(200).json({ solution });
};
