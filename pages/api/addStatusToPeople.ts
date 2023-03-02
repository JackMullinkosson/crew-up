import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/client'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try{
        const { goToId } = req.body;
        const status = "Awaiting response.."
        await prisma.person.updateMany({
            where: {
                goToId: goToId
            },
            data:{
                status: status,
                statusIcon: 0
            }
        });
        const people = await prisma.person.findMany({
            orderBy: {
              order: 'asc'
            }
        });
        return res.status(200).json(people)
    } catch (error) {
      return res.status(500).json(error)
    }
  }