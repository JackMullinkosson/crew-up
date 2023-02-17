import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/client'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    try {
      const {people}  = req.body;
      console.log('from the db call', people)
      await prisma.person.deleteMany()
      const updatedPeople = await prisma.person.createMany({
         data: [people]    
    });
      return res.status(200).json(updatedPeople);
    } catch (error) {
      console.error(`An error occurred while trying to edit people: ${error}`);
      return res.status(500).end(); // Internal Server Error
    }
  }