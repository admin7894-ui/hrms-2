
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.CompanyScalarFieldEnum = {
  id: 'id',
  companyName: 'companyName',
  primaryCurrency: 'primaryCurrency',
  country: 'country',
  registrationNo: 'registrationNo',
  isActive: 'isActive',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.LocationTypeScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  locationTypeCode: 'locationTypeCode',
  locationTypeName: 'locationTypeName',
  description: 'description',
  isActive: 'isActive',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.LocationScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  locationTypeId: 'locationTypeId',
  locationName: 'locationName',
  address1: 'address1',
  city: 'city',
  state: 'state',
  country: 'country',
  pincode: 'pincode',
  isActive: 'isActive',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.BusinessGroupScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgLocationId: 'bgLocationId',
  bgName: 'bgName',
  currencyCode: 'currencyCode',
  isActive: 'isActive',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.BusinessTypeScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  businessTypeName: 'businessTypeName',
  description: 'description',
  isActive: 'isActive',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.LegalEntityScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  locationId: 'locationId',
  bgId: 'bgId',
  businessTypeId: 'businessTypeId',
  leName: 'leName',
  taxRegistrationNo: 'taxRegistrationNo',
  functionalCurrency: 'functionalCurrency',
  isActive: 'isActive',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.OperatingUnitScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  leId: 'leId',
  businessTypeId: 'businessTypeId',
  ouName: 'ouName',
  ouShortCode: 'ouShortCode',
  locationId: 'locationId',
  currencyCode: 'currencyCode',
  isActive: 'isActive',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.InvOrganizationScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  leId: 'leId',
  businessTypeId: 'businessTypeId',
  invOrgName: 'invOrgName',
  invOrgCode: 'invOrgCode',
  locationId: 'locationId',
  orgType: 'orgType',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.HrOrganizationScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  leId: 'leId',
  businessTypeId: 'businessTypeId',
  orgName: 'orgName',
  orgCode: 'orgCode',
  locationId: 'locationId',
  orgType: 'orgType',
  parentOrgId: 'parentOrgId',
  isActive: 'isActive',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.GradeScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  gradeCode: 'gradeCode',
  gradeName: 'gradeName',
  minSalary: 'minSalary',
  maxSalary: 'maxSalary',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.GradeStepScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  gradeId: 'gradeId',
  stepNumber: 'stepNumber',
  stepName: 'stepName',
  stepAmount: 'stepAmount',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.GradeLadderScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  ladderName: 'ladderName',
  fromGradeId: 'fromGradeId',
  toGradeId: 'toGradeId',
  sequence: 'sequence',
  minYearsInGrade: 'minYearsInGrade',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.JobScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  jobCode: 'jobCode',
  jobName: 'jobName',
  jobFamily: 'jobFamily',
  description: 'description',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.PositionScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  jobId: 'jobId',
  orgId: 'orgId',
  gradeId: 'gradeId',
  locationId: 'locationId',
  positionName: 'positionName',
  headcount: 'headcount',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.PersonScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  personType: 'personType',
  firstName: 'firstName',
  middleName: 'middleName',
  lastName: 'lastName',
  dateOfBirth: 'dateOfBirth',
  gender: 'gender',
  nationality: 'nationality',
  nationalId: 'nationalId',
  email: 'email',
  hireDate: 'hireDate',
  addressType: 'addressType',
  addressLine1: 'addressLine1',
  city: 'city',
  state: 'state',
  country: 'country',
  pincode: 'pincode',
  phoneType: 'phoneType',
  phoneNumber: 'phoneNumber',
  phonePreference: 'phonePreference',
  emergencyName: 'emergencyName',
  emergencyRelationship: 'emergencyRelationship',
  emergencyPhone: 'emergencyPhone',
  emergencyAddress: 'emergencyAddress',
  emergencyPriority: 'emergencyPriority',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.PersonDocumentScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  personId: 'personId',
  documentType: 'documentType',
  documentNumber: 'documentNumber',
  issuingAuthority: 'issuingAuthority',
  issueDate: 'issueDate',
  expiryDate: 'expiryDate',
  verifiedFlag: 'verifiedFlag',
  qualificationType: 'qualificationType',
  degreeName: 'degreeName',
  institution: 'institution',
  yearOfPassing: 'yearOfPassing',
  gradePct: 'gradePct',
  companyName: 'companyName',
  designation: 'designation',
  fromDate: 'fromDate',
  toDate: 'toDate',
  reasonForLeaving: 'reasonForLeaving',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.PayrollPeriodScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  payrollName: 'payrollName',
  payrollCode: 'payrollCode',
  periodName: 'periodName',
  startDate: 'startDate',
  endDate: 'endDate',
  status: 'status',
  periodType: 'periodType',
  paymentMethod: 'paymentMethod',
  currencyCode: 'currencyCode',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.AssignmentStatusTypeScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  statusCode: 'statusCode',
  statusName: 'statusName',
  userStatus: 'userStatus',
  systemStatus: 'systemStatus',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.AssignmentScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  personId: 'personId',
  orgId: 'orgId',
  positionId: 'positionId',
  jobId: 'jobId',
  gradeId: 'gradeId',
  payrollId: 'payrollId',
  assignmentStatusTypeId: 'assignmentStatusTypeId',
  assignmentType: 'assignmentType',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.SupervisorScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  assignmentId: 'assignmentId',
  personId: 'personId',
  supervisorPersonId: 'supervisorPersonId',
  supervisorAssignmentId: 'supervisorAssignmentId',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.ElementTypeScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  elementCode: 'elementCode',
  elementName: 'elementName',
  classification: 'classification',
  processingPriority: 'processingPriority',
  recurringFlag: 'recurringFlag',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.ElementLinkScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  elementTypeId: 'elementTypeId',
  orgId: 'orgId',
  gradeId: 'gradeId',
  positionId: 'positionId',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.ElementEntryScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  assignmentId: 'assignmentId',
  elementTypeId: 'elementTypeId',
  value: 'value',
  currency: 'currency',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.SalaryScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  assignmentId: 'assignmentId',
  basicAmount: 'basicAmount',
  annualGross: 'annualGross',
  currency: 'currency',
  approvalStatus: 'approvalStatus',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.PayrollRunScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  payPeriodId: 'payPeriodId',
  runDate: 'runDate',
  runStatus: 'runStatus',
  totalEmployees: 'totalEmployees',
  totalGross: 'totalGross',
  totalDeductions: 'totalDeductions',
  totalNet: 'totalNet',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.RunResultScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  payrollRunId: 'payrollRunId',
  assignmentId: 'assignmentId',
  elementTypeId: 'elementTypeId',
  amount: 'amount',
  currency: 'currency',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.AbsenceTypeScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  absenceCode: 'absenceCode',
  absenceName: 'absenceName',
  entitlementPerYear: 'entitlementPerYear',
  carryForwardFlag: 'carryForwardFlag',
  maxCarryDays: 'maxCarryDays',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.AbsenceScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  personId: 'personId',
  absenceTypeId: 'absenceTypeId',
  startDate: 'startDate',
  endDate: 'endDate',
  days: 'days',
  status: 'status',
  approvedByPersonId: 'approvedByPersonId',
  entitlement: 'entitlement',
  used: 'used',
  balance: 'balance',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.BenefitPlanScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  planCode: 'planCode',
  planName: 'planName',
  planType: 'planType',
  coverage: 'coverage',
  employerContributionPct: 'employerContributionPct',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.BenefitEnrollmentScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  personId: 'personId',
  planId: 'planId',
  assignmentId: 'assignmentId',
  enrollmentStatus: 'enrollmentStatus',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.SecurityRoleScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  roleCode: 'roleCode',
  roleName: 'roleName',
  description: 'description',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.SecurityProfileScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  profileCode: 'profileCode',
  profileName: 'profileName',
  rlsRuleDescription: 'rlsRuleDescription',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.SecurityProfileAccessScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  profileId: 'profileId',
  bgId: 'bgId',
  businessTypeId: 'businessTypeId',
  orgId: 'orgId',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.SecurityProfilePersonScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  profileId: 'profileId',
  personId: 'personId',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  passwordHash: 'passwordHash',
  roleId: 'roleId',
  personId: 'personId',
  activeFlag: 'activeFlag',
  createdAt: 'createdAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  userId: 'userId',
  tableName: 'tableName',
  recordId: 'recordId',
  action: 'action',
  oldValue: 'oldValue',
  newValue: 'newValue',
  changeDate: 'changeDate',
  ipAddress: 'ipAddress',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.PersonHistoryScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  personId: 'personId',
  assignmentId: 'assignmentId',
  changeType: 'changeType',
  fieldChanged: 'fieldChanged',
  oldValue: 'oldValue',
  newValue: 'newValue',
  changeDate: 'changeDate',
  changedBy: 'changedBy',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  userId: 'userId',
  notificationType: 'notificationType',
  subject: 'subject',
  message: 'message',
  status: 'status',
  sentDate: 'sentDate',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.CostCenterScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  orgId: 'orgId',
  costCenterCode: 'costCenterCode',
  costCenterName: 'costCenterName',
  glAccount: 'glAccount',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.CompetenceScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  competenceCode: 'competenceCode',
  competenceName: 'competenceName',
  competenceType: 'competenceType',
  description: 'description',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.PersonCompetenceScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  personId: 'personId',
  competenceId: 'competenceId',
  proficiencyLevel: 'proficiencyLevel',
  certifiedFlag: 'certifiedFlag',
  certificationDate: 'certificationDate',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.PayBalanceScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  assignmentId: 'assignmentId',
  elementTypeId: 'elementTypeId',
  balanceDimension: 'balanceDimension',
  balanceAmount: 'balanceAmount',
  currency: 'currency',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  payrollRunId: 'payrollRunId',
  assignmentId: 'assignmentId',
  personId: 'personId',
  netAmount: 'netAmount',
  currency: 'currency',
  paymentMethod: 'paymentMethod',
  paymentStatus: 'paymentStatus',
  paymentDate: 'paymentDate',
  transactionRef: 'transactionRef',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.PayslipScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  payrollRunId: 'payrollRunId',
  assignmentId: 'assignmentId',
  personId: 'personId',
  periodName: 'periodName',
  grossAmount: 'grossAmount',
  totalDeductions: 'totalDeductions',
  netAmount: 'netAmount',
  currency: 'currency',
  status: 'status',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.TaxDeclarationScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  personId: 'personId',
  assignmentId: 'assignmentId',
  financialYear: 'financialYear',
  section: 'section',
  declaredAmount: 'declaredAmount',
  approvedAmount: 'approvedAmount',
  proofSubmitted: 'proofSubmitted',
  status: 'status',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.LoanScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  personId: 'personId',
  assignmentId: 'assignmentId',
  loanType: 'loanType',
  loanAmount: 'loanAmount',
  interestRate: 'interestRate',
  emiAmount: 'emiAmount',
  tenureMonths: 'tenureMonths',
  disbursementDate: 'disbursementDate',
  outstandingBalance: 'outstandingBalance',
  loanStatus: 'loanStatus',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.LoanRepaymentScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  loanId: 'loanId',
  personId: 'personId',
  assignmentId: 'assignmentId',
  payPeriodId: 'payPeriodId',
  emiAmount: 'emiAmount',
  principal: 'principal',
  interest: 'interest',
  outstandingAfter: 'outstandingAfter',
  repaymentStatus: 'repaymentStatus',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.HolidayCalendarScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  locationId: 'locationId',
  holidayDate: 'holidayDate',
  holidayName: 'holidayName',
  holidayType: 'holidayType',
  applicableTo: 'applicableTo',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.WorkScheduleScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  scheduleCode: 'scheduleCode',
  scheduleName: 'scheduleName',
  shiftStart: 'shiftStart',
  shiftEnd: 'shiftEnd',
  breakMinutes: 'breakMinutes',
  workingHours: 'workingHours',
  applicableDays: 'applicableDays',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.TimecardScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  personId: 'personId',
  assignmentId: 'assignmentId',
  workDate: 'workDate',
  scheduleId: 'scheduleId',
  clockIn: 'clockIn',
  clockOut: 'clockOut',
  hoursWorked: 'hoursWorked',
  attendanceStatus: 'attendanceStatus',
  otHours: 'otHours',
  otRateMultiplier: 'otRateMultiplier',
  otAmount: 'otAmount',
  approvalStatus: 'approvalStatus',
  approvedBy: 'approvedBy',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.RequisitionScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  positionId: 'positionId',
  orgId: 'orgId',
  requestedByPersonId: 'requestedByPersonId',
  vacancyCount: 'vacancyCount',
  priority: 'priority',
  requisitionStatus: 'requisitionStatus',
  raisedDate: 'raisedDate',
  targetCloseDate: 'targetCloseDate',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.JobPostingScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  requisitionId: 'requisitionId',
  postingTitle: 'postingTitle',
  postingDescription: 'postingDescription',
  qualificationRequired: 'qualificationRequired',
  experienceYearsMin: 'experienceYearsMin',
  experienceYearsMax: 'experienceYearsMax',
  salaryRangeMin: 'salaryRangeMin',
  salaryRangeMax: 'salaryRangeMax',
  postingChannel: 'postingChannel',
  postingDate: 'postingDate',
  closingDate: 'closingDate',
  postingStatus: 'postingStatus',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.ApplicantScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  phone: 'phone',
  source: 'source',
  currentCompany: 'currentCompany',
  currentDesignation: 'currentDesignation',
  expectedSalary: 'expectedSalary',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.ApplicationScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  applicantId: 'applicantId',
  requisitionId: 'requisitionId',
  applicationDate: 'applicationDate',
  applicationStatus: 'applicationStatus',
  screeningScore: 'screeningScore',
  shortlistedFlag: 'shortlistedFlag',
  offeredFlag: 'offeredFlag',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.InterviewScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  applicationId: 'applicationId',
  interviewRound: 'interviewRound',
  interviewDate: 'interviewDate',
  interviewerPersonId: 'interviewerPersonId',
  interviewMode: 'interviewMode',
  interviewStatus: 'interviewStatus',
  rating: 'rating',
  feedback: 'feedback',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.OfferLetterScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  applicationId: 'applicationId',
  applicantId: 'applicantId',
  requisitionId: 'requisitionId',
  positionId: 'positionId',
  orgId: 'orgId',
  proposedGradeId: 'proposedGradeId',
  offeredSalary: 'offeredSalary',
  joiningBonus: 'joiningBonus',
  offerDate: 'offerDate',
  offerExpiryDate: 'offerExpiryDate',
  offerStatus: 'offerStatus',
  rejectionReason: 'rejectionReason',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.HiredPersonScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  applicantId: 'applicantId',
  applicationId: 'applicationId',
  offerId: 'offerId',
  personId: 'personId',
  positionId: 'positionId',
  orgId: 'orgId',
  gradeId: 'gradeId',
  dateOfJoining: 'dateOfJoining',
  probationEndDate: 'probationEndDate',
  employmentType: 'employmentType',
  hiredSalary: 'hiredSalary',
  hireStatus: 'hireStatus',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.TrainingProgramScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  programCode: 'programCode',
  programName: 'programName',
  provider: 'provider',
  durationHours: 'durationHours',
  costPerPerson: 'costPerPerson',
  deliveryMode: 'deliveryMode',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.TrainingEnrollmentScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  personId: 'personId',
  programId: 'programId',
  enrollmentDate: 'enrollmentDate',
  completionDate: 'completionDate',
  completionStatus: 'completionStatus',
  score: 'score',
  certificateIssued: 'certificateIssued',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.AppraisalScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  personId: 'personId',
  assignmentId: 'assignmentId',
  reviewPeriod: 'reviewPeriod',
  reviewerPersonId: 'reviewerPersonId',
  overallRating: 'overallRating',
  recommendation: 'recommendation',
  appraisalStatus: 'appraisalStatus',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.AppraisalRatingScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  appraisalId: 'appraisalId',
  kraName: 'kraName',
  kraWeightage: 'kraWeightage',
  selfRating: 'selfRating',
  managerRating: 'managerRating',
  finalRating: 'finalRating',
  comments: 'comments',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.SeparationScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  personId: 'personId',
  assignmentId: 'assignmentId',
  separationType: 'separationType',
  reason: 'reason',
  resignationDate: 'resignationDate',
  noticePeriodDays: 'noticePeriodDays',
  lastWorkingDate: 'lastWorkingDate',
  separationStatus: 'separationStatus',
  approvedByPersonId: 'approvedByPersonId',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.ExitChecklistScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  separationId: 'separationId',
  personId: 'personId',
  checklistItem: 'checklistItem',
  department: 'department',
  assignedTo: 'assignedTo',
  status: 'status',
  completionDate: 'completionDate',
  remarks: 'remarks',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.FinalSettlementScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  bgId: 'bgId',
  separationId: 'separationId',
  personId: 'personId',
  assignmentId: 'assignmentId',
  pendingSalary: 'pendingSalary',
  leaveEncashmentDays: 'leaveEncashmentDays',
  leaveEncashmentAmount: 'leaveEncashmentAmount',
  gratuityAmount: 'gratuityAmount',
  bonusDue: 'bonusDue',
  totalEarnings: 'totalEarnings',
  recoveryLoan: 'recoveryLoan',
  recoveryOther: 'recoveryOther',
  totalDeductions: 'totalDeductions',
  netSettlement: 'netSettlement',
  settlementStatus: 'settlementStatus',
  activeFlag: 'activeFlag',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.StateMasterScalarFieldEnum = {
  id: 'id',
  stateCode: 'stateCode',
  stateName: 'stateName',
  countryId: 'countryId',
  isActive: 'isActive',
  createdBy: 'createdBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CityMasterScalarFieldEnum = {
  id: 'id',
  cityCode: 'cityCode',
  cityName: 'cityName',
  stateId: 'stateId',
  countryId: 'countryId',
  isActive: 'isActive',
  pincode: 'pincode',
  createdBy: 'createdBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CountryMasterScalarFieldEnum = {
  id: 'id',
  countryCode: 'countryCode',
  countryName: 'countryName',
  isActive: 'isActive',
  createdBy: 'createdBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  Company: 'Company',
  LocationType: 'LocationType',
  Location: 'Location',
  BusinessGroup: 'BusinessGroup',
  BusinessType: 'BusinessType',
  LegalEntity: 'LegalEntity',
  OperatingUnit: 'OperatingUnit',
  InvOrganization: 'InvOrganization',
  HrOrganization: 'HrOrganization',
  Grade: 'Grade',
  GradeStep: 'GradeStep',
  GradeLadder: 'GradeLadder',
  Job: 'Job',
  Position: 'Position',
  Person: 'Person',
  PersonDocument: 'PersonDocument',
  PayrollPeriod: 'PayrollPeriod',
  AssignmentStatusType: 'AssignmentStatusType',
  Assignment: 'Assignment',
  Supervisor: 'Supervisor',
  ElementType: 'ElementType',
  ElementLink: 'ElementLink',
  ElementEntry: 'ElementEntry',
  Salary: 'Salary',
  PayrollRun: 'PayrollRun',
  RunResult: 'RunResult',
  AbsenceType: 'AbsenceType',
  Absence: 'Absence',
  BenefitPlan: 'BenefitPlan',
  BenefitEnrollment: 'BenefitEnrollment',
  SecurityRole: 'SecurityRole',
  SecurityProfile: 'SecurityProfile',
  SecurityProfileAccess: 'SecurityProfileAccess',
  SecurityProfilePerson: 'SecurityProfilePerson',
  User: 'User',
  AuditLog: 'AuditLog',
  PersonHistory: 'PersonHistory',
  Notification: 'Notification',
  CostCenter: 'CostCenter',
  Competence: 'Competence',
  PersonCompetence: 'PersonCompetence',
  PayBalance: 'PayBalance',
  Payment: 'Payment',
  Payslip: 'Payslip',
  TaxDeclaration: 'TaxDeclaration',
  Loan: 'Loan',
  LoanRepayment: 'LoanRepayment',
  HolidayCalendar: 'HolidayCalendar',
  WorkSchedule: 'WorkSchedule',
  Timecard: 'Timecard',
  Requisition: 'Requisition',
  JobPosting: 'JobPosting',
  Applicant: 'Applicant',
  Application: 'Application',
  Interview: 'Interview',
  OfferLetter: 'OfferLetter',
  HiredPerson: 'HiredPerson',
  TrainingProgram: 'TrainingProgram',
  TrainingEnrollment: 'TrainingEnrollment',
  Appraisal: 'Appraisal',
  AppraisalRating: 'AppraisalRating',
  Separation: 'Separation',
  ExitChecklist: 'ExitChecklist',
  FinalSettlement: 'FinalSettlement',
  StateMaster: 'StateMaster',
  CityMaster: 'CityMaster',
  CountryMaster: 'CountryMaster'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
