import { NextApiResponse } from 'next';

import { authOptions } from '../auth/[...nextauth].api';
import { getServerSession } from 'next-auth';
import { NextHandler } from 'next-connect';

import { NextApiRequestWithUser } from '@/types/api';

export async function requireAuth(
  req: NextApiRequestWithUser,
  res: NextApiResponse,
  next: NextHandler
) {
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
