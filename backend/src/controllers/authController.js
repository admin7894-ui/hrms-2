const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user || !user.activeFlag) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, roleCode: user.role.roleCode }, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.json({
      token,
      user: { id: user.id, email: user.email, role: user.role.roleName, roleCode: user.role.roleCode },
    });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password, roleId, personId } = req.body;
    if (!email || !password || !roleId) return res.status(400).json({ error: 'Email, password, and role required' });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'Email already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, passwordHash, roleId, personId },
      include: { role: true },
    });

    res.status(201).json({ id: user.id, email: user.email, role: user.role.roleName });
  } catch (err) {
    next(err);
  }
};

const me = async (req, res) => {
  res.json({ id: req.user.id, email: req.user.email, role: req.user.role });
};

module.exports = { login, register, me };
