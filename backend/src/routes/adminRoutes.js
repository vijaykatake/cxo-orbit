const router = require('express').Router();
const { getAllUsers, createAdminUser, inviteMember, toggleUserStatus } = require('../controllers/adminController');
const { authenticate, adminOnly, superAdminOnly } = require('../middleware/authMiddleware');
const EmailLog = require('../models/EmailLog');

router.get('/users',              authenticate, adminOnly, getAllUsers);
router.post('/users/admin',       authenticate, superAdminOnly, createAdminUser);
router.post('/users/invite',      authenticate, adminOnly, inviteMember);
router.patch('/users/:id/toggle', authenticate, adminOnly, toggleUserStatus);

// Email logs
router.get('/email-logs', authenticate, adminOnly, async (req, res) => {
  try {
    const logs = await EmailLog.findAll({ order: [['createdAt', 'DESC']], limit: 200 });
    res.json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
