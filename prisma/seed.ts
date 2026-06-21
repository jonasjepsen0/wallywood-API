import "dotenv/config";
import bcrypt from "bcrypt";
import { readFileSync } from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db"
});
const prisma = new PrismaClient({ adapter });

const dataDir = path.join(import.meta.dirname, "data", "csv");

const readCsv = <T = any>(filename: string): T[] => {
  const file = readFileSync(path.join(dataDir, filename));
  return parse(file, {
    columns: true,
    skip_empty_lines: true,
    cast: true,
    trim: true
  }) as T[];
};

const main = async () => {
  console.log("Sletter eksisterende data...");
  await prisma.genrePosterRel.deleteMany();
  await prisma.poster.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();

  console.log("Seeder users...");
  const users = readCsv<any>("user.csv");
  for (const u of users) {
    await prisma.user.create({
      data: {
        id: u.id,
        firstname: u.firstname,
        lastname: u.lastname ?? "",
        email: u.email,
        password: await bcrypt.hash(u.password, 10),
        role: u.role,
        isActive: u.isActive === 1 || u.isActive === true
      }
    });
  }
  console.log(`Seeded ${users.length} users`);

  console.log("Seeder genres...");
  const genres = readCsv<any>("genre.csv");
  for (const g of genres) {
    await prisma.genre.create({
      data: {
        id: g.id,
        title: g.title,
        slug: g.slug,
        createdAt: new Date(g.createdAt),
        updatedAt: new Date(g.updatedAt)
      }
    });
  }
  console.log(`Seeded ${genres.length} genres`);

console.log("Seeder posters...");
  const posters = readCsv<any>("poster.csv");
  for (const p of posters) {
    await prisma.poster.create({
      data: {
        id: p.id,
        name: String(p.name),
        slug: String(p.slug),
        description: String(p.description ?? ""),
        image: String(p.image),
        width: p.width,
        height: p.height,
        price: p.price,
        stock: p.stock,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt)
      }
    });
  }
  console.log(`Seeded ${posters.length} posters`);

  console.log("Seeder genre-poster relationer...");
  const rels = readCsv<{ genreId: number; posterId: number }>("genrePosterRel.csv");
  await prisma.genrePosterRel.createMany({ data: rels });
  console.log(`Seeded ${rels.length} genre-poster relations`);
};

main()
  .then(() => {
    console.log("Seed complete");
    return prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });