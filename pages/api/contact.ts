import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/client'
import { mailOptions, transporter } from '@/app/Components/NodeMailer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try{
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method Not Allowed' });
          }
        const {ownerId} = req.body

        const user = await prisma.user.findFirst({
          where: { id: ownerId }
        });

        const contact = await transporter.sendMail({
            ...mailOptions,
            subject: `${user.name} sent you a job offer!`,
            text: 'Hello',
            html: "<h1>Test title</h1><p>body test</p>"
        })
        console.log(contact)
        return res.status(200).json({success: true})
    }
    catch(error){
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
  }