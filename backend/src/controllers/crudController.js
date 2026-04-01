const prisma = require('../config/prisma');

const crudController = (model, includeRelations = {}) => ({
  getAll: async (req, res, next) => {
    try {
      const { page = 1, limit = 20, search, ...filters } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);

      const where = { activeFlag: true, ...buildFilters(filters) };

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

      res.json({ data, total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / limit) });
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
      const record = await prisma[model].create({ data: req.body, include: includeRelations });
      res.status(201).json(record);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const record = await prisma[model].update({
        where: { id: req.params.id },
        data: req.body,
        include: includeRelations,
      });
      res.json(record);
    } catch (err) {
      next(err);
    }
  },

  remove: async (req, res, next) => {
    try {
      await prisma[model].update({
        where: { id: req.params.id },
        data: { activeFlag: false },
      });
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
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
