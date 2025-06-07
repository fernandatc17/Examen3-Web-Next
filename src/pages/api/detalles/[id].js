import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const id = parseInt(req.query.id);

  if (req.method === 'GET') {
    const data = await prisma.detalleOrdenCompra.findUnique({
      where: { id },
      include: { medicamento: true, ordenCompra: true }
    });
    return res.status(200).json(data);
  }

  if (req.method === 'PUT') {
    const updated = await prisma.detalleOrdenCompra.update({
      where: { id },
      data: req.body
    });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    await prisma.detalleOrdenCompra.delete({ where: { id } });
    return res.status(204).end();
  }

  res.status(405).json({ message: 'Método no permitido' });
}
