const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "country_master" (
          "country_id" SERIAL NOT NULL,
          "country_code" TEXT NOT NULL,
          "country_name" TEXT NOT NULL,
          "is_active" BOOLEAN NOT NULL DEFAULT true,
          "created_by" VARCHAR(50) NOT NULL,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

          CONSTRAINT "country_master_pkey" PRIMARY KEY ("country_id")
      );
    `);
    
    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "country_master_country_code_key" ON "country_master"("country_code");
    `);
    
    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "country_master_country_name_key" ON "country_master"("country_name");
    `);

    console.log('Table country_master created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
