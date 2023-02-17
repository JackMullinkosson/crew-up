import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/client'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
      return res.status(405).end(); // Method Not Allowed
    }
    try {
      const {people}  = req.body;
      console.log(people)
      let updatedPeople = []
      people.map(async (crew)=>{
      const newPerson = await prisma.person.update({
          where: {
            id: crew.id
          },
          data: {
            order: crew.index
          }
        })
      updatedPeople.push(newPerson)
      })
      return res.status(200).json(updatedPeople);
    } catch (error) {
      console.error(`An error occurred while trying to edit people: ${error}`);
    }
  }