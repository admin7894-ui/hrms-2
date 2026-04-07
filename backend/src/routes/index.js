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

// Generic CRUD route builder
const makeRoutes = (path, model, relations = {}) => {
  const ctrl = crudController(model, relations);
  router.get(`/${path}`, authenticate, ctrl.getAll);
  router.get(`/${path}/:id`, authenticate, ctrl.getById);
  router.post(`/${path}`, authenticate, validate, ctrl.create);      // ✅ validate added
  router.put(`/${path}/:id`, authenticate, validate, ctrl.update);
  router.delete(`/${path}/:id`, authenticate, ctrl.remove);
};

// Organization Structure
makeRoutes('companies', 'company');
// Location Types (custom - auto-generates locationTypeCode)
const locationTypeController = require('../controllers/locationTypeController');
router.get('/location-types', authenticate, locationTypeController.getAll);
router.post('/location-types', authenticate, locationTypeController.create);
router.put('/location-types/:id', authenticate, locationTypeController.update);
router.delete('/location-types/:id', authenticate, locationTypeController.remove);


router.get('/locations', authenticate, crudController('location', { company: true, locationType: true }).getAll);
router.get('/locations/:id', authenticate, crudController('location', { company: true, locationType: true }).getById);
router.post('/locations', authenticate, validate, crudController('location', { company: true, locationType: true }).create);
router.put('/locations/:id', authenticate, validate, crudController('location', { company: true, locationType: true }).update);
router.delete('/locations/:id', authenticate, crudController('location', { company: true, locationType: true }).remove);


makeRoutes('business-groups', 'businessGroup', { company: true, location: true });
makeRoutes('business-types', 'businessType', { company: true });
makeRoutes('legal-entities', 'legalEntity', { company: true, businessGroup: true, businessType: true, location: true });
makeRoutes('operating-units', 'operatingUnit', { company: true, businessGroup: true, legalEntity: true, location: true });
makeRoutes('inv-organizations', 'invOrganization', { company: true, businessGroup: true, legalEntity: true, location: true });
makeRoutes('hr-organizations', 'hrOrganization', { company: true, businessGroup: true, legalEntity: true, location: true, parentOrg: true });

// Grade Management
makeRoutes('grades', 'grade', { company: true, businessGroup: true });
makeRoutes('grade-steps', 'gradeStep', { grade: true });
makeRoutes('grade-ladders', 'gradeLadder', { fromGrade: true, toGrade: true });

// Job & Position
makeRoutes('jobs', 'job', { company: true, businessGroup: true });
makeRoutes('positions', 'position', { job: true, org: true, grade: true, location: true });

// Person Management
const personCtrl = crudController('person', { company: true, businessGroup: true });
router.get('/persons', authenticate, personCtrl.getAll);
router.get('/persons/:id', authenticate, personCtrl.getById);
router.post('/persons', authenticate, validate, personCtrl.create);
router.put('/persons/:id', authenticate,validate,personCtrl.update);
router.delete('/persons/:id', authenticate, personCtrl.remove);

makeRoutes('person-documents', 'personDocument', { person: true });
makeRoutes('person-competences', 'personCompetence', { person: true, competence: true });
makeRoutes('person-history', 'personHistory', { person: true, assignment: true });

// Payroll
makeRoutes('payroll-periods', 'payrollPeriod', { company: true, businessGroup: true });
makeRoutes('assignment-status-types', 'assignmentStatusType', { company: true });
makeRoutes('assignments', 'assignment', { person: true, org: true, position: true, job: true, grade: true });
makeRoutes('supervisors', 'supervisor', { assignment: true, supervisorPerson: true });
makeRoutes('element-types', 'elementType', { company: true, businessGroup: true });
makeRoutes('element-links', 'elementLink', { elementType: true, org: true, grade: true });
makeRoutes('element-entries', 'elementEntry', { assignment: true, elementType: true });
makeRoutes('salaries', 'salary', { assignment: true });
makeRoutes('payroll-runs', 'payrollRun', { payPeriod: true });
makeRoutes('run-results', 'runResult', { payrollRun: true, assignment: true, elementType: true });
makeRoutes('pay-balances', 'payBalance', { assignment: true, elementType: true });
makeRoutes('payments', 'payment', { payrollRun: true, assignment: true, person: true });
makeRoutes('payslips', 'payslip', { payrollRun: true, assignment: true, person: true });
makeRoutes('tax-declarations', 'taxDeclaration', { person: true, assignment: true });

// Leave & Absence
makeRoutes('absence-types', 'absenceType', { company: true, businessGroup: true });
makeRoutes('absences', 'absence', { person: true, absenceType: true });

// Benefits
makeRoutes('benefit-plans', 'benefitPlan', { company: true, businessGroup: true });
makeRoutes('benefit-enrollments', 'benefitEnrollment', { person: true, plan: true, assignment: true });

// Loans
makeRoutes('loans', 'loan', { person: true, assignment: true });
makeRoutes('loan-repayments', 'loanRepayment', { loan: true, assignment: true });

// Time & Attendance
makeRoutes('holiday-calendars', 'holidayCalendar', { company: true, location: true });
makeRoutes('work-schedules', 'workSchedule', { company: true, businessGroup: true });
makeRoutes('timecards', 'timecard', { assignment: true, workSchedule: true });

// Recruitment
makeRoutes('requisitions', 'requisition', { position: true, org: true });
makeRoutes('job-postings', 'jobPosting', { requisition: true });
makeRoutes('applicants', 'applicant', { company: true });
makeRoutes('applications', 'application', { applicant: true, requisition: true });
makeRoutes('interviews', 'interview', { application: true });
makeRoutes('offer-letters', 'offerLetter', { application: true, applicant: true, position: true, grade: true });
makeRoutes('hired-persons', 'hiredPerson', { applicant: true, application: true, offer: true, position: true, grade: true });

// Learning & Development
makeRoutes('competences', 'competence', { company: true, businessGroup: true });
makeRoutes('training-programs', 'trainingProgram', { company: true, businessGroup: true });
makeRoutes('training-enrollments', 'trainingEnrollment', { person: true, program: true });

// Performance
makeRoutes('appraisals', 'appraisal', { person: true, assignment: true, ratings: true });
makeRoutes('appraisal-ratings', 'appraisalRating', { appraisal: true });

// Separation
makeRoutes('separations', 'separation', { person: true, assignment: true });
makeRoutes('exit-checklists', 'exitChecklist', { separation: true });
makeRoutes('final-settlements', 'finalSettlement', { separation: true, assignment: true });

// Security
makeRoutes('security-roles', 'securityRole', { company: true });
makeRoutes('security-profiles', 'securityProfile', { company: true });
makeRoutes('security-profile-accesses', 'securityProfileAccess', { profile: true });
makeRoutes('security-profile-persons', 'securityProfilePerson', { profile: true, person: true });
makeRoutes('users', 'user', { role: true });

// Utility
makeRoutes('cost-centers', 'costCenter', { org: true });
makeRoutes('audit-logs', 'auditLog', { company: true, user: true });
makeRoutes('notifications', 'notification', { company: true, user: true });

module.exports = router;
