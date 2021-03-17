import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllServers() {
  return await prisma.server.findMany();
}

export async function getServerByName(name: string) {
  return await prisma.server.findUnique({
    where: {
      name: name,
    },
  });
}

export async function createServer(data: Prisma.ServerCreateInput) {
  await prisma.server.create({
    data: data,
  });
}
