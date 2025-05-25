import { PrismaClient } from '../src/generated/prisma';
// import { v4 as uuidv4 } from 'uuid'; // Not needed anymore

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding skipped as per user request. Database will start clean.');
  // All previous seeding logic has been removed.
  // If you want to re-enable seeding in the future, you can:
  // 1. Restore the previous content of this file.
  // 2. Ensure the seed data is compatible with the multi-tenancy schema 
  //    (i.e., includes companyId for all relevant records and creates companies/users).
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 