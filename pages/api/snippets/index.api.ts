import { NextApiResponse } from 'next';

import { requireAuth } from '../middlewares/require-auth';
import { createRouter } from 'next-connect';

import { createSnippet } from '@/pages/api/snippets/create-snippet';
import { getSnippets } from '@/pages/api/snippets/get-snippets';
import { NextApiRequestWithUser } from '@/types/api';

const router = createRouter<NextApiRequestWithUser, NextApiResponse>()
  .use(requireAuth)
  .get(getSnippets)
  .post(createSnippet);

export default router.handler();
