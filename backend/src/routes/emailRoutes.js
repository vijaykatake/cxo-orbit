// emailRoutes.js

const router = require("express").Router();

const { authenticate, adminOnly } = require("../middleware/authMiddleware");
const EmailLog = require("../models/EmailLog");

// ✅ Import controller
const { contactForm } = require("../controllers/contactController");

/* =========================
   CONTACT FORM (PUBLIC)
========================= */
router.post("/contact", contactForm);

/* =========================
   EMAIL LOGS (ADMIN ONLY)
========================= */
router.get("/logs", authenticate, adminOnly, async (req, res) => {
  try {
    const logs = await EmailLog.findAll({
      order: [["createdAt", "DESC"]],
      limit: 100,
    });

    res.json({
      success: true,
      data: logs,
    });
  } catch (err) {
    console.error("EMAIL LOG FETCH ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
