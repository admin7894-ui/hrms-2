const prisma = require('../config/prisma');

const STRIP_FIELDS = [
  'id', 'createdAt', 'updatedAt', 'effectiveFrom', 'effectiveTo', 'createdBy',
];

function sanitizeData(body) {
  const clean = {};
  const DATE_FIELDS = ['dateOfBirth', 'hireDate', 'startDate', 'endDate', 'terminationDate'];

  for (const [key, value] of Object.entries(body)) {
    if (STRIP_FIELDS.includes(key)) continue;

    if (
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      !(value instanceof Date)
    ) {
      continue;
    }

    if (DATE_FIELDS.includes(key) && value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        clean[key] = date.toISOString();
        continue;
      }
    }

    clean[key] = value;
  }
  return clean;
}

const crudController = (model, includeRelations = {}) => ({

  getAll: async (req, res, next) => {
    try {
      const { page = 1, limit = 20, search, ...filters } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const where = { ...buildFilters(filters) };

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
      const record = await prisma[model].create({
        data,
        include: includeRelations,
      });
      res.status(201).json(record);
    } catch (err) {
      if (err.code === 'P2002') {
        return res.status(409).json({
          error: 'A record with this value already exists.',
          code: 'DUPLICATE_ENTRY',
        });
      }
      if (err.name === 'PrismaClientValidationError') {
        return res.status(400).json({
          error: 'Invalid data provided. Please check all required fields.',
          detail: err.message,
        });
      }
      next(err);
    }
  },

  // ✅ Fixed: uses includeRelations instead of hardcoded include
  update: async (req, res, next) => {
    try {
      const data = sanitizeData(req.body);

      const relationMap = {
        companyId:      'company',
        bgId:           'businessGroup',
        leId:           'legalEntity',
        businessTypeId: 'businessType',
        locationId:     'location',
        parentOrgId:    'parentOrg',
      };

      const prismaData = {};

      for (const [key, value] of Object.entries(data)) {
        if (relationMap[key]) {
          if (value !== null && value !== undefined) {
            prismaData[relationMap[key]] = { connect: { id: value } };
          } else if (key === 'parentOrgId') {
            prismaData[relationMap[key]] = { disconnect: true };
          }
        } else {
          prismaData[key] = value;
        }
      }

      delete prismaData.parentOrg;

      const record = await prisma[model].update({
        where: { id: req.params.id },
        data: prismaData,
        include: includeRelations, // ✅ Fixed — no longer hardcoded
      });

      res.json(record);
    } catch (err) {
      if (err.code === 'P2002') {
        return res.status(409).json({
          error: 'A record with this value already exists.',
          code: 'DUPLICATE_ENTRY',
        });
      }
      if (err.code === 'P2025') {
        return res.status(404).json({
          error: 'Record not found.',
          code: 'NOT_FOUND',
        });
      }
      if (err.name === 'PrismaClientValidationError') {
        return res.status(400).json({
          error: 'Invalid data provided. Please check all required fields.',
          detail: err.message,
        });
      }
      next(err);
    }
  },

  remove: async (req, res, next) => {
    try {
      const { id } = req.params;
      await prisma[model].delete({ where: { id } });
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      if (err.code === 'P2003') {
        return res.status(409).json({
          error: 'Cannot delete: this record has dependent data. Remove related records first.',
          code: 'FOREIGN_KEY_VIOLATION',
        });
      }
      if (err.code === 'P2025') {
        return res.status(404).json({
          error: 'Record not found.',
          code: 'NOT_FOUND',
        });
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