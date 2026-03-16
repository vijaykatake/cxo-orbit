// emailRoutes.js — stub for future email template management
const router = require('express').Router();
const { authenticate, adminOnly } = require('../middleware/authMiddleware');
const EmailLog = require('../models/EmailLog');

router.get('/logs', authenticate, adminOnly, async (req, res) => {
  try {
    const logs = await EmailLog.findAll({ order: [['createdAt', 'DESC']], limit: 100 });
    res.json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
