import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

type Data = {
  status: Boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const {candidate, group, evaluator, skills} = req.body;

  await prisma.candidates.create({
    data: {
      candidate, group, evaluator, skills
    }
  }).then(() => {
    res.status(200).json({status: true})
  }).catch(() => {
    res.status(500).json({status: false})
  });
}
