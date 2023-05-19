import { NextApiRequest } from 'next';

export interface NextApiRequestWithUser extends NextApiRequest {
  userId: string;
}
