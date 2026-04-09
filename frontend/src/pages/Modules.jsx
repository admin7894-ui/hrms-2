import React from 'react';
import CRUDModule from '../components/common/CRUDModule';

// ─── ORGANIZATION ────────────────────────────────────────────────────────────

export const Companies = () => (
  <CRUDModule
    title="Companies"
    endpoint="companies"
    columns={[
      { key: 'companyName', label: 'Name' },
      { key: 'primaryCurrency', label: 'Currency' },
      { key: 'country', label: 'Country', render: (v) => v?.countryName || v },
      { key: 'registrationNo', label: 'Reg No' },
      { key: 'isActive', label: 'Active', type: 'toggle' },
    ]}
    fields={[
      { name: 'companyName', label: 'Company Name', required: true },
      { name: 'primaryCurrency', label: 'Currency', type: 'select', options: ['INR', 'USD', 'EUR', 'GBP'] },
      { name: 'country', label: 'Country', type: 'select', optionsUrl: 'country-master', optionLabel: 'countryName', optionValue: 'countryName', required: true },
      { name: 'registrationNo', label: 'Registration No' },
      { name: 'isActive', label: 'Active', type: 'toggle' },
    ]}
    defaultValues={{ primaryCurrency: 'INR', country: 'India', isActive: true }}
  />
);

export const Countries = () => (
  <CRUDModule
    title="Countries"
    endpoint="country-master"
    deleteConfirmation="Are you sure you want to permanently delete this country? This action cannot be undone."
    columns={[
      { key: 'countryName', label: 'Country Name' },
      { key: 'countryCode', label: 'Code' },
      { key: 'createdBy', label: 'Created By' },
      { key: 'isActive', label: 'Active', type: 'toggle' },
    ]}
    fields={[
      { name: 'countryName', label: 'Country Name', required: true, placeholder: 'e.g. India' },
      { name: 'countryCode', label: 'Country Code', placeholder: 'Auto-generated', readOnly: true },
      { name: 'createdBy', label: 'Created By', required: true, placeholder: 'Your Name' },
      { name: 'isActive', label: 'Active Status', type: 'toggle' },
    ]}
    defaultValues={{ isActive: true, createdBy: 'SYSTEM' }}
  />
);

export const States = () => (
  <CRUDModule
    title="States"
    endpoint="state-master"
    deleteConfirmation="Are you sure you want to permanently delete this state? This action cannot be undone."
    columns={[
      { key: 'stateName', label: 'State Name' },
      { key: 'stateCode', label: 'Code' },
      { key: 'country', label: 'Country', render: (v) => v?.countryName || v },
      { key: 'isActive', label: 'Active', type: 'toggle' },
    ]}
    fields={[
      { name: 'stateName', label: 'State Name', required: true, placeholder: 'e.g. Tamil Nadu' },
      { name: 'countryId', label: 'Country', type: 'select', optionsUrl: 'country-master', optionLabel: 'countryName', required: true },
      { name: 'stateCode', label: 'State Code', placeholder: 'Auto-generated', readOnly: true },
      { name: 'createdBy', label: 'Created By', required: true, placeholder: 'Your Name' },
      { name: 'isActive', label: 'Active Status', type: 'toggle' },
    ]}
    defaultValues={{ isActive: true, createdBy: 'SYSTEM' }}
  />
);

export const Cities = () => (
  <CRUDModule
    title="Cities"
    endpoint="city-master"
    deleteConfirmation="Are you sure you want to permanently delete this city? This action cannot be undone."
    columns={[
      { key: 'cityName', label: 'City Name' },
      { key: 'cityCode', label: 'Code' },
      { key: 'pincode', label: 'Pincode' },
      { key: 'state', label: 'State', render: (v) => v?.stateName || v },
      { key: 'country', label: 'Country', render: (v) => v?.countryName || v },
      { key: 'isActive', label: 'Active', type: 'toggle' },
    ]}
    fields={[
      { name: 'countryId', label: 'Country', type: 'select', optionsUrl: 'country-master', optionLabel: 'countryName', required: true },
      { name: 'stateId', label: 'State', type: 'select', optionsUrl: 'state-master', optionLabel: 'stateName', dependsOn: 'countryId', required: true },
      { name: 'cityName', label: 'City Name', required: true, placeholder: 'e.g. Chennai' },
      { name: 'pincode', label: 'Pincode', required: true, placeholder: 'e.g. 600001' },
      { name: 'cityCode', label: 'City Code', placeholder: 'Auto-generated', readOnly: true },
      { name: 'createdBy', label: 'Created By', required: true, placeholder: 'Your Name' },
      { name: 'isActive', label: 'Active Status', type: 'toggle' },
    ]}
    defaultValues={{ isActive: true, createdBy: 'SYSTEM' }}
  />
);

export const Locations = () => (
  <CRUDModule
    title="Locations"
    endpoint="locations"
    columns={[
      { key: 'locationName', label: 'Location Name' },
      { key: 'city', label: 'City' },
      { key: 'state', label: 'State' },
      { key: 'country', label: 'Country' },
      { key: 'pincode', label: 'Pincode' },
      { key: 'isActive', label: 'Active', type: 'toggle' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'locationTypeId', label: 'Location Type', type: 'select', optionsUrl: 'location-types', optionLabel: 'locationTypeName', dependsOn: 'companyId', required: true },
      { name: 'locationName', label: 'Location Name', required: true },
      { name: 'address1', label: 'Address', required: true },
      {
        name: 'city',
        label: 'City',
        type: 'select',               // ← dropdown
        optionsUrl: 'city-master',    // ← fetches from city master
        optionLabel: 'cityName',
        optionValue: 'cityName',      // ← saves city name not id
        required: true,
        trigger: {                    // ← auto-fills other fields on select
          url: 'location/city',
          params: (val) => ({ name: val }),
          mapping: {
            state: 'state',
            country: 'country',
            pincode: 'pincode'
          }
        }
      },
      { name: 'state', label: 'State', readOnly: true },      // ← auto-filled
      { name: 'country', label: 'Country', readOnly: true },  // ← auto-filled
      { name: 'pincode', label: 'Pincode', readOnly: true },  // ← auto-filled
    ]}
    defaultValues={{ country: 'India', isActive: true }}
  />
);

export const LocationTypes = () => (
  <CRUDModule
    title="Location Types"
    endpoint="location-types"
    columns={[
      { key: 'locationTypeCode', label: 'Code' },
      { key: 'locationTypeName', label: 'Type Name' },
      { key: 'isActive', label: 'Active', type: 'toggle' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'locationTypeName', label: 'Location Type Name', required: true },
      { name: 'description', label: 'Description', type: 'textarea', full: true },
    ]}
    defaultValues={{ isActive: true }}
  />
);

