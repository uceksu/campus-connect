import { readFileSync } from "fs";
const env = readFileSync(".env", "utf-8");
env.split("\n").forEach(line => {
  const [key, ...values] = line.split("=");
  if (key && values.length > 0) {
    process.env[key.trim()] = values.join("=").trim().replace(/^"|"$/g, '');
  }
});
import { prisma } from "./lib/prisma";

const uceDepartments = [
  { name: "Computer Science", shortName: "CS", description: "Department of Computer Science" },
  { name: "Electronics and Communication", shortName: "ECE", description: "Department of Electronics and Communication" },
  { name: "Electrical and Electronics", shortName: "EEE", description: "Department of Electrical and Electronics" },
  { name: "Cyber Security", shortName: "CY", description: "Department of Cyber Security" },
  { name: "AI & Data Science", shortName: "AD", description: "Department of AI & Data Science" },
  { name: "Polymer Engineering", shortName: "PO", description: "Department of Polymer Engineering" }
];

async function main() {
  const existing = await prisma.department.findMany();
  if (existing.length > 0) {
    console.log("Found existing departments, deleting them...");
    await prisma.department.deleteMany({});
  }

  console.log("Seeding correct UCE Departments...");
  for (const dept of uceDepartments) {
    await prisma.department.create({ data: dept });
  }
  console.log("Seeded UCE Departments successfully.");
}

main().finally(() => prisma.$disconnect());
