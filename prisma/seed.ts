import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("Password123!", 12);

  const user = await prisma.user.upsert({
    where: { email: "demo@noteflow.app" },
    update: {},
    create: { name: "Demo User", email: "demo@noteflow.app", password },
  });

  await prisma.note.deleteMany({ where: { userId: user.id } });
  await prisma.note.createMany({
    data: [
      { userId: user.id, title: "Project requirements", content: "Auth, CRUD, search, pinning.", isPinned: true },
      { userId: user.id, title: "React hooks", content: "useState, useEffect, useOptimistic." },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
