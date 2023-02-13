import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const goTo = await prisma.goTos.findFirst({
      where: { id: Number(id) },
      include: { roles: true },
    });
    return res.status(200).json(goTo);
  } catch (error) {
    return res.status(500).json(error);
  }
}

  