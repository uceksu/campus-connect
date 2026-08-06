import { prisma } from "./lib/prisma";
async function main() {
  const depts = await prisma.department.findMany();
  console.log(depts);
}
main().finally(() => prisma.$disconnect());
