import { PrismaClient } from '@prisma/client';
import path from 'path';

const globalForPrisma = global;

let prismaOptions = {
  log: ['query'],
};

// Next.js production builds can mess up sqlite relative paths. 
// This forces Prisma to look at the exact root folder where the pre-built db lives.
if (process.env.NODE_ENV === 'production') {
  const dbPath = path.resolve(process.cwd(), 'dev.db');
  prismaOptions.datasources = {
    db: {
      url: `file:${dbPath}`,
    },
  };
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient(prismaOptions);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
