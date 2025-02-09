import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateRecords() {
  const batchSize = 100; // Adjust as needed
  let updated = 0;

  while (true) {
    const students = await prisma.invoice.findMany({
      where: { userId: null },
      take: batchSize,
    });

    if (students.length === 0) break;

    await prisma.invoice.updateMany({
      where: { id: { in: students.map((p) => p.id) } },
      data: { userId: "" }, // Add user_id here
    });

    updated += students.length;
    console.log(`Updated ${updated} records...`);
  }

  console.log("Update complete");
  await prisma.$disconnect();
}

updateRecords();
