const validatePerson = (req, res, next) => {
  const {
    phoneNumber,
    addressLine1,
    city,
    state,
    country,
    pincode,
    emergencyPhone,
    nationality,
    nationalId,        // ✅ Added
  } = req.body;

  const errors = {};

  delete req.body.emergencyRelationship;

  // 1. Phone validation
  if (!phoneNumber) {
    errors.phoneNumber = 'Phone Number is required.';
  } else if (!/^[6-9]\d{9}$/.test(String(phoneNumber).trim())) {
    errors.phoneNumber = 'Phone Number must be exactly 10 digits starting with 6-9.';
  } else {
    req.body.phoneNumber = String(phoneNumber).trim();
  }

  // 2. Address validation
  if (!addressLine1) {
    errors.addressLine1 = 'Address is required.';
  } else {
    const addr = String(addressLine1).trim();
    if (addr.length < 10) {
      errors.addressLine1 = 'Address must be at least 10 characters long.';
    } else if (addr.length > 255) {
      errors.addressLine1 = 'Address must be at most 255 characters long.';
    }
    req.body.addressLine1 = addr;
  }

  // 3. City validation
  if (!city || city === 'Select') {
    errors.city = 'City is required.';
  }

  // 4. State validation
  if (!state) {
    errors.state = 'State is required.';
  }

  // 5. Country validation
  if (!country) {
    errors.country = 'Country is required.';
  }

  // 6. Pincode validation
  if (!pincode) {
    errors.pincode = 'Pincode is required.';
  } else if (!/^[1-9][0-9]{5}$/.test(String(pincode).trim())) {
    errors.pincode = 'Pincode must be exactly 6 digits.';
  } else {
    req.body.pincode = String(pincode).trim();
  }

  // 7. Nationality validation
  if (!nationality) {
    errors.nationality = 'Nationality is required.';
  } else if (String(nationality).trim() !== 'Indian') {
    errors.nationality = 'Nationality must be exactly "Indian".';
  } else {
    req.body.nationality = 'Indian';
  }

  // 8. National ID (PAN) validation ✅
  if (!nationalId) {
    errors.nationalId = 'National ID (PAN) is required.';
  } else {
    const pan = String(nationalId).trim().toUpperCase();
    if (pan.length !== 10) {
      errors.nationalId = 'PAN must be exactly 10 characters.';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
      errors.nationalId = 'PAN format is invalid. Expected format: ABCDE1234F';
    } else {
      req.body.nationalId = pan; // ✅ Store auto-uppercased
    }
  }

  // 9. Emergency validation
  const emergency = req.body.emergency;
  if (!emergency) {
    errors.emergency = 'Emergency details are required.';
  } else if (typeof emergency !== 'object') {
    errors.emergency = 'Emergency details must be a valid object.';
  } else {
    if (!emergency.emergency_name) {
      errors.emergency_name = 'Emergency Name is required.';
    } else {
      const eName = String(emergency.emergency_name).trim();
      if (eName.length < 3 || eName.length > 50) {
        errors.emergency_name = 'Emergency Name must be between 3 and 50 characters.';
      } else if (!/^[A-Za-z ]+$/.test(eName)) {
        errors.emergency_name = 'Emergency Name can only contain alphabets and spaces.';
      }
      req.body.emergencyName = eName;
    }

    // Emergency Phone validation
    if (!emergencyPhone) {
      errors.emergencyPhone = 'Emergency Phone is required.';
    } else if (!/^[6-9]\d{9}$/.test(String(emergencyPhone).trim())) {
      errors.emergencyPhone = 'Emergency Phone must be exactly 10 digits starting with 6-9.';
    } else {
      req.body.emergencyPhone = String(emergencyPhone).trim();
    }

    // Emergency Relationship validation
    const validRels = ['Father', 'Mother', 'Spouse', 'Brother', 'Sister', 'Friend', 'Other'];
    if (!emergency.emergency_relationship) {
      errors.emergency_relationship = 'Emergency Relationship is required.';
    } else if (!validRels.includes(String(emergency.emergency_relationship).trim())) {
      errors.emergency_relationship = 'Emergency Relationship must be a valid option.';
    } else {
      req.body.emergencyRelationship = String(emergency.emergency_relationship).trim();
    }
  }

  // ✅ CRITICAL BUG FIX — was missing entirely in your original code
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: Object.values(errors)[0], errors });
  }

  next(); // ✅ This was also missing!
};

module.exports = { validatePerson };