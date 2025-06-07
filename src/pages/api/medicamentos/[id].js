import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const id = parseInt(req.query.id);

  if (req.method === 'GET') {
    const data = await prisma.medicamento.findUnique({ where: { CodMedicamento: id } });
    return res.status(200).json(data);
  }

  if (req.method === 'PUT') {
    const updated = await prisma.medicamento.update({
      where: { CodMedicamento: id },
      data: req.body,
    });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    await prisma.medicamento.delete({ where: { CodMedicamento: id } }); // Cascada
    return res.status(204).end();
  }

  res.status(405).json({ message: 'Método no permitido' });
}
