import { NextApiResponse } from 'next';

import { requireAuth } from '../../middlewares/require-auth';
import { deleteSolution } from './delete-solution';
import { getSolution } from './get-solution';
import { updateSolution } from './update-solution';
import { createRouter } from 'next-connect';

import { NextApiRequestWithUser } from '@/types/api';

const router = createRouter<NextApiRequestWithUser, NextApiResponse>()
  .use(requireAuth)
  .get(getSolution)
  .post(updateSolution)
  .delete(deleteSolution);

export default router.handler();
