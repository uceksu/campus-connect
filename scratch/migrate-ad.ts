import { prisma } from '../lib/prisma';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  console.log("Creating AD department...");

  const dept = await prisma.department.create({
    data: {
      name: "Artificial Intelligence & Data Science",
      shortName: "AD",
      description: "The Department of Artificial Intelligence & Data Science focuses on machine learning, data analytics, intelligent systems, and modern computational techniques to solve complex real-world problems.",
    }
  });
  console.log("✓ Created Department:", dept.name);

  const facultyList = [
    {
      name: "RAJEESH BABU",
      designation: "Assistant Professor",
      specialization: "VLSI",
      email: "hodad@ucet.ac.in",
      phone: "9446355631",
      isHOD: true,
    },
    {
      name: "ANSAR M M",
      designation: "Assistant Professor",
      specialization: "APPLIED ELECTRONICS",
      email: "ansarmytheen@gmail.com",
      phone: "9961206019",
      isHOD: false,
    },
    {
      name: "DEEPU S",
      designation: "Assistant Professor",
      specialization: "Communication Systems",
      email: "deeps422@gmail.com",
      phone: "9846906670",
      isHOD: false,
    },
    {
      name: "JISHA JAMES",
      designation: "Assistant Professor",
      specialization: "Information Systems",
      email: "jishajames90@gmail.com",
      phone: "9744870462",
      isHOD: false,
    },
    {
      name: "SEETHU THOMAS",
      designation: "Assistant Professor",
      specialization: "Systems Engineering",
      email: "seethus22@gmail.com",
      phone: "9809003781",
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

  console.log("\n✅ AD migration complete! Total faculty:", facultyList.length);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
