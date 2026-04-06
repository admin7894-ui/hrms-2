const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  const cities = [
    { id: 'city_001', cityName: 'Chennai', state: 'Tamil Nadu', country: 'India', pincode: '600001' },
    { id: 'city_002', cityName: 'Mumbai', state: 'Maharashtra', country: 'India', pincode: '400001' },
    { id: 'city_003', cityName: 'Delhi', state: 'Delhi', country: 'India', pincode: '110001' },
    { id: 'city_004', cityName: 'Bangalore', state: 'Karnataka', country: 'India', pincode: '560001' },
    { id: 'city_005', cityName: 'Hyderabad', state: 'Telangana', country: 'India', pincode: '500001' },
  ];

  try {
    for (const city of cities) {
      await prisma.$executeRawUnsafe(`
        INSERT INTO "city_masters" ("city_id", "city_name", "state", "country", "pincode")
        VALUES ('${city.id}', '${city.cityName}', '${city.state}', '${city.country}', '${city.pincode}')
        ON CONFLICT ("city_id") DO UPDATE SET
          "city_name" = EXCLUDED."city_name",
          "state" = EXCLUDED."state",
          "country" = EXCLUDED."country",
          "pincode" = EXCLUDED."pincode"
      `);
    }
    console.log('✅ CityMaster seeded!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
