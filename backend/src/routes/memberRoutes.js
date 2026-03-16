// memberRoutes.js
const router = require('express').Router();
const { authenticate } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Registration = require('../models/Registration');

// Member dashboard info
router.get('/dashboard', authenticate, async (req, res) => {
  try {
    const registrations = await Registration.findAll({ where: { userId: req.user.id } });
    res.json({ success: true, data: { user: req.user, registrations } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update member profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;
    await req.user.update({ firstName, lastName, phone });
    res.json({ success: true, message: 'Profile updated', data: req.user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
