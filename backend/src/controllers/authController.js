const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const MemberProfile = require("../models/MemberProfile");
const { sendOTPEmail } = require("../services/emailService");

// Generate 6-digit OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// ─────────────────────────────────────────────
// Admin Login (Password)
// ─────────────────────────────────────────────
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });

    const user = await User.findOne({ where: { email } });

    if (!user || !user.passwordHash)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });

    if (
      !["super_admin", "admin", "content_manager", "finance"].includes(
        user.role,
      )
    )
      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    await user.update({ lastLoginAt: new Date() });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ─────────────────────────────────────────────
// Member OTP Request
// ─────────────────────────────────────────────
const requestOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({
        success: false,
        message: "Email required",
      });

    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(404).json({
        success: false,
        message: "No member found with this email",
      });

    if (!user.isVerified)
      return res.status(403).json({
        success: false,
        message: "Account not yet verified",
      });

    const otp = generateOTP();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    await user.update({
      otpCode: otp,
      otpExpiresAt: expires,
    });

    await sendOTPEmail(email, otp, user.firstName);

    res.json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ─────────────────────────────────────────────
// Verify OTP
// ─────────────────────────────────────────────
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({
        success: false,
        message: "Email and OTP required",
      });

    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    if (user.otpCode !== otp || new Date() > user.otpExpiresAt)
      return res.status(401).json({
        success: false,
        message: "Invalid or expired OTP",
      });

    await user.update({
      otpCode: null,
      otpExpiresAt: null,
      lastLoginAt: new Date(),
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ─────────────────────────────────────────────
// Get Current User
// ─────────────────────────────────────────────
const getMe = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

// ─────────────────────────────────────────────
// Member Registration (UPDATED WITH PASSWORD)
// ─────────────────────────────────────────────
const registerMember = async (req, res) => {
  try {
    delete req.body.confirmPassword;
    console.log("REQ BODY:", req.body); // ✅ ADD HERE
    const {
      firstName,
      lastName,
      personalEmail,
      officialEmail,
      designation,
      department,
      mobile,
      experience,
      birthDate,
      anniversaryDate,
      gender,
      country,
      state,
      city,
      password, // ✅ NEW
    } = req.body;

    if (!firstName || !lastName || !personalEmail || !password)
      return res.status(400).json({
        success: false,
        message: "First name, last name, email and password are required",
      });

    if (password.length < 5)
      return res.status(400).json({
        success: false,
        message: "Password must be at least 5 characters",
      });

    const existing = await User.findOne({
      where: { email: personalEmail },
    });

    if (existing)
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("HASHED PASSWORD:", hashedPassword); // debug

    const user = await User.create({
      firstName,
      lastName,
      email: personalEmail,
      passwordHash: hashedPassword, // ✅ THIS WAS MISSING
      role: "member",
      isVerified: false,
    });

    await MemberProfile.create({
      user_id: user.id,

      designation: designation || null,
      department: department || null,

      personal_email: personalEmail,
      official_email: officialEmail || null,

      mobile: mobile || null,
      experience_years: experience ? parseInt(experience) : null,

      birth_date: birthDate || null,
      anniversary_date: anniversaryDate || null,

      gender: gender || null,
      country: country || null,
      state: state || null,
      city: city || null,
    });

    res.json({
      success: true,
      message: "Registration submitted for approval",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// ─────────────────────────────────────────────
// Member Login (Password Based)
// ─────────────────────────────────────────────
const memberLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });

    const user = await User.findOne({ where: { email } });

    if (!user || !user.passwordHash)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });

    if (user.role !== "member")
      return res.status(403).json({
        success: false,
        message: "Member access only",
      });

    // if (!user.isVerified)
    //   return res.status(403).json({
    //     success: false,
    //     message: "Account pending approval",
    //   });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    await user.update({ lastLoginAt: new Date() });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// ─────────────────────────────────────────────
module.exports = {
  adminLogin,
  requestOTP,
  verifyOTP,
  getMe,
  registerMember,
  memberLogin,
};
