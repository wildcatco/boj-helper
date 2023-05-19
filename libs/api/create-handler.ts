import { NextApiRequest, NextApiResponse } from 'next';

import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import nc from 'next-connect';

import { authOptions } from '@/pages/api/auth/[...nextauth].api';
import { NextApiRequestWithUser } from '@/types/api';
import { ErrorResponse } from '@/types/error-response';

export const createHandler = ({
  authRequired,
}: { authRequired?: boolean } = {}) => {
  const handler = nc({
    onError(error, req: NextApiRequest, res: NextApiResponse<ErrorResponse>) {
      if (error instanceof Prisma.PrismaClientInitializationError) {
        res.status(500).json({
          errorName: 'DbConnectionError',
          message: '데이터베이스 연결 에러.',
        });
      } else {
        res.status(500).json({
          errorName: 'UncaughtError',
          message: error.message || '알 수 없는 에러.',
        });
      }
    },
    onNoMatch(req: NextApiRequest, res: NextApiResponse<ErrorResponse>) {
      res.status(405).json({
        errorName: 'MethodNotAllowed',
        message: `${req.method} 메서드는 사용할 수 없습니다.`,
      });
    },
  });

  if (authRequired) {
    handler.use(
      async (
        req: NextApiRequestWithUser,
        res: NextApiResponse<ErrorResponse>,
        next
      ) => {
        const session = await getServerSession(req, res, authOptions);

        if (!session || !session.user) {
          return res.status(401).json({
            errorName: 'NotAuthenticated',
            message: '로그인이 필요합니다.',
          });
        }

        req.userId = session.user.id;
        return next();
      }
    );
  }
  return handler;
};
