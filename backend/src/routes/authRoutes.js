const router = require("express").Router();

const {
  adminLogin,
  requestOTP,
  verifyOTP,
  getMe,
  registerMember,
  memberLogin, // ✅ ADD THIS
} = require("../controllers/authController");

const { authenticate } = require("../middleware/authMiddleware");

const rateLimit = require("express-rate-limit");

// ─────────────────────────────────────────────
// OTP Rate Limiter
// ─────────────────────────────────────────────
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    message: "Too many OTP requests. Please try again later.",
  },
});

// ─────────────────────────────────────────────
// Registration Rate Limiter (protect API)
// ─────────────────────────────────────────────
const registerLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many registration attempts. Please try later.",
  },
});

// ─────────────────────────────────────────────
// Admin Authentication
// ─────────────────────────────────────────────
router.post("/admin/login", adminLogin);

// ─────────────────────────────────────────────
// Member Registration
// ─────────────────────────────────────────────
router.post("/register-member", registerLimiter, registerMember);
// ─────────────────────────────────────────────
// Member Login (Password Based)
// ─────────────────────────────────────────────
router.post("/member-login", memberLogin);
// ─────────────────────────────────────────────
// Member OTP Login
// ─────────────────────────────────────────────
router.post("/otp/request", otpLimiter, requestOTP);

router.post("/otp/verify", otpLimiter, verifyOTP);

// ─────────────────────────────────────────────
// Current Logged User
// ─────────────────────────────────────────────
router.get("/me", authenticate, getMe);
router.get("/debug", (req, res) => {
  res.json({ message: "Auth routes working" });
});
module.exports = router;
