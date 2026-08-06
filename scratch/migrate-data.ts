import { PrismaClient } from '../src/generated/prisma/client';
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const originalUrl = "postgresql://neondb_owner:npg_IwY2vpWaxeA4@ep-misty-resonance-ax1bhfoz-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
const restoredUrl = "postgresql://neondb_owner:npg_IwY2vpWaxeA4@ep-red-dust-axqbk914-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

async function main() {
  console.log("Connecting to Restored DB...");
  const restoredPool = new pg.Pool({ connectionString: restoredUrl, max: 1 });
  const restoredAdapter = new PrismaPg(restoredPool);
  const restoredPrisma = new PrismaClient({ adapter: restoredAdapter });
  
  // Fetch all old departments and faculty
  const oldDepartments = await restoredPrisma.department.findMany({
    include: { faculty: true }
  });
  console.log(`Found ${oldDepartments.length} departments in restored DB.`);
  await restoredPrisma.$disconnect();
  await restoredPool.end();

  console.log("Connecting to Original Production DB...");
  const originalPool = new pg.Pool({ connectionString: originalUrl, max: 1 });
  const originalAdapter = new PrismaPg(originalPool);
  const originalPrisma = new PrismaClient({ adapter: originalAdapter });
  
  // Wipe the 6 new departments that were added by mistake to avoid duplicates
  await originalPrisma.department.deleteMany({});
  
  console.log("Restoring old data to Original Production DB...");
  for (const dept of oldDepartments) {
    const { faculty, ...deptData } = dept;
    await originalPrisma.department.create({
      data: {
        ...deptData,
        faculty: {
          create: faculty.map(f => {
            const { departmentId, ...facData } = f;
            return facData;
          })
        }
      }
    });
    console.log(`Restored department: ${dept.name} with ${faculty.length} faculty.`);
  }
  
  await originalPrisma.$disconnect();
  console.log("Data migration complete! Original DB now has the restored data.");
}

main().catch(console.error);
