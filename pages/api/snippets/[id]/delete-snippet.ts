import { NextApiResponse } from 'next';

import { prisma } from '@/libs/db/prisma';
import { NextApiRequestWithUser } from '@/types/api';
import { DeleteSnippetResponse } from '@/types/dto/snippets/delete-snippet';
import { ErrorResponse } from '@/types/error-response';

export const deleteSnippet = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse<DeleteSnippetResponse | ErrorResponse>
) => {
  const id = req.query.id as string;

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

  if (snippet?.userId !== req.userId) {
    return res.json({
      errorName: 'SnippetNotAuthorized',
      message: '해당 스니핏에 대한 권한이 없습니다.',
    });
  }

  await prisma.snippet.delete({
    where: {
      id,
    },
  });

  res.status(204).end();
};
