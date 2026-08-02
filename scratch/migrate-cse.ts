import { prisma } from "../lib/prisma";

async function run() {
  console.log("Starting data migration for CSE...");

  // Create CSE Department
  const dept = await prisma.department.create({
    data: {
      name: "Computer Science & Engineering",
      shortName: "CSE",
      description: "The Department of Computer Science & Engineering offers undergraduate programs focusing on computing, algorithms, hardware and software design, and network technologies.",
    }
  });

  console.log("Created Department:", dept.name);

  // Faculty Data
  const facultyList = [
    {
      name: "RAHUMATH BEEVI A",
      designation: "Assistant Professor",
      specialization: "COMPUTER SCIENCE & ENGG",
      email: "rahusalam@gmail.com",
      phone: "9207557512",
      isHOD: true,
      departmentId: dept.id,
    },
    {
      name: "Bichu Vijayan",
      designation: "Assistant Professor",
      specialization: "Computer Science &Engineering",
      email: "pvbichu@gmail.com",
      phone: "9495394511",
      isHOD: false,
      departmentId: dept.id,
    },
    {
      name: "JINCY ANNIE V V",
      designation: "Assistant Professor",
      specialization: "Computer Science &Engineering",
      email: "jincyannie88@gmail.com",
      phone: "9497279654",
      isHOD: false,
      departmentId: dept.id,
    },
    {
      name: "LINI ABRAHAM",
      designation: "Assistant Professor",
      specialization: "Computer Science &Engineering",
      email: "linirt33@gmail.com",
      phone: "8089112341",
      isHOD: false,
      departmentId: dept.id,
    },
    {
      name: "REGHUNATH E V",
      designation: "Assistant Professor",
      specialization: "COMPUTER ENGG & N/W TECHNOLOGY",
      email: "reghunath.ev@gmail.com",
      phone: "9846280912",
      isHOD: false,
      departmentId: dept.id,
    },
    {
      name: "Divya V V",
      designation: "TRADESMAN",
      specialization: "",
      email: "divyaw@gmail.com",
      phone: "8113968348",
      isHOD: false,
      departmentId: dept.id,
    },
  ];

  for (const f of facultyList) {
    await prisma.faculty.create({ data: f });
    console.log("Added faculty:", f.name);
  }

  console.log("Migration complete!");
}

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
