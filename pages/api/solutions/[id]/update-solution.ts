import { NextApiResponse } from 'next';

import { object, string } from 'yup';

import { DIFFICULTIES } from '@/libs/constants/difficulties';
import { SUPPORTED_LANGUAGES } from '@/libs/constants/languages';
import { prisma } from '@/libs/db/prisma';
import { NextApiRequestWithUser } from '@/types/api';
import { UpdateSolutionResponse } from '@/types/dto/solutions/update-solution';
import { ErrorResponse } from '@/types/error-response';

const postSchema = object({
  categoryName: string().required(),
  difficulty: string().oneOf(DIFFICULTIES).required(),
  code: string().required(),
  language: string().oneOf(SUPPORTED_LANGUAGES).required(),
});

export const updateSolution = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse<UpdateSolutionResponse | ErrorResponse>
) => {
  const solutionId = req.query.id as string;

  if (!postSchema.isValidSync(req.body)) {
    return res.status(400).json({
      errorName: 'BadRequestBody',
      message: '잘못된 요청입니다.',
    });
  }

  const { categoryName, difficulty, code, language } = req.body;

  const solution = await prisma.solution.findUnique({
    where: {
      id: solutionId,
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

  let category = solution.category;
  if (solution.category.name !== categoryName) {
    category = await prisma.category.upsert({
      where: {
        userId_name: {
          userId: req.userId,
          name: categoryName,
        },
      },
      create: {
        name: categoryName,
        user: {
          connect: {
            id: req.userId,
          },
        },
      },
      update: {},
    });
  }

  const updatedSolution = await prisma.solution.update({
    where: {
      id: solutionId,
    },
    data: {
      difficulty,
      code,
      language,
      category: {
        connect: {
          id: category.id,
        },
      },
    },
  });

  return res.status(200).json({ solution: updatedSolution });
};
