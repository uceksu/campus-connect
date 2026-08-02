import { prisma } from '../lib/prisma';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  console.log("Creating SH department...");

  const dept = await prisma.department.create({
    data: {
      name: "Science & Humanities",
      shortName: "SH",
      description: "The Department of Science & Humanities provides a strong foundation in basic sciences and communication skills, essential for all engineering disciplines.",
    }
  });
  console.log("✓ Created Department:", dept.name);

  const facultyList = [
    {
      name: "RINTU JOSEPH",
      designation: "Assistant Professor",
      specialization: "Statistics",
      email: "rintujoyal@gmail.com",
      phone: "8547544195",
      isHOD: true,
    },
    {
      name: "INDU RAJENDRAN",
      designation: "Assistant Professor",
      specialization: null,
      email: "indurajendran7@gmail.com",
      phone: "8086198893",
      isHOD: false,
    },
    {
      name: "SREEJA JAYASREE",
      designation: "Assistant Professor",
      specialization: "Electronics",
      email: "sreejassreeji@gmail.com",
      phone: "9447104944",
      isHOD: false,
    },
    {
      name: "SRUTHI MOL BABY",
      designation: "Assistant Professor",
      specialization: null,
      email: "sruthi.vilphi@yahoo.com",
      phone: "8156877285",
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

  console.log("\n✅ SH migration complete! Total faculty:", facultyList.length);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
