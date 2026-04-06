require('dotenv').config();
const { PrismaClient } = require('../src/generated/client_v2');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Company → isActive (line 18)
  const company = await prisma.company.upsert({
    where: { id: 'comp-seed-001' },
    update: {},
    create: {
      id: 'comp-seed-001',
      companyName: 'VVSPL',
      primaryCurrency: 'INR',
      country: 'India',
      registrationNo: 'VVSPL-REG-2020',
      isActive: true,
    },
  });
  console.log('✅ Company created:', company.companyName);

  // SecurityRole → activeFlag (line 840)
  const adminRole = await prisma.securityRole.upsert({
    where: { id: 'role-admin-001' },
    update: {},
    create: {
      id: 'role-admin-001',
      companyId: company.id,
      roleCode: 'HR_ADMIN',
      roleName: 'HR Administrator',
      description: 'Full HRMS access',
      activeFlag: true,
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
      activeFlag: true,
    },
  });
  console.log('✅ Roles created');

  // User → activeFlag (line 913)
  const passwordHash = await bcrypt.hash('Admin@123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@hrms.com' },
    update: {},
    create: {
      email: 'admin@hrms.com',
      passwordHash,
      roleId: adminRole.id,
      activeFlag: true,
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
      activeFlag: true,
    },
  });
  console.log('✅ Users created');

  // LocationType → isActive (line 61)
  const locationType = await prisma.locationType.upsert({
    where: { id: 'loctype-seed-001' },
    update: {},
    create: {
      id: 'loctype-seed-001',
      locationTypeName: 'Business Group',
      isActive: true,
    },
  });

  // Location → isActive (line 84)
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
      isActive: true,
    },
  });
  console.log('✅ Location created');

  // BusinessGroup → activeFlag (line 149)
  const bg = await prisma.businessGroup.upsert({
    where: { id: 'bg-seed-001' },
    update: {},
    create: {
      id: 'bg-seed-001',
      companyId: company.id,
      bgLocationId: location.id,
      bgName: 'VVSPL Global',
      currencyCode: 'INR',
      activeFlag: true,
    },
  });
  console.log('✅ Business group created');

  // Grade → activeFlag (line 284)
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
      activeFlag: true,
    },
  });
  console.log('✅ Grade created');

  // AbsenceType → activeFlag (line 752)
  await prisma.absenceType.createMany({
    skipDuplicates: true,
    data: [
      { companyId: company.id, bgId: bg.id, absenceCode: 'CL', absenceName: 'Casual Leave', entitlementPerYear: 12, carryForwardFlag: false, maxCarryDays: 0,  activeFlag: true },
      { companyId: company.id, bgId: bg.id, absenceCode: 'SL', absenceName: 'Sick Leave',   entitlementPerYear: 12, carryForwardFlag: false, maxCarryDays: 0,  activeFlag: true },
      { companyId: company.id, bgId: bg.id, absenceCode: 'EL', absenceName: 'Earned Leave', entitlementPerYear: 18, carryForwardFlag: true,  maxCarryDays: 15, activeFlag: true },
    ],
  });
  console.log('✅ Absence types created');

  // ElementType → activeFlag (line 616)
  await prisma.elementType.createMany({
    skipDuplicates: true,
    data: [
      { companyId: company.id, bgId: bg.id, elementCode: 'BASIC', elementName: 'Basic Salary',         classification: 'Earnings',   processingPriority: 10,  recurringFlag: true, activeFlag: true },
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