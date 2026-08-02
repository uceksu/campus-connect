import { prisma } from '../lib/prisma';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  console.log("Creating ECE department...");

  const dept = await prisma.department.create({
    data: {
      name: "Electronics & Communication Engineering",
      shortName: "ECE",
      description: "The Department of Electronics & Communication Engineering covers applied electronics, embedded systems, VLSI design, communication systems, and optoelectronics, equipping students with skills for the modern electronics industry.",
    }
  });
  console.log("✓ Created Department:", dept.name);

  const facultyList = [
    {
      name: "ANISH M P",
      designation: "Assistant Professor",
      specialization: "APPLIED ELECTRONICS",
      email: "mpanish@gmail.com",
      phone: "9744254115",
      isHOD: true,
    },
    {
      name: "AMJADHA A",
      designation: "Assistant Professor",
      specialization: "APPLIED ELECTRONICS",
      email: "amjadha786@gmail.com",
      phone: "9567612847",
      isHOD: false,
    },
    {
      name: "ASHA JAYAPRAKASH",
      designation: "Assistant Professor",
      specialization: "OPTOELECTRONICS",
      email: "ashajp19@gmail.com",
      phone: "9895798149",
      isHOD: false,
    },
    {
      name: "KRISHNAPRIYA B",
      designation: "Assistant Professor",
      specialization: "COMMUNICATION SYSTEMS",
      email: "emailkrishnapriya@gmail.com",
      phone: "9495526033",
      isHOD: false,
    },
    {
      name: "NIMITHA K E",
      designation: "Assistant Professor",
      specialization: "Applied Electronics",
      email: "nimithake@gmail.com",
      phone: "9497032430",
      isHOD: false,
    },
    {
      name: "REEJA SEBASTIAN",
      designation: "Assistant Professor",
      specialization: "EMBEDDED SYSTEM",
      email: "sebastian.reeja@gmail.com",
      phone: "9605713332",
      isHOD: false,
    },
    {
      name: "RENJITH V R",
      designation: "Assistant Professor",
      specialization: "VLSI DESIGN",
      email: "renjithvr888@gmail.com",
      phone: "9496219451",
      isHOD: false,
    },
    {
      name: "SANJU S",
      designation: "Assistant Professor",
      specialization: "CONTROL AND INSTRUMENTATION",
      email: "sanjusrn@gmail.com",
      phone: "9744253383",
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

  console.log("\n✅ ECE migration complete! Total faculty:", facultyList.length);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
