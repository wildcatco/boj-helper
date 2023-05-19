import { NextApiResponse } from 'next';

import { object, string } from 'yup';

import { SUPPORTED_LANGUAGES } from '@/libs/constants/languages';
import { prisma } from '@/libs/db/prisma';
import { NextApiRequestWithUser } from '@/types/api';
import { CreateSnippetResponse } from '@/types/dto/snippets/create-snippet';
import { ErrorResponse } from '@/types/error-response';

const postSchema = object({
  name: string().required(),
  code: string().required(),
  language: string().oneOf(SUPPORTED_LANGUAGES).required(),
});

export const createSnippet = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse<CreateSnippetResponse | ErrorResponse>
) => {
  if (!postSchema.isValidSync(req.body)) {
    return res.status(400).json({
      errorName: 'BadRequestBody',
      message: '잘못된 요청입니다.',
    });
  }

  const { name, code, language } = req.body;

  const snippetExists = await prisma.snippet.findUnique({
    where: {
      userId_name: {
        name,
        userId: req.userId,
      },
    },
  });
  if (snippetExists) {
    return res.status(409).json({
      errorName: 'SnippetAlreadyExists',
      message: '동일한 이름의 코드 스니핏이 존재합니다.',
    });
  }

  const snippet = await prisma.snippet.create({
    data: {
      name,
      code,
      language,
      user: {
        connect: {
          id: req.userId,
        },
      },
    },
  });

  res.status(201).json({ snippet });
};
