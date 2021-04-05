import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  const posts = await prisma.igrejas.findMany();
  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  //  res.end(JSON.stringify({ posts }));
  res.json(posts);
}
