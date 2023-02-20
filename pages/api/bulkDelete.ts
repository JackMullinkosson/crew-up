import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/client'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        await prisma.person.deleteMany();
        } catch (error) {
          console.error(`An error occurred while trying to delete person ${error}`);
        }
      }