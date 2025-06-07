import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const ordenes = await prisma.ordenCompra.findMany({
      include: { laboratorio: true, detalles: true }
    });
    return res.status(200).json(ordenes);
  }

  if (req.method === 'POST') {
    const nueva = await prisma.ordenCompra.create({ data: req.body });
    return res.status(201).json(nueva);
  }

  res.status(405).json({ message: 'Método no permitido' });
}
