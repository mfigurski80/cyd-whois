// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type StatusReport = {
  status: string
  code: number
}

export default function handler(
  _: NextApiRequest,
  res: NextApiResponse<StatusReport>
) {
  res.status(200).json({ status: 'Active', code: 200 })
}
