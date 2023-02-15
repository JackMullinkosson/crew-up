import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/client'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method !== "POST") {
        return res.status(405).json({ error: 'Method Not Allowed' });
        }
        const {name, email, phoneNumber, roleId, order} = req.body;
        console.log(req.body)
        
        const person = await prisma.person.create({
            data: {
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                order: order,
                role: {
                    connect:{
                        id: roleId
                    }
                }
            }
        })
        console.log(person)
        return res.status(200).json({  person });
    }
    catch (error) {
        return res.status(500).json({ error });
      }
}