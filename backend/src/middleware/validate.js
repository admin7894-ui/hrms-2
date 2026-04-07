// src/middleware/validate.js

const NAME_REGEX = /^[a-zA-Z0-9\s,.\-\/()]+$/;
const CODE_REGEX = /^[a-zA-Z0-9\-_]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[6-9][0-9]{9}$/;
const PAN_REGEX   = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const ALPHANUMERIC_NAME_REGEX = /^(?=.*[A-Za-z])[A-Za-z0-9 ]+$/;

// ─── Field Rules ──────────────────────────────────────────────────────────────
const FIELD_RULES = {
  // Company
  companyName:       { min: 2, max: 100, regex: NAME_REGEX,         label: 'Company Name' },
  registrationNo:    { min: 2, max: 50,  regex: CODE_REGEX,         label: 'Registration No' },

  // Business Type
  businessTypeName:  { min: 2, max: 100, regex: /^[a-zA-Z\s]+$/,   label: 'Business Type Name' },
  businessTypeCode:  { min: 1, max: 20,  regex: CODE_REGEX,         label: 'Business Type Code' },

  // Location
  locationName:      { min: 3, max: 100, regex: /^[a-zA-Z\s]+$/,   label: 'Location Name' },
  address1:          { min: 3, max: 150, regex: NAME_REGEX,         label: 'Address' },

  // Business Group
  bgName:            { min: 2, max: 100, regex: /^[a-zA-Z\s]+$/,   label: 'Business Group Name' },

  // Legal / Org
  leName:            { min: 2, max: 100, regex: /^[a-zA-Z\s]+$/,   label: 'Legal Entity Name' },
  taxRegistrationNo: { min: 5, max: 30,  regex: /^[a-zA-Z0-9-]+$/, label: 'Tax Registration No' },
  ouName:            { min: 2, max: 100, regex: /^[a-zA-Z\s]+$/,   label: 'Operating Unit Name' },
  ouShortCode:       { min: 2, max: 20,  regex: CODE_REGEX,         label: 'OU Short Code' },
  orgName:           { min: 2, max: 100, regex: /^[a-zA-Z\s]+$/,   label: 'Org Name' },
  orgCode:           { min: 2, max: 20,  regex: CODE_REGEX,         label: 'Org Code' },

  // Person — generic fields
  firstName:         { min: 2, max: 50,  regex: /^[a-zA-Z\s]+$/,   label: 'First Name' },
  lastName:          { min: 2, max: 50,  regex: /^[a-zA-Z\s]+$/,   label: 'Last Name' },
  email:             {                   regex: EMAIL_REGEX,         label: 'Email' },
  phoneNumber:       { min: 10, max: 10, regex: PHONE_REGEX,        label: 'Phone Number',      regexMsg: 'must be exactly 10 digits starting with 6-9' },
  emergencyPhone:    { min: 10, max: 10, regex: PHONE_REGEX,        label: 'Emergency Phone',   regexMsg: 'must be exactly 10 digits starting with 6-9' },
  nationalId:        { min: 10, max: 10, regex: PAN_REGEX,          label: 'National ID (PAN)', regexMsg: 'must be in format ABCDE1234F' },

  // Grade / Job
  gradeCode:         { min: 1, max: 20,  regex: CODE_REGEX,         label: 'Grade Code' },
  gradeName:         { min: 2, max: 100, regex: NAME_REGEX,         label: 'Grade Name' },
  jobCode:           { min: 1, max: 20,  regex: CODE_REGEX,         label: 'Job Code' },
  jobName:           { min: 2, max: 100, regex: NAME_REGEX,         label: 'Job Name' },
  positionName:      { min: 2, max: 100, regex: NAME_REGEX,         label: 'Position Name' },
// Grade
gradeName:    { min: 2, max: 100, regex: ALPHANUMERIC_NAME_REGEX, label: 'Grade Name',    regexMsg: 'must contain at least one letter, only letters, numbers and spaces allowed' },

// Job
jobName:      { min: 2, max: 100, regex: ALPHANUMERIC_NAME_REGEX, label: 'Job Name',      regexMsg: 'must contain at least one letter, only letters, numbers and spaces allowed' },
jobFamily:    { min: 2, max: 100, regex: ALPHANUMERIC_NAME_REGEX, label: 'Job Family',    regexMsg: 'must contain at least one letter, only letters, numbers and spaces allowed' },

// Position
positionName: { min: 2, max: 100, regex: ALPHANUMERIC_NAME_REGEX, label: 'Position Name', regexMsg: 'must contain at least one letter, only letters, numbers and spaces allowed' },
  // Payroll
  payrollName:       { min: 2, max: 100, regex: NAME_REGEX,         label: 'Payroll Name' },
  payrollCode:       { min: 1, max: 20,  regex: CODE_REGEX,         label: 'Payroll Code' },
  elementCode:       { min: 1, max: 20,  regex: CODE_REGEX,         label: 'Element Code' },
  elementName:       { min: 2, max: 100, regex: NAME_REGEX,         label: 'Element Name' },

  // Roles
  roleCode:          { min: 2, max: 30,  regex: CODE_REGEX,         label: 'Role Code' },
  roleName:          { min: 2, max: 100, regex: NAME_REGEX,         label: 'Role Name' },

  // Absence
  absenceCode:       { min: 1, max: 10,  regex: CODE_REGEX,         label: 'Absence Code' },
  absenceName:       { min: 2, max: 100, regex: NAME_REGEX,         label: 'Absence Name' },

  // Learning
  programCode:       { min: 1, max: 20,  regex: CODE_REGEX,         label: 'Program Code' },
  programName:       { min: 2, max: 100, regex: NAME_REGEX,         label: 'Program Name' },
  competenceCode:    { min: 1, max: 20,  regex: CODE_REGEX,         label: 'Competence Code' },
  competenceName:    { min: 2, max: 100, regex: NAME_REGEX,         label: 'Competence Name' },

  // Misc
  locationTypeName:  { min: 2, max: 100, regex: NAME_REGEX,         label: 'Location Type Name' },
  scheduleCode:      { min: 1, max: 20,  regex: CODE_REGEX,         label: 'Schedule Code' },
  scheduleName:      { min: 2, max: 100, regex: NAME_REGEX,         label: 'Schedule Name' },
};

