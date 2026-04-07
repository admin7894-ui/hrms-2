require('dotenv').config();
const { PrismaClient } = require('../src/generated/client_v2');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const company = await prisma.company.upsert({
    where: { id: 'comp-seed-001' },
    update: {},
    create: {
      id: 'comp-seed-001',
      companyName: 'VVSPL',
      primaryCurrency: 'INR',
      country: 'India',
      registrationNo: 'VVSPL-REG-2020',
      isActive: true,        // ✅ Company uses isActive
    },
  });
  console.log('✅ Company created:', company.companyName);

  const adminRole = await prisma.securityRole.upsert({
    where: { id: 'role-admin-001' },
    update: {},
    create: {
      id: 'role-admin-001',
      companyId: company.id,
      roleCode: 'HR_ADMIN',
      roleName: 'HR Administrator',
      description: 'Full HRMS access',
      activeFlag: true,      // ✅ SecurityRole uses activeFlag
    },
  });

  const userRole = await prisma.securityRole.upsert({
    where: { id: 'role-user-001' },
    update: {},
    create: {
      id: 'role-user-001',
      companyId: company.id,
      roleCode: 'HR_USER',
      roleName: 'HR User',
      description: 'Standard HR access',
      activeFlag: true,      // ✅ SecurityRole uses activeFlag
    },
  });
  console.log('✅ Roles created');

  const passwordHash = await bcrypt.hash('Admin@123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@hrms.com' },
    update: {},
    create: {
      email: 'admin@hrms.com',
      passwordHash,
      roleId: adminRole.id,
      activeFlag: true,      // ✅ User uses activeFlag
    },
  });

  const hrPasswordHash = await bcrypt.hash('HRUser@123', 10);
  await prisma.user.upsert({
    where: { email: 'hruser@hrms.com' },
    update: {},
    create: {
      email: 'hruser@hrms.com',
      passwordHash: hrPasswordHash,
      roleId: userRole.id,
      activeFlag: true,      // ✅ User uses activeFlag
    },
  });
  console.log('✅ Users created');

  const locationType = await prisma.locationType.upsert({
    where: { id: 'loctype-seed-001' },
    update: {},
    create: {
      id: 'loctype-seed-001',
      locationTypeName: 'Business Group',
      isActive: true,        // ✅ LocationType uses isActive
    },
  });

  const location = await prisma.location.upsert({
    where: { id: 'loc-seed-001' },
    update: {},
    create: {
      id: 'loc-seed-001',
      companyId: company.id,
      locationTypeId: locationType.id,
      locationName: 'Head Office',
      address1: 'MG Road',
      city: 'Chandrapur',
      state: 'MH',
      country: 'India',
      pincode: '442401',
      isActive: true,        // ✅ Location uses isActive
    },
  });
  console.log('✅ Location created');

  const bg = await prisma.businessGroup.upsert({
    where: { id: 'bg-seed-001' },
    update: {},
    create: {
      id: 'bg-seed-001',
      companyId: company.id,
      bgLocationId: location.id,
      bgName: 'VVSPL Global',
      currencyCode: 'INR',
      isActive: true,        // ✅ BusinessGroup uses isActive
    },
  });
  console.log('✅ Business group created');

  await prisma.grade.upsert({
    where: { id: 'grade-seed-001' },
    update: {},
    create: {
      id: 'grade-seed-001',
      companyId: company.id,
      bgId: bg.id,
      gradeCode: 'GR-A',
      gradeName: 'Grade A - Executive',
      minSalary: 80000,
      maxSalary: 150000,
      isActive: true,        // ✅ Grade uses isActive
    },
  });
  console.log('✅ Grade created');

  await prisma.absenceType.createMany({
    skipDuplicates: true,
    data: [
      { companyId: company.id, bgId: bg.id, absenceCode: 'CL', absenceName: 'Casual Leave', entitlementPerYear: 12, carryForwardFlag: false, maxCarryDays: 0,  activeFlag: true },  // ✅ AbsenceType uses activeFlag
      { companyId: company.id, bgId: bg.id, absenceCode: 'SL', absenceName: 'Sick Leave',   entitlementPerYear: 12, carryForwardFlag: false, maxCarryDays: 0,  activeFlag: true },
      { companyId: company.id, bgId: bg.id, absenceCode: 'EL', absenceName: 'Earned Leave', entitlementPerYear: 18, carryForwardFlag: true,  maxCarryDays: 15, activeFlag: true },
    ],
  });
  console.log('✅ Absence types created');

  await prisma.elementType.createMany({
    skipDuplicates: true,
    data: [
      { companyId: company.id, bgId: bg.id, elementCode: 'BASIC', elementName: 'Basic Salary',         classification: 'Earnings',   processingPriority: 10,  recurringFlag: true, activeFlag: true },  // ✅ ElementType uses activeFlag
      { companyId: company.id, bgId: bg.id, elementCode: 'HRA',   elementName: 'House Rent Allowance', classification: 'Earnings',   processingPriority: 20,  recurringFlag: true, activeFlag: true },
      { companyId: company.id, bgId: bg.id, elementCode: 'PF',    elementName: 'Provident Fund',       classification: 'Deductions', processingPriority: 100, recurringFlag: true, activeFlag: true },
    ],
  });
  console.log('✅ Element types created');

  console.log('\n🎉 Seed complete!');
  console.log('Admin   → admin@hrms.com  / Admin@123');
  console.log('HR User → hruser@hrms.com / HRUser@123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());