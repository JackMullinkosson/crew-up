import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const projects = await prisma.project.findMany({
        include: { dayDetails: true },
      });
      const project = projects.find(project => project.id === Number(id));
      return res.status(200).json(project);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  
