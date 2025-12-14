import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Prevent Prisma from being initialized during build
if (process.env.VERCEL_ENV === 'production' && !process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not set, skipping Prisma initialization during build');
}
