const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createTable() {
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "city_masters" (
        "city_id" TEXT NOT NULL,
        "city_name" TEXT NOT NULL,
        "state" TEXT NOT NULL,
        "country" TEXT NOT NULL,
        "pincode" TEXT NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "city_masters_pkey" PRIMARY KEY ("city_id")
      );
    `);
    console.log('✅ CityMaster table created!');
  } catch (err) {
    console.error('❌ Failed to create table:', err);
  } finally {
    await prisma.$disconnect();
  }
}

createTable();
