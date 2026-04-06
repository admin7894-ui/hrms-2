const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // 1. Drop old table
    await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "city_masters" CASCADE;`);
    
    // 2. Create State Master
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "state_master" (
          "state_id" SERIAL NOT NULL,
          "state_code" TEXT NOT NULL,
          "state_name" TEXT NOT NULL,
          "country_id" INTEGER NOT NULL,
          "is_active" BOOLEAN NOT NULL DEFAULT true,
          "created_by" VARCHAR(50) NOT NULL,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

          CONSTRAINT "state_master_pkey" PRIMARY KEY ("state_id"),
          CONSTRAINT "state_master_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country_master"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE
      );
    `);
    
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "state_master_state_code_key" ON "state_master"("state_code");`);
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "state_master_state_name_country_id_key" ON "state_master"("state_name", "country_id");`);

    // 3. Create City Master
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "city_master" (
          "city_id" SERIAL NOT NULL,
          "city_code" TEXT NOT NULL,
          "city_name" TEXT NOT NULL,
          "state_id" INTEGER NOT NULL,
          "country_id" INTEGER NOT NULL,
          "is_active" BOOLEAN NOT NULL DEFAULT true,
          "created_by" VARCHAR(50) NOT NULL,
          "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

          CONSTRAINT "city_master_pkey" PRIMARY KEY ("city_id"),
          CONSTRAINT "city_master_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "state_master"("state_id") ON DELETE RESTRICT ON UPDATE CASCADE,
          CONSTRAINT "city_master_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country_master"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE
      );
    `);
    
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "city_master_city_code_key" ON "city_master"("city_code");`);
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "city_master_city_name_state_id_key" ON "city_master"("city_name", "state_id");`);

    console.log('Tables state_master and city_master created successfully');
  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
