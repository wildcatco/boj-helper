import { NextApiRequest, NextApiResponse } from 'next';

import { loginTestUser } from './login-test-user';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>() //
  .post(loginTestUser);

export default router.handler();
