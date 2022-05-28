import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { rolMembro },
  } = req;
  // //console.log('dados do api', codigoIgreja, mes, ano);
  // const action = `${rel}.findMany`
  const posts = await prisma.presCelula
    .findMany({
      where: {
        Rol: Number(rolMembro),
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  res.json(posts);
}
