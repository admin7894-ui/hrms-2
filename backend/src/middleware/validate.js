// src/middleware/validate.js

const NAME_REGEX = /^[a-zA-Z0-9\s,.\-\/()]+$/;
const CODE_REGEX = /^[a-zA-Z0-9\-_]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]{7,15}$/;
const PINCODE_REGEX = /^[0-9]{4,10}$/;

const FIELD_RULES = {
  // ✅ Company
  companyName: { min: 2, max: 100, regex: NAME_REGEX, label: 'Company Name' },
  registrationNo: { min: 2, max: 50, regex: CODE_REGEX, label: 'Registration No' },

  // ✅ Business Type (🔥 Added)
  businessTypeName: { min: 2, max: 100, regex: /^[a-zA-Z\s]+$/, label: 'Business Type Name' },
  businessTypeCode: { min: 1, max: 20, regex: CODE_REGEX, label: 'Business Type Code' },

  // ✅ Location
  locationName: { min: 3, max: 100, regex: /^[a-zA-Z\s]+$/, label: 'Location Name' },
  address1: { min: 3, max: 150, regex: NAME_REGEX, label: 'Address' },

  // ✅ Business Group
  bgName: { min: 2, max: 100, regex: /^[a-zA-Z\s]+$/, label: 'Business Group Name' },

  // ✅ Legal / Org Structure
  leName: { min: 2, max: 100, regex: /^[a-zA-Z\s]+$/, label: 'Legal Entity Name' },
  taxRegistrationNo: {
    min: 5,
    max: 30,
    regex: /^[a-zA-Z0-9-]+$/,
    label: 'Tax Registration No'
  },
  ouName: { min: 2, max: 100, regex: /^[a-zA-Z\s]+$/, label: 'Operating Unit Name' },
  ouShortCode: { min: 2, max: 20, regex: CODE_REGEX, label: 'OU Short Code' },
  orgName: { min: 2, max: 100, regex: /^[a-zA-Z\s]+$/, label: 'Org Name' },
  orgCode: { min: 2, max: 20, regex: CODE_REGEX, label: 'Org Code' },

  // ✅ Person
  firstName: { min: 2, max: 50, regex: /^[a-zA-Z\s]+$/, label: 'First Name' },
  lastName: { min: 2, max: 50, regex: /^[a-zA-Z\s]+$/, label: 'Last Name' },
  email: { regex: EMAIL_REGEX, label: 'Email' },
  phoneNumber: { regex: PHONE_REGEX, label: 'Phone Number' },

  // ✅ Grade / Job
  gradeCode: { min: 1, max: 20, regex: CODE_REGEX, label: 'Grade Code' },
  gradeName: { min: 2, max: 100, regex: NAME_REGEX, label: 'Grade Name' },
  jobCode: { min: 1, max: 20, regex: CODE_REGEX, label: 'Job Code' },
  jobName: { min: 2, max: 100, regex: NAME_REGEX, label: 'Job Name' },
  positionName: { min: 2, max: 100, regex: NAME_REGEX, label: 'Position Name' },

  // ✅ Payroll
  payrollName: { min: 2, max: 100, regex: NAME_REGEX, label: 'Payroll Name' },
  payrollCode: { min: 1, max: 20, regex: CODE_REGEX, label: 'Payroll Code' },
  elementCode: { min: 1, max: 20, regex: CODE_REGEX, label: 'Element Code' },
  elementName: { min: 2, max: 100, regex: NAME_REGEX, label: 'Element Name' },

  // ✅ Roles
  roleCode: { min: 2, max: 30, regex: CODE_REGEX, label: 'Role Code' },
  roleName: { min: 2, max: 100, regex: NAME_REGEX, label: 'Role Name' },

  // ✅ Leave / Absence
  absenceCode: { min: 1, max: 10, regex: CODE_REGEX, label: 'Absence Code' },
  absenceName: { min: 2, max: 100, regex: NAME_REGEX, label: 'Absence Name' },

  // ✅ Learning
  programCode: { min: 1, max: 20, regex: CODE_REGEX, label: 'Program Code' },
  programName: { min: 2, max: 100, regex: NAME_REGEX, label: 'Program Name' },
  competenceCode: { min: 1, max: 20, regex: CODE_REGEX, label: 'Competence Code' },
  competenceName: { min: 2, max: 100, regex: NAME_REGEX, label: 'Competence Name' },

  // ✅ Misc
  locationTypeName: { min: 2, max: 100, regex: NAME_REGEX, label: 'Location Type Name' },
  scheduleCode: { min: 1, max: 20, regex: CODE_REGEX, label: 'Schedule Code' },
  scheduleName: { min: 2, max: 100, regex: NAME_REGEX, label: 'Schedule Name' },
};

function validate(req, res, next) {
  const body = req.body;
  const errors = {};

  for (const [field, rules] of Object.entries(FIELD_RULES)) {
    let value = body[field];

    // Skip if field not present
    if (value === undefined || value === null || value === '') continue;

    let str = String(value).trim();

    // ✅ Trim value (important)
    req.body[field] = str;

    // ✅ Auto uppercase for codes
    if (field.toLowerCase().includes('code')) {
      str = str.toUpperCase();
      req.body[field] = str;
    }

    // ✅ Min length
    if (rules.min && str.length < rules.min) {
      errors[field] = `${rules.label} must be at least ${rules.min} characters.`;
      continue;
    }

    // ✅ Max length
    if (rules.max && str.length > rules.max) {
      errors[field] = `${rules.label} must be at most ${rules.max} characters.`;
      continue;
    }

    // ✅ Regex validation
    if (rules.regex && !rules.regex.test(str)) {
      errors[field] = `${rules.label} contains invalid characters.`;
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      error: Object.values(errors)[0], // first error
      errors,                          // full error object
    });
  }

  next();
}

module.exports = { validate };