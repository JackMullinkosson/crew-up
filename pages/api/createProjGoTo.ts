import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/client'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const {thisGoTo, defaultGoTo, projectId, projectName, roles, people } = req.body;
      
        const goTo = await prisma.goTos.create({
            data: {
            name: `${projectName} Go-To List`,
            icon: thisGoTo.icon,
            defaultGoTo: defaultGoTo,
            project: {
                connect:{
                id: projectId
                }
            }
            }
        });
  
         const updatedGoTo = await prisma.goTos.update({
            where: { id: goTo.id },
            data: {
            roles: {
                create: roles.map((role: { name: String, people: { name: String, email: String, phoneNumber: String, order: Number }[] }) => ({
                name: role.name,
                people: {
                    create: people.map((person: {name: String, email: String, phoneNumber: String, order: Number}) =>({
                    name: person.name,
                    email: person.email,
                    phoneNumber: person.phoneNumber,
                    order: person.order,
                    goTo: {
                        connect:{
                        id: goTo.id
                        }
                    }
                    }))
                }
                }))
            }
            },
            include: {
            roles: {
                include: {
                people: true
                }
            }
            }
        });
        return await res.status(200).json({ updatedGoTo });
    }
    catch(e){
        console.error(e)
    }
}