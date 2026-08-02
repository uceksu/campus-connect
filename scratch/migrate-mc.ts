import { prisma } from '../lib/prisma';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  console.log("Creating Mechanical & Civil Engineering department...");

  const dept = await prisma.department.create({
    data: {
      name: "Mechanical & Civil Engineering",
      shortName: "MC",
      description: "Note: The Mechanical & Civil Engineering branches are currently discontinued, but the faculty continue to serve the institution.",
    }
  });
  console.log("✓ Created Department:", dept.name);

  const facultyList = [
    {
      name: "THIRUMANAS K R",
      designation: "Assistant Professor",
      specialization: "Industrial Engineering",
      email: "thirumanaskr@gmail.com",
      phone: "9961471499",
      isHOD: true,
    },
    {
      name: "Dr. NIRANJANA THOMAS",
      designation: "Assistant Professor",
      specialization: null,
      email: "tniranjana14@gmail.com",
      phone: "9446597393",
      isHOD: false,
    },
  ];

  for (const f of facultyList) {
    await prisma.faculty.create({
      data: {
        ...f,
        image: null,
        departmentId: dept.id,
      }
    });
    console.log(`✓ Added: ${f.name}`);
  }

  console.log("\n✅ Mechanical & Civil Engineering migration complete! Total faculty:", facultyList.length);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
