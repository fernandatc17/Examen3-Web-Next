import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const medicamentos = await prisma.medicamento.findMany({
      include: { detallesOrdenCompra: true }
    });
    return res.status(200).json(medicamentos);
  }

  if (req.method === 'POST') {
    const nuevo = await prisma.medicamento.create({ data: req.body });
    return res.status(201).json(nuevo);
  }

  res.status(405).json({ message: 'Método no permitido' });
}
