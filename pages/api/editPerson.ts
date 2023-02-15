import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/client'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const {name, email, phoneNumber, roleName, order, id} = req.body
        const person = await prisma.person.update({
            where: {
                id: id
            },
            data: {
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                roleName: roleName,
                order: order
            }
          });
          return res.status(200).json( person );
        } catch (error) {
          console.error(`An error occurred while trying to edit person ${error}`);
        }
      }