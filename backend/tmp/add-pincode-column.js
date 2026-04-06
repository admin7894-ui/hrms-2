const prisma = require('../src/config/prisma');

async function main() {
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE city_master ADD COLUMN IF NOT EXISTS pincode TEXT NOT NULL DEFAULT '000000';`);
    console.log('Pincode column added successfully');
  } catch (err) {
    console.error('Error adding pincode column:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
