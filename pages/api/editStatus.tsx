import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/client'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const { status, statusIcon, id} = req.body
        console.log(req.body)
        const person = await prisma.person.update({
            where: {
                id: id
            },
            data: {
                status: status,
                statusIcon: statusIcon,
            }
        })
        return res.status(200).json( person );
    }
    catch(e){
        console.error(e)
    }
    
}