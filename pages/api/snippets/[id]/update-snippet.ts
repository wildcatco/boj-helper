import { NextApiResponse } from 'next';

import { object, string } from 'yup';

import { SUPPORTED_LANGUAGES } from '@/libs/constants/languages';
import { prisma } from '@/libs/db/prisma';
import { NextApiRequestWithUser } from '@/types/api';
import { UpdateSnippetResponse } from '@/types/dto/snippets/update-snippet';
import { ErrorResponse } from '@/types/error-response';

const postSchema = object({
  name: string(),
  code: string(),
  language: string().oneOf(SUPPORTED_LANGUAGES),
});
export const updateSnippet = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse<UpdateSnippetResponse | ErrorResponse>
) => {
  const id = req.query.id as string;

  if (!postSchema.isValidSync(req.body)) {
    return res.status(400).json({
      errorName: 'BadRequestBody',
      message: '잘못된 요청입니다.',
    });
  }

  const { name, code, language } = req.body;

  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });

  if (!snippet) {
    return res.json({
      errorName: 'SnippetNotFound',
      message: '스니핏이 존재하지 않습니다.',
    });
  }

  if (snippet.userId !== req.userId) {
    return res.json({
      errorName: 'SnippetNotAuthorized',
      message: '해당 스니핏에 대한 권한이 없습니다.',
    });
  }

  if (snippet.name !== name) {
    const snippetExists = await prisma.snippet.findUnique({
      where: {
        id: snippet.id,
      },
    });
    if (snippetExists) {
      return res.status(409).json({
        errorName: 'SnippetAlreadyExists',
        message: '동일한 이름의 코드 스니핏이 존재합니다.',
      });
    }
  }

  const updatedSnippet = await prisma.snippet.update({
    where: {
      id,
    },
    data: {
      name,
      code,
      language,
    },
  });

  res.status(200).json({ snippet: updatedSnippet });
};
