import { PrismaClient } from '@prisma/client';

type GlobalThis = typeof globalThis;

interface GlobalThisWithPrisma extends GlobalThis {
  prisma?: PrismaClient;
}

const globalWithprisma: GlobalThisWithPrisma = globalThis;

const client = globalWithprisma.prisma || new PrismaClient();
if (process.env.NODE_ENV === 'production') globalWithprisma.prisma = client;

export default client;
