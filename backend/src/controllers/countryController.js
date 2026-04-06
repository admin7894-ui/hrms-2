const prisma = require('../config/prisma');

const generateCountryCode = async (name) => {
  // Extract 2–3 letters, uppercase
  let code = name.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase();
  if (code.length < 2) code = (code + 'XX').substring(0, 2);

  let finalCode = code;
  let counter = 1;

  while (true) {
    const existing = await prisma.countryMaster.findUnique({
      where: { countryCode: finalCode },
    });
    if (!existing) return finalCode;
    // If not unique, add a suffix (e.g., IN1, IN2)
    // Use 2 letters + counter to be safe if 3 letters + counter is too long
    finalCode = code.substring(0, 2) + counter;
    counter++;
  }
};

const getAll = async (req, res, next) => {
  try {
    const { search, isActive } = req.query;
    const where = {};
    
    if (search) {
      where.OR = [
        { countryName: { contains: search, mode: 'insensitive' } },
        { countryCode: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const data = await prisma.countryMaster.findMany({
      where,
      orderBy: { countryName: 'asc' },
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { countryName, createdBy } = req.body;

    // VALIDATIONS
    if (!countryName) return res.status(400).json({ error: 'Country Name is required' });
    if (!/^[a-zA-Z\s]+$/.test(countryName)) {
      return res.status(400).json({ error: 'Only alphabets and spaces allowed' });
    }
    if (countryName.length < 2 || countryName.length > 100) {
      return res.status(400).json({ error: 'Country Name must be between 2 and 100 characters' });
    }
    if (!createdBy) return res.status(400).json({ error: 'Created By is required' });

    // Check Duplicate Name
    const existingName = await prisma.countryMaster.findUnique({
      where: { countryName },
    });
    if (existingName) return res.status(400).json({ error: 'Country already exists' });

    // Auto-generate code
    const countryCode = await generateCountryCode(countryName);

    const record = await prisma.countryMaster.create({
      data: {
        countryName,
        countryCode,
        createdBy,
        isActive: true,
      },
    });

    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { countryName, isActive, countryCode } = req.body;

    // Edit code check
    if (countryCode) {
      const current = await prisma.countryMaster.findUnique({ where: { id: parseInt(id) } });
      if (current && countryCode !== current.countryCode) {
        return res.status(400).json({ error: 'Country Code cannot be modified' });
      }
    }

    const data = {};
    if (countryName !== undefined) {
      if (!/^[a-zA-Z\s]+$/.test(countryName)) {
        return res.status(400).json({ error: 'Only alphabets and spaces allowed' });
      }
      data.countryName = countryName;
      
      // Check Duplicate Name (excluding self)
      const existingName = await prisma.countryMaster.findFirst({
        where: { countryName, id: { not: parseInt(id) } },
      });
      if (existingName) return res.status(400).json({ error: 'Country already exists' });
    }
    
    if (isActive !== undefined) data.isActive = isActive;

    const record = await prisma.countryMaster.update({
      where: { id: parseInt(id) },
      data,
    });
    res.json(record);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // 1. Get the country record
    const country = await prisma.countryMaster.findUnique({
      where: { id: parseInt(id) }
    });
    if (!country) return res.status(404).json({ error: 'Country not found' });

    // 2. Dependency Check (Block delete if used in Companies or Locations)
    // In this schema, country is stored as a string name in Company and Location models.
    const usedInCompany = await prisma.company.findFirst({
      where: { country: country.countryName }
    });
    if (usedInCompany) {
      return res.status(400).json({ error: `Cannot delete: Country is being used by company '${usedInCompany.companyName}'` });
    }

    const usedInLocation = await prisma.location.findFirst({
      where: { country: country.countryName }
    });
    if (usedInLocation) {
      return res.status(400).json({ error: `Cannot delete: Country is being used by location '${usedInLocation.locationName}'` });
    }

    // 3. Irreversible hard delete
    await prisma.countryMaster.delete({
      where: { id: parseInt(id) },
    });
    
    res.json({ message: 'Country permanently deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
