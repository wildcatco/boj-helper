import { NextApiResponse } from 'next';

import { boolean, object, string } from 'yup';

import { DIFFICULTIES } from '@/libs/constants/difficulties';
import { SUPPORTED_LANGUAGES } from '@/libs/constants/languages';
import { prisma } from '@/libs/db/prisma';
import { NextApiRequestWithUser } from '@/types/api';
import { CreateSolutionResponse } from '@/types/dto/solutions/create-solution';
import { ErrorResponse } from '@/types/error-response';

const postSchema = object({
  categoryName: string().required(),
  difficulty: string().oneOf(DIFFICULTIES).required(),
  code: string(),
  language: string().oneOf(SUPPORTED_LANGUAGES).required(),
  revisit: boolean().required(),
  problemId: string().required(),
});

export const createOrUpdateSolution = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse<CreateSolutionResponse | ErrorResponse>
) => {
  if (!postSchema.isValidSync(req.body)) {
    return res.status(400).json({
      errorName: 'BadRequestBody',
      message: '잘못된 요청입니다.',
    });
  }

  const { categoryName, difficulty, code, language, revisit, problemId } =
    req.body;

  const category = await prisma.category.upsert({
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

  const solution = await prisma.solution.upsert({
    where: {
      userId_problemId: {
        userId: req.userId,
        problemId,
      },
    },
    create: {
      problem: { connect: { id: problemId } },
      code: code || '',
      language,
      difficulty,
      revisit,
      user: { connect: { id: req.userId } },
      category: {
        connect: {
          id: category.id,
        },
      },
    },
    update: {
      problem: { connect: { id: problemId } },
      code,
      language,
      difficulty,
      revisit,
      user: { connect: { id: req.userId } },
      category: {
        connect: {
          id: category.id,
        },
      },
    },
  });

  return res.status(201).json({ solution });
};
