import { NextApiResponse } from 'next';

import { requireAuth } from '../middlewares/require-auth';
import { createRouter } from 'next-connect';

import { getAllCategories } from '@/pages/api/categories/get-all-categories';
import { NextApiRequestWithUser } from '@/types/api';

const router = createRouter<NextApiRequestWithUser, NextApiResponse>()
  .use(requireAuth)
  .get(getAllCategories);

export default router.handler();
