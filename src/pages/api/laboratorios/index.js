import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = await prisma.laboratorio.findMany();
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const nuevo = await prisma.laboratorio.create({ data: req.body });
    return res.status(201).json(nuevo);
  }

  res.status(405).json({ message: 'Método no permitido' });
}