export const BusinessGroups = () => (
  <CRUDModule
    title="Business Groups"
    endpoint="business-groups"
    columns={[
      { key: 'bgName', label: 'Name' },
      { key: 'currencyCode', label: 'Currency' },
      { key: 'isActive', label: 'Active', type: 'toggle' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgLocationId', label: 'Location', type: 'select', optionsUrl: 'locations', optionLabel: 'locationName', required: true },
      { name: 'bgName', label: 'Group Name', required: true },
      { name: 'currencyCode', label: 'Currency', type: 'select', options: ['INR', 'USD', 'EUR'] },
    ]}
    defaultValues={{ currencyCode: 'INR', activeFlag: true }}
  />
);

export const BusinessTypes = () => (
  <CRUDModule
    title="Business Types"
    endpoint="business-types"
    columns={[
      { key: 'businessTypeName', label: 'Type' },
      { key: 'description', label: 'Description' },
      { key: 'isActive', label: 'Active', type: 'toggle' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'businessTypeName', label: 'Type Name', required: true },
      { name: 'description', label: 'Description', type: 'textarea', full: true },
    ]}
    defaultValues={{ isActive: true }}
  />
);

export const LegalEntities = () => (
  <CRUDModule
    title="Legal Entities"
    endpoint="legal-entities"
    columns={[
      { key: 'leName', label: 'Entity Name' },
      { key: 'taxRegistrationNo', label: 'Tax Reg No' },
      { key: 'functionalCurrency', label: 'Currency' },
      { key: 'isActive', label: 'Active', type: 'toggle' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'locationId', label: 'Location', type: 'select', optionsUrl: 'locations', optionLabel: 'locationName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'businessTypeId', label: 'Business Type', type: 'select', optionsUrl: 'business-types', optionLabel: 'businessTypeName', required: true },
      { name: 'leName', label: 'Entity Name', required: true },
      { name: 'taxRegistrationNo', label: 'Tax Registration No' },
      { name: 'functionalCurrency', label: 'Currency', type: 'select', options: ['INR', 'USD', 'EUR'] },
    ]}
    defaultValues={{ functionalCurrency: 'INR', isActive: true }}
  />
);

export const OperatingUnits = () => (
  <CRUDModule
    title="Operating Units"
    endpoint="operating-units"
    columns={[
      { key: 'ouName', label: 'OU Name' },
      { key: 'ouShortCode', label: 'Code' },
      { key: 'currencyCode', label: 'Currency' },
      { key: 'isActive', label: 'Active', type: 'toggle' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'leId', label: 'Legal Entity', type: 'select', optionsUrl: 'legal-entities', optionLabel: 'leName', required: true },
      { name: 'businessTypeId', label: 'Business Type', type: 'select', optionsUrl: 'business-types', optionLabel: 'businessTypeName', required: true },
      { name: 'locationId', label: 'Location', type: 'select', optionsUrl: 'locations', optionLabel: 'locationName', required: true },
      { name: 'ouName', label: 'OU Name', required: true, generateShortCodeFor: 'ouShortCode' },
      { name: 'ouShortCode', label: 'Short Code', readOnly: true },
      { name: 'currencyCode', label: 'Currency', type: 'select', options: ['INR', 'USD', 'EUR'] },
    ]}
    defaultValues={{ currencyCode: 'INR', isActive: true }}
  />
);

export const HrOrganizations = () => (
  <CRUDModule
    title="HR Organizations"
    endpoint="hr-organizations"
    columns={[
      { key: 'orgName', label: 'Org Name' },
      { key: 'orgCode', label: 'Code' },
      { key: 'orgType', label: 'Type' },
      { key: 'isActive', label: 'Active', type: 'toggle' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'leId', label: 'Legal Entity', type: 'select', optionsUrl: 'legal-entities', optionLabel: 'leName', required: true },
      { name: 'businessTypeId', label: 'Business Type', type: 'select', optionsUrl: 'business-types', optionLabel: 'businessTypeName', required: true },
      { name: 'locationId', label: 'Location', type: 'select', optionsUrl: 'locations', optionLabel: 'locationName', required: true },
      { name: 'orgName', label: 'Org Name', required: true, generateShortCodeFor: 'orgCode' },
      { name: 'orgCode', label: 'Org Code', required: true, readOnly: true },
      { name: 'orgType', label: 'Org Type', type: 'select', options: ['Department', 'Division', 'Team', 'Unit'] },
      { name: 'parentOrgId', label: 'Parent Org', type: 'select', optionsUrl: 'hr-organizations', optionLabel: 'orgName' },
    ]}
    defaultValues={{ isActive: true }}
  />
);

// ─── HR CORE ────────────────────────────────────────────────────────────────
export const Persons = () => (
  <CRUDModule
    title="Employees"
    endpoint="persons"
    columns={[
      { key: 'firstName', label: 'First Name' },
      { key: 'lastName', label: 'Last Name' },
      { key: 'email', label: 'Email' },
      { key: 'gender', label: 'Gender' },
      { key: 'personType', label: 'Type' },
      { key: 'hireDate', label: 'Hire Date', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
      { key: 'isActive', label: 'Active', type: 'toggle' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true, tab: 'Employee Details' },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true, tab: 'Employee Details' },
      { name: 'personType', label: 'Person Type', type: 'select', options: ['EMP', 'CONTRACTOR', 'CONSULTANT'], tab: 'Employee Details' },
      { name: 'firstName', label: 'First Name', required: true, tab: 'Employee Details' },
      { name: 'middleName', label: 'Middle Name', tab: 'Employee Details' },
      { name: 'lastName', label: 'Last Name', required: true, tab: 'Employee Details' },
      { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', tab: 'Employee Details' },
      { name: 'gender', label: 'Gender', type: 'select', options: ['M', 'F', 'Other'], tab: 'Employee Details' },
      { name: 'nationality', label: 'Nationality', readOnly: true, tab: 'Employee Details' },
      { name: 'nationalId', label: 'National ID (PAN)', tab: 'Employee Details',required: true },
      { name: 'email', label: 'Email', type: 'email', required: true, tab: 'Employee Details' },
      { name: 'hireDate', label: 'Hire Date', type: 'date', tab: 'Employee Details' },
      { name: 'phoneNumber', label: 'Phone', required: true, tab: 'Employee Details' },
      { name: 'addressLine1', label: 'Address', full: true, required: true, tab: 'Employee Details' },
      {
        name: 'city',
        label: 'City',
        type: 'select',
        optionsUrl: 'city-master',
        optionLabel: 'cityName',
        optionValue: 'cityName',
        required: true,
        tab: 'Employee Details',
        trigger: {
          url: 'location/city',
          params: (val) => ({ name: val }),
          mapping: {
            state: 'state',
            country: 'country',
            pincode: 'pincode',
          }
        }
      },
      { name: 'state', label: 'State', readOnly: true, required: true, tab: 'Employee Details' },
      { name: 'country', label: 'Country', readOnly: true, required: true, tab: 'Employee Details' },
      { name: 'pincode', label: 'Pincode', readOnly: true, required: true, tab: 'Employee Details' },
      
      // Emergency Tab
      { name: 'emergencyName', label: 'Emergency Name', required: true, tab: 'Emergency' },
      {
        name: 'emergencyRelationship',
        label: 'Relationship',
        type: 'select',
        options: ['Father', 'Mother', 'Spouse', 'Brother', 'Sister', 'Friend', 'Other'],
        required: true,
        tab: 'Emergency'
      },
      { name: 'emergencyPhone', label: 'Emergency Phone', required: true, tab: 'Emergency' },
      { name: 'emergencyAddress', label: 'Emergency Address', full: true, required: true, tab: 'Emergency' },
      { name: 'emergencyPriority', label: 'Priority', type: 'number', required: true, tab: 'Emergency' },
    ]}
    defaultValues={{ 
      personType: 'EMP', 
      gender: 'M', 
      isActive: true, 
      nationality: 'Indian', 
      country: 'India',
      emergencyPriority: 1
    }}
    transformPayload={(form) => {
      // Build the nested structure requested by the backend validation
      const payload = { ...form };
      
      // `validate.js` on the backend explicitly reads `req.body.emergency.emergency_name` 
      // and `req.body.emergency.emergency_relationship`
      if (payload.emergencyName || payload.emergencyRelationship) {
        payload.emergency = {
          emergency_name: payload.emergencyName,
          emergency_relationship: payload.emergencyRelationship,
        };
      }
      
      // Note: emergencyPhone, emergencyAddress, and emergencyPriority are sent flat 
      // because `validate.js` and `crudController.js` either validate them at root or 
      // insert them directly into Prisma as root fields.

      return payload;
    }}
  />
);

export const Grades = () => (
  <CRUDModule
    title="Grades"
    endpoint="grades"
    columns={[
      { key: 'gradeCode', label: 'Code' },
      { key: 'gradeName', label: 'Grade Name' },
      { key: 'minSalary', label: 'Min Salary', render: (v) => `₹${Number(v).toLocaleString()}` },
      { key: 'maxSalary', label: 'Max Salary', render: (v) => `₹${Number(v).toLocaleString()}` },
      { key: 'isActive', label: 'Active', type: 'toggle' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'gradeCode', label: 'Grade Code', required: true },
      { name: 'gradeName', label: 'Grade Name', required: true },
      { name: 'minSalary', label: 'Min Salary', type: 'number' },
      { name: 'maxSalary', label: 'Max Salary', type: 'number' },
    ]}
    defaultValues={{ isActive: true }}
  />
);

export const GradeSteps = () => (
  <CRUDModule
    title="Grade Steps"
    endpoint="grade-steps"
    columns={[
      { key: 'stepName', label: 'Step Name' },
      { key: 'stepNumber', label: 'Step No.' },
      { key: 'stepAmount', label: 'Amount', render: (v) => `₹${Number(v).toLocaleString()}` },
    ]}
    fields={[
      { name: 'gradeId', label: 'Grade', type: 'select', optionsUrl: 'grades', optionLabel: 'gradeName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'stepNumber', label: 'Step Number', type: 'number', required: true },
      { name: 'stepName', label: 'Step Name', required: true },
      { name: 'stepAmount', label: 'Step Amount', type: 'number', required: true },
    ]}
  />
);

export const GradeLadders = () => (
  <CRUDModule
    title="Grade Ladders"
    endpoint="grade-ladders"
    columns={[
      { key: 'ladderName', label: 'Ladder Name' },
      { key: 'sequence', label: 'Sequence' },
      { key: 'minYearsInGrade', label: 'Min Years' },
      { key: 'isActive', label: 'Active', type: 'toggle' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'ladderName', label: 'Ladder Name', required: true },
      { name: 'fromGradeId', label: 'From Grade', type: 'select', optionsUrl: 'grades', optionLabel: 'gradeName', required: true },
      { name: 'toGradeId', label: 'To Grade', type: 'select', optionsUrl: 'grades', optionLabel: 'gradeName', required: true },
      { name: 'sequence', label: 'Sequence', type: 'number' },
      { name: 'minYearsInGrade', label: 'Min Years in Grade', type: 'number' },
    ]}
    defaultValues={{ isActive: true }}
  />
);

export const Jobs = () => (
  <CRUDModule
    title="Jobs"
    endpoint="jobs"
    columns={[
      { key: 'jobCode', label: 'Code' },
      { key: 'jobName', label: 'Job Name' },
      { key: 'jobFamily', label: 'Family' },
      { key: 'isActive', label: 'Active', type: 'toggle' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'jobCode', label: 'Job Code', required: true },
      { name: 'jobName', label: 'Job Name', required: true },
      { name: 'jobFamily', label: 'Job Family' },
      { name: 'description', label: 'Description', type: 'textarea', full: true },
    ]}
    defaultValues={{ isActive: true }}
  />
);

export const Positions = () => (
  <CRUDModule
    title="Positions"
    endpoint="positions"
    columns={[
      { key: 'positionName', label: 'Position' },
      { key: 'headcount', label: 'Headcount' },
      { key: 'isActive', label: 'Active', type: 'toggle' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'jobId', label: 'Job', type: 'select', optionsUrl: 'jobs', optionLabel: 'jobName', required: true },
      { name: 'orgId', label: 'HR Org', type: 'select', optionsUrl: 'hr-organizations', optionLabel: 'orgName', required: true },
      { name: 'gradeId', label: 'Grade', type: 'select', optionsUrl: 'grades', optionLabel: 'gradeName', required: true },
      { name: 'locationId', label: 'Location', type: 'select', optionsUrl: 'locations', optionLabel: 'locationName', required: true },
      { name: 'positionName', label: 'Position Name', required: true },
      { name: 'headcount', label: 'Headcount', type: 'number' },
    ]}
    defaultValues={{ headcount: 1, isActive: true }}
  />
);

export const Assignments = () => (
  <CRUDModule
    title="Assignments"
    endpoint="assignments"
    columns={[
      { key: 'person', label: 'Employee', render: (v) => v ? `${v.firstName} ${v.lastName}` : '—' },
      { key: 'assignmentType', label: 'Type' },
      { key: 'position', label: 'Position', render: (v) => v?.positionName || '—' },
      { key: 'job', label: 'Job', render: (v) => v?.jobName || '—' },
      { key: 'grade', label: 'Grade', render: (v) => v?.gradeName || '—' },
      { key: 'activeFlag', label: 'Active', render: (v) => v ? '✅' : '❌' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'personId', label: 'Employee', type: 'select', optionsUrl: 'persons', optionLabel: 'firstName', required: true },
      { name: 'orgId', label: 'HR Org', type: 'select', optionsUrl: 'hr-organizations', optionLabel: 'orgName', required: true },
      { name: 'positionId', label: 'Position', type: 'select', optionsUrl: 'positions', optionLabel: 'positionName' },
      { name: 'jobId', label: 'Job', type: 'select', optionsUrl: 'jobs', optionLabel: 'jobName' },
      { name: 'gradeId', label: 'Grade', type: 'select', optionsUrl: 'grades', optionLabel: 'gradeName' },
      { name: 'payrollId', label: 'Payroll Period', type: 'select', optionsUrl: 'payroll-periods', optionLabel: 'periodName' },
      { name: 'assignmentStatusTypeId', label: 'Status Type', type: 'select', optionsUrl: 'assignment-status-types', optionLabel: 'statusName', required: true },
      { name: 'assignmentType', label: 'Assignment Type', type: 'select', options: ['PRIMARY', 'SECONDARY'] },
    ]}
    defaultValues={{ assignmentType: 'PRIMARY', activeFlag: true }}
  />
);

export const Supervisors = () => (
  <CRUDModule
    title="Supervisors"
    endpoint="supervisors"
    columns={[
      { key: 'supervisorPerson', label: 'Supervisor', render: (v) => v ? `${v.firstName} ${v.lastName}` : '—' },
      { key: 'activeFlag', label: 'Active', render: (v) => v ? '✅' : '❌' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'personId', label: 'Employee', type: 'select', optionsUrl: 'persons', optionLabel: 'firstName', required: true },
      { name: 'assignmentId', label: 'Assignment', type: 'select', optionsUrl: 'assignments', optionLabel: 'id', dependsOn: 'personId', required: true },
      { name: 'supervisorPersonId', label: 'Supervisor', type: 'select', optionsUrl: 'persons', optionLabel: 'firstName', required: true },
      { name: 'supervisorAssignmentId', label: 'Supervisor Assignment', type: 'select', optionsUrl: 'assignments', optionLabel: 'id', dependsOn: 'supervisorPersonId', dependsOnParam: 'personId', required: true },
    ]}
    defaultValues={{ activeFlag: true }}
  />
);

// ─── PAYROLL ────────────────────────────────────────────────────────────────

export const PayrollPeriods = () => (
  <CRUDModule
    title="Payroll Periods"
    endpoint="payroll-periods"
    columns={[
      { key: 'payrollName', label: 'Payroll' },
      { key: 'periodName', label: 'Period' },
      { key: 'startDate', label: 'Start', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
      { key: 'endDate', label: 'End', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
      { key: 'status', label: 'Status' },
      { key: 'periodType', label: 'Type' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'payrollName', label: 'Payroll Name', required: true },
      { name: 'payrollCode', label: 'Payroll Code', required: true },
      { name: 'periodName', label: 'Period Name', required: true },
      { name: 'startDate', label: 'Start Date', type: 'date', required: true },
      { name: 'endDate', label: 'End Date', type: 'date', required: true },
      { name: 'status', label: 'Status', type: 'select', options: ['Open', 'Closed', 'Processing'] },
      { name: 'periodType', label: 'Period Type', type: 'select', options: ['Monthly', 'Bi-Weekly', 'Weekly'] },
      { name: 'paymentMethod', label: 'Payment Method', type: 'select', options: ['Bank Transfer', 'Cheque', 'Cash'] },
      { name: 'currencyCode', label: 'Currency', type: 'select', options: ['INR', 'USD'] },
    ]}
    defaultValues={{ status: 'Open', periodType: 'Monthly', paymentMethod: 'Bank Transfer', currencyCode: 'INR', activeFlag: true }}
  />
);

export const AssignmentStatusTypes = () => (
  <CRUDModule
    title="Assignment Status Types"
    endpoint="assignment-status-types"
    columns={[
      { key: 'statusCode', label: 'Code' },
      { key: 'statusName', label: 'Status Name' },
     
     { key: 'isActive', label: 'Active', type: 'toggle' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'statusCode', label: 'Status Code', required: true },
      { name: 'statusName', label: 'Status Name', required: true },
      // { name: 'userStatus', label: 'User Status' },
      // { name: 'systemStatus', label: 'System Status' },
    ]}
    defaultValues={{ isActive: true }}
  />
);

export const ElementTypes = () => (
  <CRUDModule
    title="Element Types"
    endpoint="element-types"
    columns={[
      { key: 'elementCode', label: 'Code' },
      { key: 'elementName', label: 'Element Name' },
      { key: 'classification', label: 'Classification' },
      { key: 'processingPriority', label: 'Priority' },
      { key: 'activeFlag', label: 'Active', render: (v) => v ? '✅' : '❌' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'elementCode', label: 'Element Code', required: true },
      { name: 'elementName', label: 'Element Name', required: true },
      { name: 'classification', label: 'Classification', type: 'select', options: ['Earnings', 'Deductions', 'Employer Contributions', 'Informational'] },
      { name: 'processingPriority', label: 'Priority', type: 'number' },
      { name: 'recurringFlag', label: 'Recurring', type: 'checkbox' },
    ]}
    defaultValues={{ processingPriority: 10, recurringFlag: true, activeFlag: true }}
  />
);

export const ElementEntries = () => (
  <CRUDModule
    title="Element Entries"
    endpoint="element-entries"
    columns={[
      { key: 'elementType', label: 'Element', render: (v) => v?.elementName || '—' },
      { key: 'value', label: 'Value', render: (v) => `₹${Number(v).toLocaleString()}` },
      { key: 'currency', label: 'Currency' },
      { key: 'activeFlag', label: 'Active', render: (v) => v ? '✅' : '❌' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'assignmentId', label: 'Assignment', type: 'select', optionsUrl: 'assignments', optionLabel: 'id', required: true },
      { name: 'elementTypeId', label: 'Element Type', type: 'select', optionsUrl: 'element-types', optionLabel: 'elementName', required: true },
      { name: 'value', label: 'Value', type: 'number', required: true },
      { name: 'currency', label: 'Currency', type: 'select', options: ['INR', 'USD'] },
    ]}
    defaultValues={{ currency: 'INR', activeFlag: true }}
  />
);

export const Salaries = () => (
  <CRUDModule
    title="Salaries"
    endpoint="salaries"
    columns={[
      { key: 'assignment', label: 'Assignment', render: (v) => v?.id || '—' },
      { key: 'basicAmount', label: 'Basic', render: (v) => `₹${Number(v).toLocaleString()}` },
      { key: 'annualGross', label: 'Annual Gross', render: (v) => `₹${Number(v).toLocaleString()}` },
      { key: 'currency', label: 'Currency' },
      { key: 'approvalStatus', label: 'Status' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'assignmentId', label: 'Assignment', type: 'select', optionsUrl: 'assignments', optionLabel: 'id', required: true },
      { name: 'basicAmount', label: 'Basic Amount', type: 'number', required: true },
      { name: 'annualGross', label: 'Annual Gross', type: 'number', required: true },
      { name: 'currency', label: 'Currency', type: 'select', options: ['INR', 'USD'] },
      { name: 'approvalStatus', label: 'Status', type: 'select', options: ['Pending', 'Approved', 'Rejected'] },
    ]}
    defaultValues={{ currency: 'INR', approvalStatus: 'Pending', activeFlag: true }}
  />
);

export const PayrollRuns = () => (
  <CRUDModule
    title="Payroll Runs"
    endpoint="payroll-runs"
    columns={[
      { key: 'payPeriod', label: 'Period', render: (v) => v?.periodName || '—' },
      { key: 'runDate', label: 'Run Date', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
      { key: 'runStatus', label: 'Status' },
      { key: 'totalEmployees', label: 'Employees' },
      { key: 'totalNet', label: 'Net Total', render: (v) => `₹${Number(v).toLocaleString()}` },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'payPeriodId', label: 'Pay Period', type: 'select', optionsUrl: 'payroll-periods', optionLabel: 'periodName', required: true },
      { name: 'runDate', label: 'Run Date', type: 'date', required: true },
      { name: 'runStatus', label: 'Status', type: 'select', options: ['Pending', 'Processing', 'Completed', 'Failed'] },
      { name: 'totalEmployees', label: 'Total Employees', type: 'number' },
      { name: 'totalGross', label: 'Total Gross', type: 'number' },
      { name: 'totalDeductions', label: 'Total Deductions', type: 'number' },
      { name: 'totalNet', label: 'Total Net', type: 'number' },
    ]}
    defaultValues={{ runStatus: 'Pending', activeFlag: true }}
  />
);

export const Payslips = () => (
  <CRUDModule
    title="Payslips"
    endpoint="payslips"
    columns={[
      { key: 'person', label: 'Employee', render: (v) => v ? `${v.firstName} ${v.lastName}` : '—' },
      { key: 'periodName', label: 'Period' },
      { key: 'grossAmount', label: 'Gross', render: (v) => `₹${Number(v).toLocaleString()}` },
      { key: 'totalDeductions', label: 'Deductions', render: (v) => `₹${Number(v).toLocaleString()}` },
      { key: 'netAmount', label: 'Net Pay', render: (v) => `₹${Number(v).toLocaleString()}` },
      { key: 'status', label: 'Status' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'payrollRunId', label: 'Payroll Run', type: 'select', optionsUrl: 'payroll-runs', optionLabel: 'id', required: true },
      { name: 'assignmentId', label: 'Assignment', type: 'select', optionsUrl: 'assignments', optionLabel: 'id', required: true },
      { name: 'personId', label: 'Employee', type: 'select', optionsUrl: 'persons', optionLabel: 'firstName', required: true },
      { name: 'periodName', label: 'Period Name', required: true },
      { name: 'grossAmount', label: 'Gross Amount', type: 'number', required: true },
      { name: 'totalDeductions', label: 'Total Deductions', type: 'number' },
      { name: 'netAmount', label: 'Net Amount', type: 'number', required: true },
      { name: 'currency', label: 'Currency', type: 'select', options: ['INR', 'USD'] },
      { name: 'status', label: 'Status', type: 'select', options: ['Pending', 'Generated', 'Published'] },
    ]}
    defaultValues={{ currency: 'INR', status: 'Pending', activeFlag: true }}
  />
);

export const TaxDeclarations = () => (
  <CRUDModule
    title="Tax Declarations"
    endpoint="tax-declarations"
    columns={[
      { key: 'person', label: 'Employee', render: (v) => v ? `${v.firstName} ${v.lastName}` : '—' },
      { key: 'financialYear', label: 'FY' },
      { key: 'section', label: 'Section' },
      { key: 'declaredAmount', label: 'Declared', render: (v) => `₹${Number(v).toLocaleString()}` },
      { key: 'status', label: 'Status' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'personId', label: 'Employee', type: 'select', optionsUrl: 'persons', optionLabel: 'firstName', required: true },
      { name: 'assignmentId', label: 'Assignment', type: 'select', optionsUrl: 'assignments', optionLabel: 'id', required: true },
      { name: 'financialYear', label: 'Financial Year', required: true, placeholder: '2025-26' },
      { name: 'section', label: 'Section (e.g. 80C)', required: true },
      { name: 'declaredAmount', label: 'Declared Amount', type: 'number', required: true },
      { name: 'approvedAmount', label: 'Approved Amount', type: 'number' },
      { name: 'proofSubmitted', label: 'Proof Submitted', type: 'checkbox' },
      { name: 'status', label: 'Status', type: 'select', options: ['Pending', 'Approved', 'Rejected'] },
    ]}
    defaultValues={{ status: 'Pending', activeFlag: true }}
  />
);

// ─── LEAVE ──────────────────────────────────────────────────────────────────

export const AbsenceTypes = () => (
  <CRUDModule
    title="Leave Types"
    endpoint="absence-types"
    columns={[
      { key: 'absenceCode', label: 'Code' },
      { key: 'absenceName', label: 'Leave Type' },
      { key: 'entitlementPerYear', label: 'Entitlement/Yr' },
      { key: 'carryForwardFlag', label: 'Carry Fwd', render: (v) => v ? '✅' : '❌' },
      { key: 'activeFlag', label: 'Active', render: (v) => v ? '✅' : '❌' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'absenceCode', label: 'Absence Code', required: true },
      { name: 'absenceName', label: 'Absence Name', required: true },
      { name: 'entitlementPerYear', label: 'Days per Year', type: 'number' },
      { name: 'carryForwardFlag', label: 'Carry Forward', type: 'checkbox' },
      { name: 'maxCarryDays', label: 'Max Carry Days', type: 'number' },
    ]}
    defaultValues={{ entitlementPerYear: 12, carryForwardFlag: false, maxCarryDays: 0, activeFlag: true }}
  />
);

export const Absences = () => (
  <CRUDModule
    title="Leave Requests"
    endpoint="absences"
    columns={[
      { key: 'person', label: 'Employee', render: (v) => v ? `${v.firstName} ${v.lastName}` : '—' },
      { key: 'absenceType', label: 'Leave Type', render: (v) => v?.absenceName || '—' },
      { key: 'startDate', label: 'From', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
      { key: 'endDate', label: 'To', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
      { key: 'days', label: 'Days' },
      { key: 'status', label: 'Status' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'personId', label: 'Employee', type: 'select', optionsUrl: 'persons', optionLabel: 'firstName', required: true },
      { name: 'absenceTypeId', label: 'Leave Type', type: 'select', optionsUrl: 'absence-types', optionLabel: 'absenceName', required: true },
      { name: 'startDate', label: 'Start Date', type: 'date', required: true },
      { name: 'endDate', label: 'End Date', type: 'date', required: true },
      { name: 'days', label: 'Number of Days', type: 'number', required: true },
      { name: 'status', label: 'Status', type: 'select', options: ['Pending', 'Approved', 'Rejected', 'Cancelled'] },
      // ✅ Changed from text input to person dropdown
      { 
        name: 'approvedByPersonId', 
        label: 'Approved By', 
        type: 'select', 
        optionsUrl: 'persons', 
        optionLabel: 'firstName',
        optionValue: 'id',
      },
    ]}
    defaultValues={{ days: 1, status: 'Pending', activeFlag: true }}
  />
);

export const Timecards = () => (
  <CRUDModule
    title="Timecards"
    endpoint="timecards"
    columns={[
      { key: 'workDate', label: 'Date', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
      { key: 'attendanceStatus', label: 'Status' },
      { key: 'hoursWorked', label: 'Hours' },
      { key: 'otHours', label: 'OT Hours' },
      { key: 'approvalStatus', label: 'Approval' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'personId', label: 'Employee', type: 'select', optionsUrl: 'persons', optionLabel: 'firstName', required: true },
      { name: 'assignmentId', label: 'Assignment', type: 'select', optionsUrl: 'assignments', optionLabel: 'id', required: true },
      { name: 'workDate', label: 'Work Date', type: 'date', required: true },
      { name: 'scheduleId', label: 'Work Schedule', type: 'select', optionsUrl: 'work-schedules', optionLabel: 'scheduleName', required: true },
      { name: 'clockIn', label: 'Clock In', type: 'time' },
      { name: 'clockOut', label: 'Clock Out', type: 'time' },
      { name: 'hoursWorked', label: 'Hours Worked', type: 'number' },
      { name: 'attendanceStatus', label: 'Status', type: 'select', options: ['Present', 'Absent', 'Half Day', 'Leave', 'Holiday'] },
      { name: 'otHours', label: 'OT Hours', type: 'number' },
      { name: 'approvalStatus', label: 'Approval', type: 'select', options: ['Pending', 'Approved', 'Rejected'] },
    ]}
    defaultValues={{ hoursWorked: 8, attendanceStatus: 'Present', approvalStatus: 'Pending', activeFlag: true }}
  />
);

export const WorkSchedules = () => (
  <CRUDModule
    title="Work Schedules"
    endpoint="work-schedules"
    columns={[
      { key: 'scheduleCode', label: 'Code' },
      { key: 'scheduleName', label: 'Schedule' },
      { key: 'shiftStart', label: 'Start' },
      { key: 'shiftEnd', label: 'End' },
      { key: 'workingHours', label: 'Hours' },
      { key: 'applicableDays', label: 'Days' },
    ]}
    fields={[
     { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
       { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'scheduleCode', label: 'Schedule Code', required: true },
      { name: 'scheduleName', label: 'Schedule Name', required: true },
      {
  name: 'shiftStart',
  label: 'Shift Start',
  type: 'time',   // ✅ this enables clock/time picker
  required: true
},
{
  name: 'shiftEnd',
  label: 'Shift End',
  type: 'time',   // ✅ this enables clock/time picker
  required: true
},
      { name: 'breakMinutes', label: 'Break (minutes)', type: 'number' },
      { name: 'workingHours', label: 'Working Hours', type: 'number' },
      { name: 'applicableDays', label: 'Applicable Days', placeholder: 'Mon-Sat' },
    ]}
    defaultValues={{ breakMinutes: 60, workingHours: 8, activeFlag: true }}
  />
);

export const HolidayCalendars = () => (
  <CRUDModule
    title="Holiday Calendar"
    endpoint="holiday-calendars"
    columns={[
      { key: 'holidayDate', label: 'Date', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
      { key: 'holidayName', label: 'Holiday' },
      { key: 'holidayType', label: 'Type' },
      { key: 'applicableTo', label: 'Applicable To' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'locationId', label: 'Location', type: 'select', optionsUrl: 'locations', optionLabel: 'locationName', required: true },
      { name: 'holidayDate', label: 'Holiday Date', type: 'date', required: true },
      { name: 'holidayName', label: 'Holiday Name', required: true },
      { name: 'holidayType', label: 'Type', type: 'select', options: ['National', 'Regional', 'Restricted', 'Optional'] },
      { name: 'applicableTo', label: 'Applicable To', placeholder: 'All' },
    ]}
    defaultValues={{ applicableTo: 'All', activeFlag: true }}
  />
);

// ─── RECRUITMENT ─────────────────────────────────────────────────────────────

export const Requisitions = () => (
  <CRUDModule
    title="Requisitions"
    endpoint="requisitions"
    columns={[
      { key: 'position', label: 'Position', render: (v) => v?.positionName || '—' },
      { key: 'vacancyCount', label: 'Vacancies' },
      { key: 'priority', label: 'Priority' },
      { key: 'requisitionStatus', label: 'Status' },
      { key: 'raisedDate', label: 'Raised', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'positionId', label: 'Position', type: 'select', optionsUrl: 'positions', optionLabel: 'positionName', required: true },
      { name: 'orgId', label: 'HR Org', type: 'select', optionsUrl: 'hr-organizations', optionLabel: 'orgName', required: true },
      { name: 'requestedByPersonId', label: 'Requested By', type: 'select', optionsUrl: 'persons', optionLabel: 'firstName', required: true },
      { name: 'vacancyCount', label: 'Vacancy Count', type: 'number' },
      { name: 'priority', label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
      { name: 'requisitionStatus', label: 'Status', type: 'select', options: ['Open', 'In Progress', 'Closed', 'Cancelled'] },
      { name: 'raisedDate', label: 'Raised Date', type: 'date', required: true },
      { name: 'targetCloseDate', label: 'Target Close Date', type: 'date' },
    ]}
    defaultValues={{ vacancyCount: 1, priority: 'Medium', requisitionStatus: 'Open', activeFlag: true }}
  />
);

export const JobPostings = () => (
  <CRUDModule
    title="Job Postings"
    endpoint="job-postings"
    columns={[
      { key: 'postingTitle', label: 'Title' },
      { key: 'postingChannel', label: 'Channel' },
      { key: 'postingDate', label: 'Posted', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
      { key: 'closingDate', label: 'Closing', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
      { key: 'postingStatus', label: 'Status' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'requisitionId', label: 'Requisition', type: 'select', optionsUrl: 'requisitions', optionLabel: 'id', required: true },
      { name: 'postingTitle', label: 'Posting Title', required: true, full: true },
      { name: 'postingDescription', label: 'Description', type: 'textarea', full: true },
      { name: 'qualificationRequired', label: 'Qualification Required' },
      { name: 'experienceYearsMin', label: 'Min Experience (Yrs)', type: 'number' },
      { name: 'experienceYearsMax', label: 'Max Experience (Yrs)', type: 'number' },
      { name: 'salaryRangeMin', label: 'Min Salary', type: 'number' },
      { name: 'salaryRangeMax', label: 'Max Salary', type: 'number' },
      { name: 'postingChannel', label: 'Posting Channel' },
      { name: 'postingDate', label: 'Posting Date', type: 'date', required: true },
      { name: 'closingDate', label: 'Closing Date', type: 'date', required: true },
      { name: 'postingStatus', label: 'Status', type: 'select', options: ['Draft', 'Active', 'Closed', 'Cancelled'] },
    ]}
    defaultValues={{ postingStatus: 'Active', isActive: true }}
  />
);

export const Applicants = () => (
  <CRUDModule
    title="Applicants"
    endpoint="applicants"
    columns={[
      { key: 'firstName', label: 'First Name' },
      { key: 'lastName', label: 'Last Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'source', label: 'Source' },
      { key: 'currentDesignation', label: 'Current Role' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'firstName', label: 'First Name', required: true },
       { name: 'middleName', label: 'Middle Name',required: true},
      { name: 'lastName', label: 'Last Name', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone' },
      { name: 'source', label: 'Source', type: 'select', options: ['Job Portal', 'Referral', 'Walk-in', 'LinkedIn', 'Campus'] },
      { name: 'currentCompany', label: 'Current Company' },
      { name: 'currentDesignation', label: 'Current Designation' },
      { name: 'expectedSalary', label: 'Expected Salary', type: 'number' },
    ]}
    defaultValues={{ activeFlag: true }}
  />
);

export const Applications = () => (
  <CRUDModule
    title="Applications"
    endpoint="applications"
    columns={[
      { key: 'applicant', label: 'Applicant', render: (v) => v ? `${v.firstName} ${v.lastName}` : '—' },
      { key: 'applicationDate', label: 'Applied', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
      { key: 'applicationStatus', label: 'Status' },
      { key: 'screeningScore', label: 'Score' },
      { key: 'shortlistedFlag', label: 'Shortlisted', render: (v) => v ? '✅' : '❌' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'applicantId', label: 'Applicant', type: 'select', optionsUrl: 'applicants', optionLabel: 'firstName', required: true },
      { name: 'requisitionId', label: 'Requisition', type: 'select', optionsUrl: 'requisitions', optionLabel: 'id', required: true },
      { name: 'applicationDate', label: 'Application Date', type: 'date', required: true },
      { name: 'applicationStatus', label: 'Status', type: 'select', options: ['Received', 'Screening', 'Shortlisted', 'Interview Scheduled', 'Offered', 'Rejected', 'Withdrawn'] },
      { name: 'screeningScore', label: 'Screening Score', type: 'number' },
      { name: 'shortlistedFlag', label: 'Shortlisted', type: 'checkbox' },
    ]}
    defaultValues={{ applicationStatus: 'Received', shortlistedFlag: false, activeFlag: true }}
  />
);

export const Interviews = () => (
  <CRUDModule
    title="Interviews"
    endpoint="interviews"
    columns={[
      { key: 'interviewRound', label: 'Round' },
      { key: 'interviewDate', label: 'Date', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
      { key: 'interviewMode', label: 'Mode' },
      { key: 'interviewStatus', label: 'Status' },
      { key: 'rating', label: 'Rating' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'applicationId', label: 'Application', type: 'select', optionsUrl: 'applications', optionLabel: 'id', required: true },
      { name: 'interviewRound', label: 'Interview Round', type: 'number', required: true },
      { name: 'interviewDate', label: 'Interview Date', type: 'date', required: true },
      { name: 'interviewerPersonId', label: 'Interviewer', type: 'select', optionsUrl: 'persons', optionLabel: 'firstName', required: true },
      { name: 'interviewMode', label: 'Mode', type: 'select', options: ['In-Person', 'Video Call', 'Phone', 'Panel'] },
      { name: 'interviewStatus', label: 'Status', type: 'select', options: ['Scheduled', 'Completed', 'Cancelled', 'No Show'] },
      { name: 'rating', label: 'Rating (1–5)', type: 'number', min: 1, max: 5, step: 1 },
      { name: 'feedback', label: 'Feedback', type: 'textarea', full: true },
    ]}
    defaultValues={{ interviewRound: 1, interviewStatus: 'Scheduled', interviewMode: 'In-Person', activeFlag: true }}
  />
);

export const OfferLetters = () => (
  <CRUDModule
    title="Offer Letters"
    endpoint="offer-letters"
    columns={[
      { key: 'applicant', label: 'Applicant', render: (v) => v ? `${v.firstName} ${v.lastName}` : '—' },
      { key: 'offeredSalary', label: 'Offered Salary', render: (v) => `₹${Number(v).toLocaleString()}` },
      { key: 'offerDate', label: 'Offer Date', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
      { key: 'offerExpiryDate', label: 'Expiry', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
      { key: 'offerStatus', label: 'Status' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'applicationId', label: 'Application', type: 'select', optionsUrl: 'applications', optionLabel: 'id', required: true },
      { name: 'applicantId', label: 'Applicant', type: 'select', optionsUrl: 'applicants', optionLabel: 'firstName', required: true },
      { name: 'requisitionId', label: 'Requisition', type: 'select', optionsUrl: 'requisitions', optionLabel: 'id', required: true },
      { name: 'positionId', label: 'Position', type: 'select', optionsUrl: 'positions', optionLabel: 'positionName', required: true },
      { name: 'orgId', label: 'HR Org', type: 'select', optionsUrl: 'hr-organizations', optionLabel: 'orgName', required: true },
      { name: 'proposedGradeId', label: 'Grade', type: 'select', optionsUrl: 'grades', optionLabel: 'gradeName', required: true },
      { name: 'offeredSalary', label: 'Offered Salary', type: 'number', required: true },
      { name: 'joiningBonus', label: 'Joining Bonus', type: 'number' },
      { name: 'offerDate', label: 'Offer Date', type: 'date', required: true },
      { name: 'offerExpiryDate', label: 'Expiry Date', type: 'date', required: true },
      { name: 'offerStatus', label: 'Status', type: 'select', options: ['Pending', 'Accepted', 'Rejected', 'Expired'] },
      { name: 'rejectionReason', label: 'Rejection Reason', full: true },
    ]}
    defaultValues={{ joiningBonus: 0, offerStatus: 'Pending', activeFlag: true }}
  />
);

// ─── BENEFITS & LOANS ────────────────────────────────────────────────────────

export const BenefitPlans = () => (
  <CRUDModule
    title="Benefit Plans"
    endpoint="benefit-plans"
    columns={[
      { key: 'planCode', label: 'Code' },
      { key: 'planName', label: 'Plan Name' },
      { key: 'planType', label: 'Type' },
      { key: 'coverage', label: 'Coverage' },
      { key: 'employerContributionPct', label: 'Employer %' },
      { key: 'activeFlag', label: 'Active', render: (v) => v ? '✅' : '❌' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'planCode', label: 'Plan Code', required: true },
      { name: 'planName', label: 'Plan Name', required: true },
      { name: 'planType', label: 'Plan Type', type: 'select', options: ['Insurance', 'Retirement', 'Health', 'Other'] },
      { name: 'coverage', label: 'Coverage' },
      { name: 'employerContributionPct', label: 'Employer Contribution %', type: 'number' },
    ]}
    defaultValues={{ activeFlag: true }}
  />
);

export const BenefitEnrollments = () => (
  <CRUDModule
    title="Benefit Enrollments"
    endpoint="benefit-enrollments"
    columns={[
      { key: 'person', label: 'Employee', render: (v) => v ? `${v.firstName} ${v.lastName}` : '—' },
      { key: 'plan', label: 'Plan', render: (v) => v?.planName || '—' },
      { key: 'enrollmentStatus', label: 'Status' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'personId', label: 'Employee', type: 'select', optionsUrl: 'persons', optionLabel: 'firstName', required: true },
      { name: 'planId', label: 'Benefit Plan', type: 'select', optionsUrl: 'benefit-plans', optionLabel: 'planName', required: true },
      { name: 'assignmentId', label: 'Assignment', type: 'select', optionsUrl: 'assignments', optionLabel: 'id', required: true },
      { name: 'enrollmentStatus', label: 'Status', type: 'select', options: ['Enrolled', 'Pending', 'Waived', 'Terminated'] },
    ]}
    defaultValues={{ enrollmentStatus: 'Enrolled', activeFlag: true }}
  />
);

export const Loans = () => (
  <CRUDModule
    title="Loans"
    endpoint="loans"
    columns={[
      { key: 'person', label: 'Employee', render: (v) => v ? `${v.firstName} ${v.lastName}` : '—' },
      { key: 'loanType', label: 'Type' },
      { key: 'loanAmount', label: 'Amount', render: (v) => `₹${Number(v).toLocaleString()}` },
      { key: 'interestRate', label: 'Interest %' },
      { key: 'outstandingBalance', label: 'Outstanding', render: (v) => `₹${Number(v).toLocaleString()}` },
      { key: 'loanStatus', label: 'Status' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'personId', label: 'Employee', type: 'select', optionsUrl: 'persons', optionLabel: 'firstName', required: true },
      { name: 'assignmentId', label: 'Assignment', type: 'select', optionsUrl: 'assignments', optionLabel: 'id', required: true },
      { name: 'loanType', label: 'Loan Type', type: 'select', options: ['SALARY_ADVANCE', 'PERSONAL_LOAN', 'HOME_LOAN', 'VEHICLE_LOAN'] },
      { name: 'loanAmount', label: 'Loan Amount', type: 'number', required: true },
      { name: 'interestRate', label: 'Interest Rate %', type: 'number' },
      { name: 'emiAmount', label: 'EMI Amount', type: 'number', required: true },
      { name: 'tenureMonths', label: 'Tenure (months)', type: 'number', required: true },
      { name: 'disbursementDate', label: 'Disbursement Date', type: 'date', required: true },
      { name: 'outstandingBalance', label: 'Outstanding Balance', type: 'number' },
      { name: 'loanStatus', label: 'Status', type: 'select', options: ['Active', 'Closed', 'Defaulted'] },
    ]}
    defaultValues={{ interestRate: 0, loanStatus: 'Active', activeFlag: true }}
  />
);

// ─── LEARNING ────────────────────────────────────────────────────────────────

export const Competences = () => (
  <CRUDModule
    title="Competences"
    endpoint="competences"
    columns={[
      { key: 'competenceCode', label: 'Code' },
      { key: 'competenceName', label: 'Competence' },
      { key: 'competenceType', label: 'Type' },
      { key: 'activeFlag', label: 'Active', render: (v) => v ? '✅' : '❌' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company ID', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'competenceCode', label: 'Code', required: true },
      { name: 'competenceName', label: 'Name', required: true },
      { name: 'competenceType', label: 'Type', type: 'select', options: ['Technical', 'Behavioral', 'Leadership', 'Functional'] },
      { name: 'description', label: 'Description', type: 'textarea', full: true },
    ]}
    defaultValues={{ activeFlag: true }}
  />
);

export const TrainingPrograms = () => (
  <CRUDModule
    title="Training Programs"
    endpoint="training-programs"
    columns={[
      { key: 'programCode', label: 'Code' },
      { key: 'programName', label: 'Program' },
      { key: 'provider', label: 'Provider' },
      { key: 'durationHours', label: 'Duration (hrs)' },
      { key: 'costPerPerson', label: 'Cost', render: (v) => `₹${Number(v).toLocaleString()}` },
      { key: 'deliveryMode', label: 'Mode' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company ID', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'programCode', label: 'Program Code', required: true },
      { name: 'programName', label: 'Program Name', required: true },
      { name: 'provider', label: 'Provider' },
      { name: 'durationHours', label: 'Duration (hours)', type: 'number' },
      { name: 'costPerPerson', label: 'Cost per Person', type: 'number' },
      { name: 'deliveryMode', label: 'Delivery Mode', type: 'select', options: ['Classroom', 'Online', 'Blended', 'On-the-Job'] },
    ]}
    defaultValues={{ durationHours: 8, costPerPerson: 0, deliveryMode: 'Classroom', activeFlag: true }}
  />
);

export const TrainingEnrollments = () => (
  <CRUDModule
    title="Training Enrollments"
    endpoint="training-enrollments"
    columns={[
      { key: 'person', label: 'Employee', render: (v) => v ? `${v.firstName} ${v.lastName}` : '—' },
      { key: 'program', label: 'Program', render: (v) => v?.programName || '—' },
      { key: 'enrollmentDate', label: 'Enrolled', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
      { key: 'completionStatus', label: 'Status' },
      { key: 'score', label: 'Score' },
      { key: 'certificateIssued', label: 'Certificate', render: (v) => v ? '✅' : '❌' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'personId', label: 'Employee', type: 'select', optionsUrl: 'persons', optionLabel: 'firstName', required: true },
      { name: 'programId', label: 'Program', type: 'select', optionsUrl: 'training-programs', optionLabel: 'programName', required: true },
      { name: 'enrollmentDate', label: 'Enrollment Date', type: 'date', required: true },
      { name: 'completionDate', label: 'Completion Date', type: 'date' },
      { name: 'completionStatus', label: 'Status', type: 'select', options: ['Enrolled', 'In Progress', 'Completed', 'Dropped'] },
      { name: 'score', label: 'Score', type: 'number' },
      { name: 'certificateIssued', label: 'Certificate Issued', type: 'checkbox' },
    ]}
    defaultValues={{ completionStatus: 'Enrolled', certificateIssued: false, activeFlag: true }}
  />
);

// ─── PERFORMANCE ─────────────────────────────────────────────────────────────

export const Appraisals = () => (
  <CRUDModule
    title="Appraisals"
    endpoint="appraisals"
    columns={[
      { key: 'person', label: 'Employee', render: (v) => v ? `${v.firstName} ${v.lastName}` : '—' },
      { key: 'reviewPeriod', label: 'Review Period' },
      { key: 'overallRating', label: 'Rating' },
      { key: 'recommendation', label: 'Recommendation' },
      { key: 'appraisalStatus', label: 'Status' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'personId', label: 'Employee', type: 'select', optionsUrl: 'persons', optionLabel: 'firstName', required: true },
      { name: 'assignmentId', label: 'Assignment', type: 'select', optionsUrl: 'assignments', optionLabel: 'id', required: true },
      { name: 'reviewPeriod', label: 'Review Period', required: true, placeholder: 'FY 2025-26' },
      { name: 'reviewerPersonId', label: 'Reviewer', type: 'select', optionsUrl: 'persons', optionLabel: 'firstName', required: true },
      { name: 'overallRating', label: 'Overall Rating (1–5)', type: 'number', min: 1, max: 5, step: 1 },
      { name: 'recommendation', label: 'Recommendation' },
      { name: 'appraisalStatus', label: 'Status', type: 'select', options: ['Draft', 'In Progress', 'Completed', 'Approved'] },
    ]}
    defaultValues={{ appraisalStatus: 'Draft', activeFlag: true }}
  />
);

// ─── SEPARATION ───────────────────────────────────────────────────────────────

export const Separations = () => (
  <CRUDModule
    title="Separations"
    endpoint="separations"
    columns={[
      { key: 'person', label: 'Employee', render: (v) => v ? `${v.firstName} ${v.lastName}` : '—' },
      { key: 'separationType', label: 'Type' },
      { key: 'reason', label: 'Reason' },
      { key: 'lastWorkingDate', label: 'Last Day', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
      { key: 'separationStatus', label: 'Status' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'personId', label: 'Employee', type: 'select', optionsUrl: 'persons', optionLabel: 'firstName', required: true },
      { name: 'assignmentId', label: 'Assignment', type: 'select', optionsUrl: 'assignments', optionLabel: 'id', required: true },
      { name: 'separationType', label: 'Type', type: 'select', options: ['RESIGNATION', 'TERMINATION', 'RETIREMENT', 'LAYOFF', 'DEATH'] },
      { name: 'reason', label: 'Reason', full: true },
      { name: 'resignationDate', label: 'Resignation Date', type: 'date' },
      { name: 'noticePeriodDays', label: 'Notice Period (days)', type: 'number' },
      { name: 'lastWorkingDate', label: 'Last Working Date', type: 'date' },
      { name: 'separationStatus', label: 'Status', type: 'select', options: ['Initiated', 'In Notice', 'Cleared', 'Completed'] },
      { name: 'approvedByPersonId', label: 'Approved By', type: 'select', optionsUrl: 'persons', optionLabel: 'firstName' },
    ]}
    defaultValues={{ noticePeriodDays: 30, separationStatus: 'Initiated', activeFlag: true }}
  />
);

export const ExitChecklists = () => (
  <CRUDModule
    title="Exit Checklists"
    endpoint="exit-checklists"
    columns={[
      { key: 'checklistItem', label: 'Item' },
      { key: 'department', label: 'Department' },
      { key: 'assignedTo', label: 'Assigned To' },
      { key: 'status', label: 'Status' },
      { key: 'completionDate', label: 'Completed', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'separationId', label: 'Separation', type: 'select', optionsUrl: 'separations', optionLabel: 'id', required: true },
      { name: 'personId', label: 'Employee', type: 'select', optionsUrl: 'persons', optionLabel: 'firstName', required: true },
      { name: 'checklistItem', label: 'Checklist Item', required: true },
      { name: 'department', label: 'Department' },
      { name: 'assignedTo', label: 'Assigned To' },
      { name: 'status', label: 'Status', type: 'select', options: ['Pending', 'Completed', 'Waived'] },
      { name: 'completionDate', label: 'Completion Date', type: 'date' },
      { name: 'remarks', label: 'Remarks', type: 'textarea', full: true },
    ]}
    defaultValues={{ status: 'Pending', activeFlag: true }}
  />
);

export const FinalSettlements = () => (
  <CRUDModule
    title="Final Settlements"
    endpoint="final-settlements"
    columns={[
      { key: 'pendingSalary', label: 'Pending Salary', render: (v) => `₹${Number(v).toLocaleString()}` },
      { key: 'leaveEncashmentAmount', label: 'Leave Encash', render: (v) => `₹${Number(v).toLocaleString()}` },
      { key: 'gratuityAmount', label: 'Gratuity', render: (v) => `₹${Number(v).toLocaleString()}` },
      { key: 'netSettlement', label: 'Net Settlement', render: (v) => `₹${Number(v).toLocaleString()}` },
      { key: 'settlementStatus', label: 'Status' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'bgId', label: 'Business Group', type: 'select', optionsUrl: 'business-groups', optionLabel: 'bgName', required: true },
      { name: 'separationId', label: 'Separation', type: 'select', optionsUrl: 'separations', optionLabel: 'id', required: true },
      { name: 'personId', label: 'Employee', type: 'select', optionsUrl: 'persons', optionLabel: 'firstName', required: true },
      { name: 'assignmentId', label: 'Assignment', type: 'select', optionsUrl: 'assignments', optionLabel: 'id', required: true },
      { name: 'pendingSalary', label: 'Pending Salary', type: 'number' },
      { name: 'leaveEncashmentDays', label: 'Leave Encash Days', type: 'number' },
      { name: 'leaveEncashmentAmount', label: 'Leave Encash Amount', type: 'number' },
      { name: 'gratuityAmount', label: 'Gratuity Amount', type: 'number' },
      { name: 'bonusDue', label: 'Bonus Due', type: 'number' },
      { name: 'totalEarnings', label: 'Total Earnings', type: 'number' },
      { name: 'recoveryLoan', label: 'Loan Recovery', type: 'number' },
      { name: 'recoveryOther', label: 'Other Recovery', type: 'number' },
      { name: 'totalDeductions', label: 'Total Deductions', type: 'number' },
      { name: 'netSettlement', label: 'Net Settlement', type: 'number' },
      { name: 'settlementStatus', label: 'Status', type: 'select', options: ['Pending', 'Approved', 'Paid', 'Disputed'] },
    ]}
    defaultValues={{ settlementStatus: 'Pending', activeFlag: true }}
  />
);

// ─── ADMIN ────────────────────────────────────────────────────────────────────

export const SecurityRoles = () => (
  <CRUDModule
    title="Security Roles"
    endpoint="security-roles"
    columns={[
      { key: 'roleCode', label: 'Code' },
      { key: 'roleName', label: 'Role Name' },
      { key: 'description', label: 'Description' },
      { key: 'activeFlag', label: 'Active', render: (v) => v ? '✅' : '❌' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'roleCode', label: 'Role Code', required: true },
      { name: 'roleName', label: 'Role Name', required: true },
      { name: 'description', label: 'Description', type: 'textarea', full: true },
    ]}
    defaultValues={{ activeFlag: true }}
  />
);

export const Users = () => (
  <CRUDModule
    title="Users"
    endpoint="users"
    columns={[
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role', render: (v) => v?.roleName || '—' },
      { key: 'activeFlag', label: 'Active', render: (v) => v ? '✅' : '❌' },
    ]}
    fields={[
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'passwordHash', label: 'Password', type: 'password', required: true },
      { name: 'roleId', label: 'Role', type: 'select', optionsUrl: 'security-roles', optionLabel: 'roleName', required: true },
      { name: 'personId', label: 'Person', type: 'select', optionsUrl: 'persons', optionLabel: 'firstName' },
    ]}
    defaultValues={{ activeFlag: true }}
  />
);

export const AuditLogs = () => (
  <CRUDModule
    title="Audit Logs"
    endpoint="audit-logs"
    columns={[
      { key: 'tableName', label: 'Table' },
      { key: 'recordId', label: 'Record ID' },
      { key: 'action', label: 'Action' },
      { key: 'changeDate', label: 'Date', render: (v) => v ? new Date(v).toLocaleString() : '—' },
      { key: 'ipAddress', label: 'IP' },
    ]}
    fields={[
      { name: 'companyId', label: 'Company', type: 'select', optionsUrl: 'companies', optionLabel: 'companyName', required: true },
      { name: 'userId', label: 'User', type: 'select', optionsUrl: 'users', optionLabel: 'email', required: true },
      { name: 'tableName', label: 'Table Name', required: true },
      { name: 'recordId', label: 'Record ID', required: true },
      { name: 'action', label: 'Action', type: 'select', options: ['INSERT', 'UPDATE', 'DELETE'] },
      { name: 'oldValue', label: 'Old Value', type: 'textarea' },
      { name: 'newValue', label: 'New Value', type: 'textarea' },
    ]}
  />
);
