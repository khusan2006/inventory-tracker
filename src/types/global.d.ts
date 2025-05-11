// This file contains global type declarations and module declarations

// Additional type declarations can be added here as needed

// Path alias declarations
declare module '@/lib/prisma' {
  import { PrismaClient } from '@prisma/client';
  
  const prisma: PrismaClient;
  export { prisma };
  export default prisma;
}
