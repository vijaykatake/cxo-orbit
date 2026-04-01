const router = require("express").Router();

const {
  getAllUsers,
  createAdminUser,
  inviteMember,
  toggleUserStatus,
} = require("../controllers/adminController");

const {
  authenticate,
  adminOnly,
  superAdminOnly,
} = require("../middleware/authMiddleware");

const EmailLog = require("../models/EmailLog");

// ✅ EXISTING ROUTES
router.get("/users", authenticate, adminOnly, getAllUsers);
router.post("/users/admin", authenticate, superAdminOnly, createAdminUser);
router.post("/users/invite", authenticate, adminOnly, inviteMember);
router.patch("/users/:id/toggle", authenticate, adminOnly, toggleUserStatus);

// Email logs
router.get("/email-logs", authenticate, adminOnly, async (req, res) => {
  try {
    const logs = await EmailLog.findAll({
      order: [["createdAt", "DESC"]],
      limit: 200,
    });
    res.json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 🔥 TEMP SEED ROUTE (ADD THIS AT BOTTOM)
router.get("/seed-admin", async (req, res) => {
  try {
    const bcrypt = require("bcrypt");
    const User = require("../models/User");

    const existing = await User.findOne({
      where: { email: "admin@cxoorbit.com" },
    });

    if (existing) {
      return res.json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      email: "admin@cxoorbit.com",
      passwordHash: hashedPassword,
      firstName: "Super",
      lastName: "Admin",
      role: "admin",
      isActive: true,
      isVerified: true,
    });

    res.json({ message: "Admin created successfully ✅" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
