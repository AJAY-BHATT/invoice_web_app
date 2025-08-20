const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !/\S+@\S+\.\S+/.test(email) || !password || password.length < 6)
    return res.status(400).json({ error: 'Invalid inputs' });

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ error: 'Email in use' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });
  return res.status(201).json({ id: user.id });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ sub: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

module.exports = router;
