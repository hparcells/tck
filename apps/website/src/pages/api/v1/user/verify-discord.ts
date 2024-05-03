import { NextApiRequest, NextApiResponse } from 'next';
import { getUserById, verifyDiscord } from 'database';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken, userId } = req.body;

  const user = await getUserById(userId);
  if (!user) {
    res.status(401).end();
    return;
  }

  if (!accessToken) {
    res.status(400).end();
    return;
  }

  const result = await verifyDiscord(accessToken, userId);
  if (!result) {
    res.status(500).end();
    return;
  }

  res.status(200).end();
}

export default handler;
