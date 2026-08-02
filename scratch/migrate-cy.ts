import { prisma } from '../lib/prisma';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  console.log("Creating CY department...");

  const dept = await prisma.department.create({
    data: {
      name: "Cyber Security",
      shortName: "CY",
      description: "The Department of Cyber Security focuses on network engineering, computer science, information security, and related fields, training students to protect digital infrastructure in the modern world.",
    }
  });
  console.log("✓ Created Department:", dept.name);

  const facultyList = [
    {
      name: "MANOJ M J",
      designation: "Assistant Professor",
      specialization: "Computer Science and Engg",
      email: "manoj.nair.80.08@gmail.com",
      phone: "7034473897",
      isHOD: true,
    },
    {
      name: "ANJALY IYER S",
      designation: "Assistant Professor",
      specialization: "COMPUTER SCIENCE AND ENGG",
      email: "anjalyiyers@gmail.com",
      phone: "9496338216",
      isHOD: false,
    },
    {
      name: "ANJU K S",
      designation: "Assistant Professor",
      specialization: "COMPUTER SCIENCE AND ENGG",
      email: "anjuanjuks@gmail.com",
      phone: "9496745599",
      isHOD: false,
    },
    {
      name: "RAKHI K RAJ",
      designation: "Assistant Professor",
      specialization: "NETWORK ENGINEERING",
      email: "rakhikulirangal@gmail.com",
      phone: "9497027198",
      isHOD: false,
    },
    {
      name: "RAKHI ROY J",
      designation: "Assistant Professor",
      specialization: "COMPUTER SCIENCE AND ENGG",
      email: "rakhyroy@gmail.com",
      phone: "9446066020",
      isHOD: false,
    },
    {
      name: "RESHMI SOJAN",
      designation: "Assistant Professor",
      specialization: "COMPUTER SCIENCE AND ENGG",
      email: "reshmisojan88@gmail.com",
      phone: "9497285245",
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

  console.log("\n✅ CY migration complete! Total faculty:", facultyList.length);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
