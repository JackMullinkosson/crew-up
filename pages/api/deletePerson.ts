import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/client'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const {id} = req.body
        await prisma.person.delete({
            where: {
              id: id
            }
          });
          console.log(`Person with id ${id} was successfully deleted.`);
        } catch (error) {
          console.error(`An error occurred while trying to delete person ${error}`);
        }
      }