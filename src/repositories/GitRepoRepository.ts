import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type GitRepo = {
  name: string;
  path: string;
  serverId: number;
};

export async function getAllGitRepositories() {
  return await prisma.gitRepo.findMany();
}

export async function getGitRepositoryByName(name: string) {
  try {
    const gitRepo = await prisma.gitRepo.findUnique({
      where: {
        name,
      },
    });
    if (!gitRepo) {
      throw new Error('No such repo');
    }
    return gitRepo;
  } catch (error) {
    return error;
  }
}

export async function addGitRepository(data: GitRepo) {
  const { name, path, serverId } = data;
  await prisma.gitRepo.create({
    data: {
      name,
      path,
      server: {
        connect: {
          id: serverId,
        },
      },
    },
  });
}
