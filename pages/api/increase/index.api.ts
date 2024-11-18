import { NextApiResponse } from 'next';

import { requireAuth } from '../middlewares/require-auth';
import { increase } from './increase';
import { createRouter } from 'next-connect';

import { NextApiRequestWithUser } from '@/types/api';

const router = createRouter<NextApiRequestWithUser, NextApiResponse>()
  .use(requireAuth)
  .post(increase);

export default router.handler();