// ─── Single Unified Validate Middleware ───────────────────────────────────────
function validate(req, res, next) {
  const body = req.body;
  const errors = {};

  // ── PART 1: Generic field rules (applies to ALL routes) ──────────────────
  for (const [field, rules] of Object.entries(FIELD_RULES)) {
    let value = body[field];
    if (value === undefined || value === null || value === '') continue;

    let str = String(value).trim();
    req.body[field] = str;

    // Auto uppercase for codes and PAN
    if (field.toLowerCase().includes('code') || field === 'nationalId') {
      str = str.toUpperCase();
      req.body[field] = str;
    }

    if (rules.min && str.length < rules.min) {
      errors[field] = `${rules.label} must be at least ${rules.min} characters.`;
      continue;
    }
    if (rules.max && str.length > rules.max) {
      errors[field] = `${rules.label} must be at most ${rules.max} characters.`;
      continue;
    }
    if (rules.regex && !rules.regex.test(str)) {
      errors[field] = rules.regexMsg
        ? `${rules.label} is invalid — ${rules.regexMsg}.`
        : `${rules.label} contains invalid characters.`;
    }
  }

  // ── PART 2: Person-specific rules (only runs if person fields are present) ─
  const isPersonRoute = body.addressLine1 !== undefined || body.nationality !== undefined;

  if (isPersonRoute) {
    delete req.body.emergencyRelationship;

    const { addressLine1, city, state, country, pincode, nationality, nationalId } = body;

    // // Address
    // if (!addressLine1) {
    //   errors.addressLine1 = 'Address is required.';
    // } else {
    //   const addr = String(addressLine1).trim();
    //   if (addr.length < 10)       errors.addressLine1 = 'Address must be at least 10 characters.';
    //   else if (addr.length > 255) errors.addressLine1 = 'Address must be at most 255 characters.';
    //   else req.body.addressLine1 = addr;
    // }

    // City
    if (!city || city === 'Select') {
      errors.city = 'City is required.';
    }

    // State
    if (!state) {
      errors.state = 'State is required.';
    }

    // Country
    if (!country) {
      errors.country = 'Country is required.';
    }

    // Pincode
    if (!pincode) {
      errors.pincode = 'Pincode is required.';
    } else if (!/^[1-9][0-9]{5}$/.test(String(pincode).trim())) {
      errors.pincode = 'Pincode must be exactly 6 digits.';
    } else {
      req.body.pincode = String(pincode).trim();
    }

    // Nationality
    if (!nationality) {
      errors.nationality = 'Nationality is required.';
    } else if (String(nationality).trim() !== 'Indian') {
      errors.nationality = 'Nationality must be exactly "Indian".';
    } else {
      req.body.nationality = 'Indian';
    }

    // National ID (PAN) — required for person
    if (!nationalId) {
      errors.nationalId = 'National ID (PAN) is required.';
    } else {
      const pan = String(nationalId).trim().toUpperCase();
      if (!PAN_REGEX.test(pan)) {
        errors.nationalId = 'PAN format is invalid. Expected format: ABCDE1234F';
      } else {
        req.body.nationalId = pan;
      }
    }

    // Emergency contact
    const emergency = body.emergency;
    if (!emergency) {
      errors.emergency = 'Emergency details are required.';
    } else if (typeof emergency !== 'object') {
      errors.emergency = 'Emergency details must be a valid object.';
    } else {
      // Emergency Name
      if (!emergency.emergency_name) {
        errors.emergency_name = 'Emergency Name is required.';
      } else {
        const eName = String(emergency.emergency_name).trim();
        if (eName.length < 3 || eName.length > 50) {
          errors.emergency_name = 'Emergency Name must be between 3 and 50 characters.';
        } else if (!/^[A-Za-z ]+$/.test(eName)) {
          errors.emergency_name = 'Emergency Name can only contain alphabets and spaces.';
        } else {
          req.body.emergencyName = eName;
        }
      }

      // Emergency Phone
      const emergencyPhone = body.emergencyPhone;
      if (!emergencyPhone) {
        errors.emergencyPhone = 'Emergency Phone is required.';
      } else if (!PHONE_REGEX.test(String(emergencyPhone).trim())) {
        errors.emergencyPhone = 'Emergency Phone must be exactly 10 digits starting with 6-9.';
      } else {
        req.body.emergencyPhone = String(emergencyPhone).trim();
      }

      // Emergency Relationship
      const validRels = ['Father', 'Mother', 'Spouse', 'Brother', 'Sister', 'Friend', 'Other'];
      if (!emergency.emergency_relationship) {
        errors.emergency_relationship = 'Emergency Relationship is required.';
      } else if (!validRels.includes(String(emergency.emergency_relationship).trim())) {
        errors.emergency_relationship = 'Emergency Relationship must be a valid option.';
      } else {
        req.body.emergencyRelationship = String(emergency.emergency_relationship).trim();
      }
      
      // Emergency Address
      const emergencyAddress = body.emergencyAddress;
      if (!emergencyAddress || String(emergencyAddress).trim().length === 0) {
        errors.emergencyAddress = 'Emergency Address is required.';
      } else {
        req.body.emergencyAddress = String(emergencyAddress).trim();
      }

      // Emergency Priority
      const emergencyPriority = body.emergencyPriority;
      if (emergencyPriority === undefined || emergencyPriority === null || emergencyPriority === '') {
        errors.emergencyPriority = 'Emergency Priority is required.';
      } else {
        const parsedPriority = parseInt(emergencyPriority, 10);
        if (isNaN(parsedPriority)) {
           errors.emergencyPriority = 'Emergency Priority must be a valid number.';
        } else {
           req.body.emergencyPriority = parsedPriority;
        }
      }

      // Cleanup raw emergency object so it doesn't crash Prisma if passed down
      delete req.body.emergency;
    }
  }

  // ── Final response ────────────────────────────────────────────────────────
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: Object.values(errors)[0], errors });
  }

  next();
}

module.exports = { validate };