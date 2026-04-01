const prisma = require('../config/prisma');

const getDashboard = async (req, res, next) => {
  try {
    const [
      totalEmployees,
      activeAssignments,
      openRequisitions,
      pendingAbsences,
      totalPayroll,
      recentHires,
      upcomingBirthdays,
    ] = await Promise.all([
      prisma.person.count({ where: { activeFlag: true, personType: 'EMP' } }),
      prisma.assignment.count({ where: { activeFlag: true } }),
      prisma.requisition.count({ where: { activeFlag: true, requisitionStatus: 'Open' } }),
      prisma.absence.count({ where: { activeFlag: true, status: 'Pending' } }),
      prisma.payrollRun.aggregate({ where: { runStatus: 'Completed' }, _sum: { totalNet: true } }),
      prisma.person.findMany({
        where: { activeFlag: true },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, firstName: true, lastName: true, email: true, hireDate: true, createdAt: true },
      }),
      prisma.person.findMany({
        where: { activeFlag: true },
        take: 5,
        select: { id: true, firstName: true, lastName: true, dateOfBirth: true },
      }),
    ]);

    res.json({
      totalEmployees,
      activeAssignments,
      openRequisitions,
      pendingAbsences,
      totalPayrollDisbursed: totalPayroll._sum.totalNet || 0,
      recentHires,
      upcomingBirthdays,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getDashboard };
