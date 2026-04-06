const prisma = require('../src/config/prisma');

async function test() {
  try {
    const states = await prisma.stateMaster.findMany();
    console.log('States found:', states.length);
    const cities = await prisma.cityMaster.findMany();
    console.log('Cities found:', cities.length);
  } catch (err) {
    console.error('Test failed:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
