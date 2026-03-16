const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const { sendOTPEmail } = require('../services/emailService');

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ─── Admin Login (password) ───────────────────────────────
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password required' });

    const user = await User.findOne({ where: { email } });
    if (!user || !user.passwordHash)
      return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(401).json({ success: false, message: 'Invalid credentials' });

    if (!['super_admin', 'admin', 'content_manager', 'finance'].includes(user.role))
      return res.status(403).json({ success: false, message: 'Admin access only' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    await user.update({ lastLoginAt: new Date() });

    res.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Member OTP Request ───────────────────────────────────
const requestOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email required' });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ success: false, message: 'No member found with this email' });
    if (!user.isVerified) return res.status(403).json({ success: false, message: 'Account not yet verified' });

    const otp = generateOTP();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    await user.update({ otpCode: otp, otpExpiresAt: expires });
    await sendOTPEmail(email, otp, user.firstName);

    res.json({ success: true, message: 'OTP sent to your email' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Verify OTP ───────────────────────────────────────────
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ success: false, message: 'Email and OTP required' });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (user.otpCode !== otp || new Date() > user.otpExpiresAt)
      return res.status(401).json({ success: false, message: 'Invalid or expired OTP' });

    await user.update({ otpCode: null, otpExpiresAt: null, lastLoginAt: new Date() });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Get Current User ─────────────────────────────────────
const getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};

module.exports = { adminLogin, requestOTP, verifyOTP, getMe };
