const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const crudController = require('../controllers/crudController');
const authController = require('../controllers/authController');
const { getDashboard } = require('../controllers/dashboardController');
const { getCityDetails } = require('../controllers/locationController');
const countryController = require('../controllers/countryController');
const stateController = require('../controllers/stateController');
const cityController = require('../controllers/cityController');
const { validate } = require('../middleware/validate');

// Auth routes
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);
router.get('/auth/me', authenticate, authController.me);

// Dashboard
router.get('/dashboard', authenticate, getDashboard);

// Location-specific routes
router.get('/location/city', authenticate, getCityDetails);

// Country Master
router.get('/country-master', authenticate, countryController.getAll);
router.post('/country-master', authenticate, countryController.create);
router.put('/country-master/:id', authenticate, countryController.update);
router.delete('/country-master/:id', authenticate, countryController.remove);

// State Master
router.get('/state-master', authenticate, stateController.getAll);
router.post('/state-master', authenticate, stateController.create);
router.put('/state-master/:id', authenticate, stateController.update);
router.delete('/state-master/:id', authenticate, stateController.remove);

// City Master
router.get('/city-master', authenticate, cityController.getAll);
router.post('/city-master', authenticate, cityController.create);
router.put('/city-master/:id', authenticate, cityController.update);
router.delete('/city-master/:id', authenticate, cityController.remove);

// ✅ UPDATED Generic CRUD route builder
const makeRoutes = (path, model, relations = {}, relationMap = {}) => {
  const ctrl = crudController(model, relations, relationMap);

  router.get(`/${path}`, authenticate, ctrl.getAll);
  router.get(`/${path}/:id`, authenticate, ctrl.getById);
  router.post(`/${path}`, authenticate, validate, ctrl.create);
  router.put(`/${path}/:id`, authenticate, validate, ctrl.update);
  router.delete(`/${path}/:id`, authenticate, ctrl.remove);
};

// Organization Structure
makeRoutes('companies', 'company');

// Location Types (custom)
const locationTypeController = require('../controllers/locationTypeController');
router.get('/location-types', authenticate, locationTypeController.getAll);
router.post('/location-types', authenticate, locationTypeController.create);
router.put('/location-types/:id', authenticate, locationTypeController.update);
router.delete('/location-types/:id', authenticate, locationTypeController.remove);

// Locations
makeRoutes(
  'locations',
  'location',
  { company: true, locationType: true },
  {
    companyId: 'company',
    locationTypeId: 'locationType',
  }
);

// Business Structure
makeRoutes('business-groups', 'businessGroup', { company: true, location: true }, {
  companyId: 'company',
  locationId: 'location',
});

makeRoutes('business-types', 'businessType', { company: true }, {
  companyId: 'company',
});

makeRoutes('legal-entities', 'legalEntity',
  { company: true, businessGroup: true, businessType: true, location: true },
  {
    companyId: 'company',
    bgId: 'businessGroup',
    businessTypeId: 'businessType',
    locationId: 'location',
  }
);

makeRoutes('operating-units', 'operatingUnit',
  { company: true, businessGroup: true, legalEntity: true, location: true },
  {
    companyId: 'company',
    bgId: 'businessGroup',
    leId: 'legalEntity',
    locationId: 'location',
  }
);

makeRoutes('inv-organizations', 'invOrganization',
  { company: true, businessGroup: true, legalEntity: true, location: true },
  {
    companyId: 'company',
    bgId: 'businessGroup',
    leId: 'legalEntity',
    locationId: 'location',
  }
);

makeRoutes('hr-organizations', 'hrOrganization',
  { company: true, businessGroup: true, legalEntity: true, location: true, parentOrg: true },
  {
    companyId: 'company',
    bgId: 'businessGroup',
    leId: 'legalEntity',
    locationId: 'location',
    parentOrgId: 'parentOrg',
  }
);

// Grade
makeRoutes('grades', 'grade', { company: true, businessGroup: true }, {
  companyId: 'company',
  bgId: 'businessGroup',
});

makeRoutes('grade-steps', 'gradeStep', { grade: true, businessGroup: true }, {
  bgId: 'businessGroup',
  gradeId: 'grade',
});

