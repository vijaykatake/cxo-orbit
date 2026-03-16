const router = require('express').Router();
const { adminLogin, requestOTP, verifyOTP, getMe } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');
const rateLimit = require('express-rate-limit');

const otpLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5, message: 'Too many OTP requests' });

router.post('/admin/login',   adminLogin);
router.post('/otp/request',   otpLimiter, requestOTP);
router.post('/otp/verify',    otpLimiter, verifyOTP);
router.get('/me',             authenticate, getMe);

module.exports = router;
