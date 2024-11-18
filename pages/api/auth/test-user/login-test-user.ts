import { NextApiRequest, NextApiResponse } from 'next';

import { setCookie } from 'cookies-next';
import { encode } from 'next-auth/jwt';
import { v4 as uuidv4 } from 'uuid';

export async function loginTestUser(req: NextApiRequest, res: NextApiResponse) {
  const dateTimeNow = Math.floor(Date.now() / 1000);
  const expiry = dateTimeNow + 30 * 24 * 60 * 60; // 30 days
  const cookieName = 'next-auth.session-token';

  const cookieValue = await encode({
    token: {
      sub: process.env.TEST_USER_ID,
      email: process.env.TEST_USER_EMAIL,
      tokenType: 'Bearer',
      accessToken: 'dummy',
      iat: dateTimeNow,
      exp: expiry,
      jti: uuidv4(),
    },
    secret: process.env.NEXTAUTH_SECRET as string,
  });

  setCookie(cookieName, cookieValue, {
    req,
    res,
    httpOnly: true,
  });

  res.status(200).end();
}
