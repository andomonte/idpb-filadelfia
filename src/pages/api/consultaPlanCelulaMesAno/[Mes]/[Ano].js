import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { Mes, Ano },
  } = req;

  const inicioAno = `${Ano}-${Mes}-01`;
  const finalAno = `${Ano}-${Mes}-31`;

  // const action = `${rel}.findMany`
  const posts = await prisma.plancelula
    .findMany({
      where: {
        Data: { lte: new Date(finalAno), gte: new Date(inicioAno) },
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  res.json(posts);
}
