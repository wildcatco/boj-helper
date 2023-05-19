import { NextApiResponse } from 'next';

import { prisma } from '@/libs/db/prisma';
import { NextApiRequestWithUser } from '@/types/api';
import { DeleteSolutionResponse } from '@/types/dto/solutions/delete-solution';
import { ErrorResponse } from '@/types/error-response';

export const deleteSolution = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse<DeleteSolutionResponse | ErrorResponse>
) => {
  const solutionId = req.query.id as string;

  const solution = await prisma.solution.findUnique({
    where: {
      id: solutionId,
    },
    include: {
      user: true,
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

  await prisma.solution.delete({
    where: {
      id: solutionId,
    },
  });

  // 빈 category 삭제
  const category = await prisma.category.findUnique({
    where: {
      id: solution.categoryId,
    },
    include: {
      solutions: true,
    },
  });

  if (category && !category.solutions.length) {
    await prisma.category.delete({
      where: {
        id: solution.categoryId,
      },
    });
  }

  return res.status(204).end();
};
