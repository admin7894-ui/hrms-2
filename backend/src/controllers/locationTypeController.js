const prisma = require('../config/prisma');

const generateLocationTypeCode = async (name) => {
  let code = name.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase();
  if (code.length < 2) code = (code + 'XX').substring(0, 2);

  let finalCode = code;
  let counter = 1;

  while (true) {
    const existing = await prisma.locationType.findFirst({
      where: { locationTypeCode: finalCode },
    });
    if (!existing) return finalCode;
    finalCode = code.substring(0, 2) + counter;
    counter++;
  }
};

const getAll = async (req, res, next) => {
  try {
    const { companyId } = req.query;
    
    const where = {};
    if (companyId) where.companyId = companyId;  // ← filter by company

    const data = await prisma.locationType.findMany({
      where,
      orderBy: { locationTypeName: 'asc' },
    });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { locationTypeName, companyId, description } = req.body;

    if (!locationTypeName)
      return res.status(400).json({ error: 'Location Type Name is required' });
    if (!companyId)
      return res.status(400).json({ error: 'Company is required' });

    const existing = await prisma.locationType.findFirst({
      where: { locationTypeName },
    });
    if (existing)
      return res.status(400).json({ error: 'Location Type already exists' });

    const locationTypeCode = await generateLocationTypeCode(locationTypeName);

    const record = await prisma.locationType.create({
      data: {
        locationTypeCode,
        locationTypeName,
        companyId,
        description,
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
    const { locationTypeName, isActive, description } = req.body;
    const data = {};

    if (locationTypeName !== undefined) data.locationTypeName = locationTypeName;
    if (isActive !== undefined) data.isActive = isActive;
    if (description !== undefined) data.description = description;

    const record = await prisma.locationType.update({
      where: { id: req.params.id },
      data,
    });
    res.json(record);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const record = await prisma.locationType.findUnique({
      where: { id: req.params.id },
    });
    if (!record) return res.status(404).json({ error: 'Not found' });

    const usedInLocation = await prisma.location.findFirst({
      where: { locationTypeId: req.params.id },
    });
    if (usedInLocation) {
      return res.status(400).json({
        error: `Cannot delete: used by location '${usedInLocation.locationName}'`,
      });
    }

    await prisma.locationType.delete({ where: { id: req.params.id } });
    res.json({ message: 'Location Type permanently deleted' });
  } catch (err) {
    next(err);
  }
};

// controllers/locationController.js
const getCityDetails = async (req, res, next) => {
  try {
    const { name } = req.query;
    
    const city = await prisma.cityMaster.findFirst({
      where: { cityName: { equals: name, mode: 'insensitive' } },
      include: { 
        state: true,    // includes stateName
        country: true   // includes countryName
      }
    });

    if (!city) return res.status(404).json({ error: 'City not found' });

    res.json({
      state: city.state?.stateName || '',
      country: city.country?.countryName || '',
      pincode: city.pincode || ''
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, create, update, remove,getCityDetails };