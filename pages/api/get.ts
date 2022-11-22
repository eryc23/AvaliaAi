import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

type Data = {
  data?: any
  status: Boolean
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const {candidate, evaluator} = req.body;
    
  await prisma.candidates.findMany({
    where: {
        AND: [
            candidate,
            evaluator
        ]
    },
  }).then((response) => {
    res.status(200).json({data: response, status: true})
  }).catch(() => {
    res.status(500).json({status: false})
  });
}
