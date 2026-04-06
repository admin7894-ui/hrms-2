const prisma = require('../config/prisma');

const generateCityCode = async (name) => {
  let code = name.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase();
  if (code.length < 2) code = (code + 'CX').substring(0, 2);

  let finalCode = code;
  let counter = 1;

  while (true) {
    const existing = await prisma.cityMaster.findUnique({
      where: { cityCode: finalCode },
    });
    if (!existing) return finalCode;
    finalCode = code.substring(0, 2) + counter;
    counter++;
  }
};

const getAll = async (req, res, next) => {
  try {
    const { search, stateId, countryId, isActive } = req.query;
    const where = {};
    
    if (search) {
      where.OR = [
        { cityName: { contains: search, mode: 'insensitive' } },
        { cityCode: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (stateId) where.stateId = parseInt(stateId);
    if (countryId) where.countryId = parseInt(countryId);
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const data = await prisma.cityMaster.findMany({
      where,
      include: { 
        state: true,
        country: true 
      },
      orderBy: { cityName: 'asc' },
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    let { cityName, stateId, countryId, createdBy, pincode } = req.body;

    if (!countryId) return res.status(400).json({ error: 'Please select a country' });
    if (!stateId) return res.status(400).json({ error: 'Please select a state' });
    if (!cityName) return res.status(400).json({ error: 'City Name is required' });
    
    // Clean name: trim and remove multiple spaces
    cityName = cityName.trim().replace(/\s+/g, ' ');

    if (cityName.length < 2 || cityName.length > 100) {
      return res.status(400).json({ error: 'City Name must be between 2 and 100 characters' });
    }
    if (!/^[a-zA-Z\s]+$/.test(cityName)) {
      return res.status(400).json({ error: 'Only alphabets and spaces allowed' });
    }
    
    if (!pincode) return res.status(400).json({ error: 'Pincode is required' });
    if (!/^\d{5,10}$/.test(pincode)) {
      return res.status(400).json({ error: 'Pincode must be numeric and valid length (5-10 digits)' });
    }

    if (!createdBy) return res.status(400).json({ error: 'Created By is required' });

    // Validate State-Country Hierarchy
    const state = await prisma.stateMaster.findUnique({ where: { id: parseInt(stateId) } });
    if (!state) return res.status(400).json({ error: 'Invalid State selected' });
    if (state.countryId !== parseInt(countryId)) {
      return res.status(400).json({ error: 'State does not belong to selected country' });
    }

    // Duplicate Check (Same state)
    const existing = await prisma.cityMaster.findFirst({
      where: { 
        cityName: { equals: cityName, mode: 'insensitive' }, 
        stateId: parseInt(stateId) 
      },
    });
    if (existing) return res.status(400).json({ error: 'City already exists for this state' });

    const cityCode = await generateCityCode(cityName);

    const record = await prisma.cityMaster.create({
      data: {
        cityName,
        cityCode,
        stateId: parseInt(stateId),
        countryId: parseInt(countryId),
        pincode,
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
    let { cityName, stateId, countryId, isActive, pincode, cityCode } = req.body;

    if (cityCode) {
      const current = await prisma.cityMaster.findUnique({ where: { id: parseInt(id) } });
      if (current && cityCode !== current.cityCode) {
        return res.status(400).json({ error: 'City Code cannot be modified' });
      }
    }

    const data = {};
    if (cityName !== undefined) {
      cityName = cityName.trim().replace(/\s+/g, ' ');
      if (cityName.length < 2 || cityName.length > 100) {
        return res.status(400).json({ error: 'City Name must be between 2 and 100 characters' });
      }
      if (!/^[a-zA-Z\s]+$/.test(cityName)) {
        return res.status(400).json({ error: 'Only alphabets and spaces allowed' });
      }
      data.cityName = cityName;
    }

    if (pincode !== undefined) {
      if (!pincode) return res.status(400).json({ error: 'Pincode is required' });
      if (!/^\d{5,10}$/.test(pincode)) {
        return res.status(400).json({ error: 'Pincode must be numeric and valid length (5-10 digits)' });
      }
      data.pincode = pincode;
    }

    if (countryId !== undefined) {
      if (!countryId) return res.status(400).json({ error: 'Please select a country' });
      const country = await prisma.countryMaster.findUnique({ where: { id: parseInt(countryId) } });
      if (!country) return res.status(400).json({ error: 'Invalid Country selected' });
      data.countryId = parseInt(countryId);
    }

    if (stateId !== undefined) {
      if (!stateId) return res.status(400).json({ error: 'Please select a state' });
      const state = await prisma.stateMaster.findUnique({ where: { id: parseInt(stateId) } });
      if (!state) return res.status(400).json({ error: 'Invalid State selected' });
      
      const finalCountryId = countryId !== undefined ? parseInt(countryId) : (await prisma.cityMaster.findUnique({ where: { id: parseInt(id) } })).countryId;
      if (state.countryId !== finalCountryId) {
        return res.status(400).json({ error: 'State does not belong to selected country' });
      }
      data.stateId = parseInt(stateId);
    }

    // Duplicate Check on update
    if (cityName !== undefined || stateId !== undefined) {
      const current = await prisma.cityMaster.findUnique({ where: { id: parseInt(id) } });
      const finalName = cityName !== undefined ? cityName : current.cityName;
      const finalStateId = stateId !== undefined ? parseInt(stateId) : current.stateId;
      
      const existing = await prisma.cityMaster.findFirst({
        where: { 
          cityName: { equals: finalName, mode: 'insensitive' }, 
          stateId: finalStateId,
          id: { not: parseInt(id) } 
        },
      });
      if (existing) return res.status(400).json({ error: 'City already exists for this state' });
    }

    if (isActive !== undefined) data.isActive = isActive;

    const record = await prisma.cityMaster.update({
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
    // For now, no external dependencies block city deletion
    await prisma.cityMaster.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'City permanently deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, create, update, remove };
