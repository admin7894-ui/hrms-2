const prisma = require('../config/prisma');

const generateStateCode = async (name) => {
  let code = name.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase();
  if (code.length < 2) code = (code + 'SX').substring(0, 2);

  let finalCode = code;
  let counter = 1;

  while (true) {
    const existing = await prisma.stateMaster.findUnique({
      where: { stateCode: finalCode },
    });
    if (!existing) return finalCode;
    finalCode = code.substring(0, 2) + counter;
    counter++;
  }
};

const getAll = async (req, res, next) => {
  try {
    const { search, countryId, isActive } = req.query;
    const where = {};
    
    if (search) {
      where.OR = [
        { stateName: { contains: search, mode: 'insensitive' } },
        { stateCode: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (countryId) where.countryId = parseInt(countryId);
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const data = await prisma.stateMaster.findMany({
      where,
      include: { country: true },
      orderBy: { stateName: 'asc' },
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    let { stateName, countryId, createdBy } = req.body;

    if (!countryId) return res.status(400).json({ error: 'Please select a country' });
    if (!stateName) return res.status(400).json({ error: 'State Name is required' });
    
    // Clean name: trim and remove multiple spaces
    stateName = stateName.trim().replace(/\s+/g, ' ');

    if (stateName.length < 2 || stateName.length > 100) {
      return res.status(400).json({ error: 'State Name must be between 2 and 100 characters' });
    }
    if (!/^[a-zA-Z\s]+$/.test(stateName)) {
      return res.status(400).json({ error: 'Only alphabets and spaces allowed' });
    }
    if (!createdBy) return res.status(400).json({ error: 'Created By is required' });

    // Check if Country exists
    const country = await prisma.countryMaster.findUnique({ where: { id: parseInt(countryId) } });
    if (!country) return res.status(400).json({ error: 'Invalid Country selected' });

    // Duplicate Check (Same country)
    const existing = await prisma.stateMaster.findFirst({
      where: { 
        stateName: { equals: stateName, mode: 'insensitive' }, 
        countryId: parseInt(countryId) 
      },
    });
    if (existing) return res.status(400).json({ error: 'State already exists for this country' });

    const stateCode = await generateStateCode(stateName);

    const record = await prisma.stateMaster.create({
      data: {
        stateName,
        stateCode,
        countryId: parseInt(countryId),
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
    let { stateName, countryId, isActive, stateCode } = req.body;

    if (stateCode) {
      const current = await prisma.stateMaster.findUnique({ where: { id: parseInt(id) } });
      if (current && stateCode !== current.stateCode) {
        return res.status(400).json({ error: 'State Code cannot be modified' });
      }
    }

    const data = {};
    if (stateName !== undefined) {
      stateName = stateName.trim().replace(/\s+/g, ' ');
      if (stateName.length < 2 || stateName.length > 100) {
        return res.status(400).json({ error: 'State Name must be between 2 and 100 characters' });
      }
      if (!/^[a-zA-Z\s]+$/.test(stateName)) {
        return res.status(400).json({ error: 'Only alphabets and spaces allowed' });
      }
      data.stateName = stateName;
    }
    
    if (countryId !== undefined) {
      if (!countryId) return res.status(400).json({ error: 'Please select a country' });
      const country = await prisma.countryMaster.findUnique({ where: { id: parseInt(countryId) } });
      if (!country) return res.status(400).json({ error: 'Invalid Country selected' });
      data.countryId = parseInt(countryId);
    }

    // Duplicate Check on update
    if (stateName !== undefined || countryId !== undefined) {
      const current = await prisma.stateMaster.findUnique({ where: { id: parseInt(id) } });
      const finalName = stateName !== undefined ? stateName : current.stateName;
      const finalCountryId = countryId !== undefined ? parseInt(countryId) : current.countryId;
      
      const existing = await prisma.stateMaster.findFirst({
        where: { 
          stateName: { equals: finalName, mode: 'insensitive' }, 
          countryId: finalCountryId,
          id: { not: parseInt(id) } 
        },
      });
      if (existing) return res.status(400).json({ error: 'State already exists for this country' });
    }

    if (isActive !== undefined) data.isActive = isActive;

    const record = await prisma.stateMaster.update({
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
    
    // Dependency Check (Linked Cities)
    const linkedCities = await prisma.cityMaster.findFirst({
      where: { stateId: parseInt(id) }
    });
    if (linkedCities) {
      return res.status(400).json({ error: 'Cannot delete: State has linked cities' });
    }

    await prisma.stateMaster.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'State permanently deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, create, update, remove };
