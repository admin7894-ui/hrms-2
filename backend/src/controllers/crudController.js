const prisma = require('../config/prisma');

const STRIP_FIELDS = [
  'id',
  'createdAt',
  'updatedAt',
  'effectiveFrom',
  'effectiveTo',
  'createdBy',
];

// ✅ ALL boolean fields including isActive
const BOOLEAN_FIELDS = ['certificateIssued', 'activeFlag', 'isActive'];

const STRING_FIELDS = [
  // Relation IDs
  'recordId',
  'companyId',
  'bgId',
  'leId',
  'businessTypeId',
  'locationId',
  'parentOrgId',
  'assignmentId',
  'personId',
  'supervisorPersonId',
  'supervisorAssignmentId',
  // Phone / pincode — stored as String in Prisma
  'phoneNumber',
  'emergencyPhone',
  'phone',
  'pincode',
  'nationalId',
  'registrationNo',
  'taxRegistrationNo',
  'statusCode',
];

function sanitizeData(body) {
  const clean = {};

  for (const [key, value] of Object.entries(body)) {
    if (STRIP_FIELDS.includes(key)) continue;

    // ❌ Skip nested objects
    if (
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      !(value instanceof Date)
    ) {
      continue;
    }

    // ✅ Date handling
    if (value && key.toLowerCase().includes('date')) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        clean[key] = date;
        continue;
      }
    }

    // ✅ Boolean handling (isActive + other boolean fields)
    if (BOOLEAN_FIELDS.includes(key)) {
      if (['1', 1, true, 'true'].includes(value)) clean[key] = true;
      else if (['0', 0, false, 'false'].includes(value)) clean[key] = false;
      else clean[key] = Boolean(value);
      continue;
    }

    // ✅ String and ID fields
    if (STRING_FIELDS.includes(key) || key.endsWith('Id') || key === 'id') {
      if (value === '') {
        clean[key] = null;
      } else {
        clean[key] = String(value);
      }
      continue;
    }

    // ✅ Numbers (skip if value looks boolean to avoid isActive: 1 issue)
    if (value !== '' && value !== null && !isNaN(value) && typeof value !== 'boolean') {
      clean[key] = Number(value);
      continue;
    }

    clean[key] = value;
  }

  return clean;
}

function buildPrismaData(data, relationMap = {}, isUpdate = false) {
  const prismaData = {};

  for (const [key, value] of Object.entries(data)) {
    // ✅ Skip undefined
    if (value === undefined) continue;

    // ✅ RELATION HANDLING
    if (relationMap[key]) {
      const relationField = relationMap[key];

      // 🟢 CASE 1: Direct ID mapping (e.g., companyId)
      if (relationField === key || relationField === true) {
        prismaData[key] =
          value !== null && value !== '' ? String(value) : null;
      }

      // 🟢 CASE 2: Relation connect (only if valid relation name)
      else if (typeof relationField === 'string') {
        if (value !== null && value !== '') {
          prismaData[relationField] = {
            connect: { id: String(value) },
          };
        } else if (isUpdate) {
          prismaData[relationField] = { disconnect: true };
        }
      }
    }

    // ✅ NORMAL FIELD
    else {
      prismaData[key] = value;
    }
  }

  return prismaData;
}

const crudController = (model, includeRelations = {}, relationMap = {}) => ({

  getAll: async (req, res, next) => {
    try {
      const { page = 1, limit = 20, ...filters } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const where = buildFilters(filters);

      const [data, total] = await Promise.all([
        prisma[model].findMany({
          where,
          include: includeRelations,
          skip,
          take: parseInt(limit),
          orderBy: { createdAt: 'desc' },
        }),
        prisma[model].count({ where }),
      ]);

      res.json({
        data,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const record = await prisma[model].findUnique({
        where: { id: req.params.id },
        include: includeRelations,
      });

      if (!record) return res.status(404).json({ error: 'Not found' });

      res.json(record);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const data = sanitizeData(req.body);

      // ✅ PERMANENT FIX FOR SUPERVISOR
      if (model === 'supervisor') {
        if (!data.personId) {
          return res.status(400).json({ error: 'personId is required' });
        }
        if (!data.assignmentId) {
          return res.status(400).json({ error: 'assignmentId is required' });
        }
        if (!data.supervisorPersonId) {
          return res.status(400).json({ error: 'supervisorPersonId is required' });
        }
        if (!data.supervisorAssignmentId) {
          return res.status(400).json({ error: 'supervisorAssignmentId is required' });
        }
      }

      const prismaData = buildPrismaData(data, relationMap, false);

      const record = await prisma[model].create({
        data: prismaData,
        include: includeRelations,
      });

      res.status(201).json(record);
    } catch (err) {
      console.error('CREATE ERROR:', err);

      if (err.code === 'P2002') {
        return res.status(409).json({
          error: 'A record with this value already exists.',
        });
      }

      if (err.code === 'P2003') {
        return res.status(400).json({
          error: 'Invalid reference ID (foreign key not found).',
        });
      }

      if (err.name === 'PrismaClientValidationError') {
        const fs = require('fs');
        // fs.appendFileSync('c:\\reactproject\\hrms\\backend\\prisma_error.log', '\n\n' + new Date().toISOString() + '\n' + err.message + '\n Payload: ' + JSON.stringify(prismaData));
        return res.status(400).json({
          error: 'Invalid data provided.',
          detail: err.message,
        });
      }

      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const data = sanitizeData(req.body);
      const prismaData = buildPrismaData(data, relationMap, true);

      const record = await prisma[model].update({
        where: { id: req.params.id },
        data: prismaData,
        include: includeRelations,
      });

      res.json(record);
    } catch (err) {
      console.error('UPDATE ERROR:', err);

      if (err.code === 'P2002') {
        return res.status(409).json({ error: 'Duplicate entry.' });
      }

      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Record not found.' });
      }

      if (err.name === 'PrismaClientValidationError') {
        return res.status(400).json({
          error: 'Invalid data.',
          detail: err.message,
        });
      }

      next(err);
    }
  },

  remove: async (req, res, next) => {
    try {
      await prisma[model].delete({ where: { id: req.params.id } });
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      if (err.code === 'P2003') {
        return res.status(409).json({
          error: 'Cannot delete due to related records.',
        });
      }

      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Record not found.' });
      }

      next(err);
    }
  },
});

function buildFilters(filters) {
  const where = {};
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== '') {
      where[key] = value;
    }
  }
  return where;
}

module.exports = crudController;