makeRoutes('grade-ladders', 'gradeLadder', { fromGrade: true, toGrade: true, businessGroup: true }, {
  bgId: 'businessGroup',
  fromGradeId: 'fromGrade',
  toGradeId: 'toGrade',
});

// Jobs & Positions
makeRoutes('jobs', 'job', { company: true, businessGroup: true }, {
  companyId: 'company',
  bgId: 'businessGroup',
});

makeRoutes('positions', 'position', { job: true, org: true, grade: true, location: true, businessGroup: true }, {
  bgId: 'businessGroup',
  jobId: 'job',
  orgId: 'org',
  gradeId: 'grade',
  locationId: 'location',
});

// Person
makeRoutes('persons', 'person', { company: true, businessGroup: true }, {
  companyId: 'company',
  bgId: 'businessGroup',
});

// Assignment
makeRoutes('assignments', 'assignment',
  { 
    person: true, 
    org: true, 
    position: true, 
    job: true, 
    grade: true,
    payrollPeriod: true,
    assignmentStatusType: true,
    businessGroup: true
  },
  {
    bgId: 'businessGroup',
    personId: 'person',
    orgId: 'org',
    positionId: 'position',
    jobId: 'job',
    gradeId: 'grade',
    payrollId: 'payrollPeriod',
    assignmentStatusTypeId: 'assignmentStatusType',
  }
);

//assignmentStatusType'
makeRoutes('assignment-status-types', 'assignmentStatusType', { company: true }, {
  companyId: 'company',
});


// ✅ SUPERVISOR (FIXED)
makeRoutes(
  'supervisors',
  'supervisor',
  {
    assignment: true,
    supervisorPerson: true,
  },
  {
    assignmentId: 'assignment',
    personId: 'person',
    supervisorPersonId: 'supervisorPerson',
    supervisorAssignmentId: 'supervisorAssignment',
  }
);

// Payroll & Others (same pattern)
makeRoutes('payroll-periods', 'payrollPeriod', { company: true, businessGroup: true });
makeRoutes('element-types', 'elementType', { company: true, businessGroup: true });
makeRoutes('element-links', 'elementLink', { elementType: true, org: true, grade: true });
makeRoutes('element-entries', 'elementEntry', { assignment: true, elementType: true });
makeRoutes('salaries', 'salary', { assignment: true });

makeRoutes('payroll-runs', 'payrollRun', { payPeriod: true }, {
  payPeriodId: 'payPeriod',
});

makeRoutes('run-results', 'runResult', { payrollRun: true, assignment: true, elementType: true }, {
  payrollRunId: 'payrollRun',
  assignmentId: 'assignment',
  elementTypeId: 'elementType',
});

makeRoutes('payslips', 'payslip', { payrollRun: true, assignment: true, person: true }, {
  payrollRunId: 'payrollRun',
  assignmentId: 'assignment',
  personId: 'person',
});

makeRoutes('tax-declarations', 'taxDeclaration', { person: true, assignment: true }, {
  personId: 'person',
  assignmentId: 'assignment',
});

makeRoutes('absence-types', 'absenceType', { company: true, businessGroup: true }, {
  companyId: 'company',
  bgId: 'businessGroup',
});

makeRoutes('absences', 'absence', { person: true, absenceType: true }, {
  personId: 'person',
  absenceTypeId: 'absenceType',
});

makeRoutes('work-schedules', 'workSchedule', { company: true, businessGroup: true }, {
  companyId: 'company',
  bgId: 'businessGroup',
});

makeRoutes('holiday-calendars', 'holidayCalendar', 
  { company: true, businessGroup: true, location: true }, 
  {
    companyId: 'company',
    bgId: 'businessGroup',
    locationId: 'location',
  }
);

makeRoutes('timecards', 'timecard', { assignment: true, workSchedule: true }, {
  assignmentId: 'assignment',
  scheduleId: 'workSchedule',
});

// Recruitment
makeRoutes('requisitions', 'requisition',
  { company: true, businessGroup: true, position: true, org: true },
  {
    companyId: 'company',
    bgId: 'businessGroup',
    positionId: 'position',
    orgId: 'org',
  }
);

makeRoutes('job-postings', 'jobPosting',
  { requisition: true },
  {
    requisitionId: 'requisition',
  }
);

