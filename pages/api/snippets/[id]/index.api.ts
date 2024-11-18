import { NextApiResponse } from 'next';

import { requireAuth } from '../../middlewares/require-auth';
import { createRouter } from 'next-connect';

import { deleteSnippet } from '@/pages/api/snippets/[id]/delete-snippet';
import { updateSnippet } from '@/pages/api/snippets/[id]/update-snippet';
import { NextApiRequestWithUser } from '@/types/api';

const router = createRouter<NextApiRequestWithUser, NextApiResponse>()
  .use(requireAuth)
  .post(updateSnippet)
  .delete(deleteSnippet);

export default router.handler();
