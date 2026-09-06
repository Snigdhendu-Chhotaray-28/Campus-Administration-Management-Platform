// Mock database layer for the frontend-only CAMP platform
// This avoids Prisma Client initialization and driver adapter errors during Next.js static builds

export const db = {
  user: {
    findUnique: async () => null,
    findMany: async () => [],
    count: async () => 3,
  },
  notice: {
    findMany: async () => [],
    count: async () => 4,
  },
  course: {
    findMany: async () => [],
    count: async () => 0,
  },
  enrollment: {
    findMany: async () => [],
  },
  payment: {
    findMany: async () => [],
    create: async () => ({ id: 'mock_payment' }),
    count: async () => 6,
  },
  grade: {
    findMany: async () => [],
  }
} as any;
