import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const detalles = await prisma.detalleOrdenCompra.findMany({
      include: { medicamento: true, ordenCompra: true }
    });
    return res.status(200).json(detalles);
  }

  if (req.method === 'POST') {
    const nuevo = await prisma.detalleOrdenCompra.create({ data: req.body });
    return res.status(201).json(nuevo);
  }

  res.status(405).json({ message: 'Método no permitido' });
}
