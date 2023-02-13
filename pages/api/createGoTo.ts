import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/client'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const { listName, defaultRoles, people } = req.body;
        console.log(req.body)
        if (!listName || listName.length === 0) {
            return res.status(400).json({ message: 'List name is required' });
          }
          const existingList = await prisma.goTos.findFirst({
            where: {
              name: listName
            }
          });
    
          if (existingList) {
            return res.status(409).json({ message: 'List already exists' });
          }
          const goTo = await prisma.goTos.create({
            data: {
                name: listName,
                roles: {
                    create: defaultRoles.map((role: { name: String, people: Array<{ name: String, order: Number, id: Number, email: String, phoneNumber: String }> }) => ({
                        name: role.name,
                        people: {
                            create: people.map((person: { name: String, order: Number, id: Number, email: String, phoneNumber: String }) => ({
                                name: person.name,
                                order: person.order,
                                id: person.id,
                                email: person.email,
                                phoneNumber: person.phoneNumber,
                            }))
                        }
                    }))
                }
            }
        })
        return await res.status(200).json({ goTo });
    }
    catch(e){
        console.error(e)
    }
}