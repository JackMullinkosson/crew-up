// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/client'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
      }

      const { projectName, ownerId } = req.body;

      if (!projectName || projectName.length === 0) {
        return res.status(400).json({ message: 'Project name is required' });
      }

      const existingProject = await prisma.project.findFirst({
        where: {
          name: projectName
        }
      });

      if (existingProject) {
        return res.status(409).json({ message: 'Project already exists' });
      }

      const project = await prisma.project.create({
        data: {
          name: projectName,
          owner: {
            connect: {
              id: ownerId
            }
          }
        }
      });
  
      return res.status(200).json({ project });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
