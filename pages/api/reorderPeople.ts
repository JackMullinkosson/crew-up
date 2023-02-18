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
      for (const person of people) {
        const {name, email, phoneNumber, roleId, order, id} = person;
        const newPerson = await prisma.person.update({
          where: { id },
          data: { name, email, phoneNumber, roleId, order, id },
        });
        updatedPeople.push(newPerson)
      }
      return res.status(200).json(updatedPeople);
      }
     catch (error) {
      console.error(`An error occurred while trying to edit people: ${error}`);
    }
  }