makeRoutes('applicants', 'applicant',
  { company: true },
  {
    companyId: 'company',
  }
);
makeRoutes(
  'applications',
  'application',
  {
    applicant: true,
    requisition: true,
  },
  {
    companyId: true,
    applicantId: true,
    requisitionId: true,
  }
);

makeRoutes(
  'interviews',
  'interview',
  {
    application: true, // ✅ only valid relation
  },
  {
    companyId: true,            // direct
    applicationId: 'application', // relation
    interviewerPersonId: true,  // direct (IMPORTANT)
  }
);

makeRoutes(
  'offer-letters',
  'offerLetter',
  {
    application: true,
    applicant: true,
    requisition: true,
    position: true,
    grade: true,
  },
  {
    companyId: true,
    bgId: true,
    orgId: true,

    applicationId: true,
    applicantId: true,
    requisitionId: true,
    positionId: true,
    proposedGradeId: true,
  }
);

makeRoutes(
  'benefit-plans',
  'benefitPlan',
  {},
  {
    companyId: true,
    bgId: true,
  }
);
// makeRoutes(
//   'benefit-enrollments',
//   'benefitEnrollment',
//   {
//     employee: true,
//     benefitPlan: true,
//     assignment: true,
//   },
//   {
//     companyId: true,
//     bgId: true,
//     employeeId: 'employee',
//     benefitPlanId: 'benefitPlan',
//     assignmentId: 'assignment',
//   }
makeRoutes(
  'benefit-enrollments',
  'benefitEnrollment',
  {
    person: true,       // ✅ correct relation
    plan: true,         // ✅ correct relation
    assignment: true,
  },
  {
    companyId: true,
    bgId: true,

    personId: 'person',        // ✅ FIXED
    planId: 'plan',            // ✅ FIXED
    assignmentId: 'assignment' // ✅ correct
  }
);
  // ===================== LOANS =====================
makeRoutes(
  'loans',
  'loan',
  {
    person: true,       // Employee
    assignment: true,
  },
  {
    companyId: true,
    bgId: true,

    personId: 'person',        // ✅ Employee relation
    assignmentId: 'assignment' // ✅ Assignment relation
  }
);

// ===================== TRAINING PROGRAMS =====================
// ===================== TRAINING PROGRAMS =====================
// Training
makeRoutes('training-programs', 'trainingProgram', 
  { company: true, businessGroup: true }, 
  {
    companyId: 'company',
    bgId: 'businessGroup',
  }
);

makeRoutes(
  'training-enrollments',
  'trainingEnrollment',
  {
    person: true,   // ✅ correct
    program: true,  // ✅ VERY IMPORTANT FIX
  },
  {
    companyId: true,
    bgId: true,

    personId: 'person',   // ✅ correct
    programId: 'program', // ✅ FIXED (was wrong before)
  }
);


makeRoutes('competences', 'competence', 
  { company: true, businessGroup: true }, 
  {
    companyId: 'company',
    bgId: 'businessGroup',
  }
);

makeRoutes('appraisals', 'appraisal',
  { person: true, assignment: true },
  {
    personId: 'person',
    assignmentId: 'assignment',
  }
);

makeRoutes('separations', 'separation',
  { person: true, assignment: true },
  {
    personId: 'person',
    assignmentId: 'assignment',
  }
);

makeRoutes('exit-checklists', 'exitChecklist',
  { separation: true },        
  {
    separationId: 'separation', 
  }
);

makeRoutes(
  'final-settlements',
  'finalSettlement',
  {
    separation: true,
    assignment: true,
  },
  {
    companyId: true,
    bgId: true,

    separationId: 'separation', // ✅ relation
    assignmentId: 'assignment', // ✅ relation

    personId: true,             // ✅ KEEP DIRECT (IMPORTANT FIX)
  }
);
makeRoutes(
  'security-roles',
  'securityRole',
  {
    company: true,
  },
  {
    companyId: 'company',
  }
);
makeRoutes(
  'users',
  'user',
  {
    role: true,
    // person: true,
  },
  {
    companyId: true,
    roleId: 'role',
    personId: 'person',
  }
);
makeRoutes(
  'audit-logs',
  'auditLog',
  {
    company: true,
    user: true,
  },
  {
    companyId: 'company',
    userId: 'user',
  }
);
module.exports = router;