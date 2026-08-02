import { prisma } from '../lib/prisma';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  console.log("Creating Polymer Engineering department...");

  const dept = await prisma.department.create({
    data: {
      name: "Polymer Engineering",
      shortName: "PE",
      description: "The Department of Polymer Engineering specializes in polymer technology, polymer science, nanocomposites, and related fields, preparing students for careers in the rubber, plastics, and advanced materials industry.",
    }
  });
  console.log("✓ Created Department:", dept.name);

  const facultyList = [
    // HOD
    {
      name: "SREELETHA RAJAN",
      designation: "Assistant Professor",
      specialization: "Polymer Technology",
      email: "its4sree@yahoo.co.in",
      phone: "9447895087",
      isHOD: true,
    },
    // Principal listed separately on their site
    {
      name: "Dr. JOSE SEBASTIAN",
      designation: "Principal & Associate Professor",
      specialization: "Polymer Nanocomposites",
      email: "joseuce@gmail.com",
      phone: "9447980555",
      isHOD: false,
    },
    // Teaching Faculty
    {
      name: "ARUN RAJU",
      designation: "Assistant Professor",
      specialization: "Polymer Technology",
      email: "arunraju.polymer@gmail.com",
      phone: "8111970235",
      isHOD: false,
    },
    {
      name: "SHEEBA JOHN",
      designation: "Assistant Professor",
      specialization: "Polymer Science and Technology",
      email: "sheebamadhu75@gmail.com",
      phone: "9400767305",
      isHOD: false,
    },
  ];

  for (const f of facultyList) {
    await prisma.faculty.create({
      data: {
        ...f,
        specialization: f.specialization || null,
        image: null,
        departmentId: dept.id,
      }
    });
    console.log(`✓ Added: ${f.name}`);
  }

  console.log("\n✅ Polymer Engineering migration complete! Total faculty:", facultyList.length);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
