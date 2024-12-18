import { NextApiResponse } from 'next';

import { requireAuth } from '../middlewares/require-auth';
import { createRouter } from 'next-connect';

import { createOrUpdateSolution } from '@/pages/api/solutions/create-or-update-solution';
import { getSolutions } from '@/pages/api/solutions/get-solutions';
import { NextApiRequestWithUser } from '@/types/api';

const router = createRouter<NextApiRequestWithUser, NextApiResponse>()
  .use(requireAuth)
  .get(getSolutions)
  .post(createOrUpdateSolution);

export default router.handler();
