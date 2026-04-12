const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");

// ─── Get All Users ────────────────────────────────────────
const getAllUsers = async (req, res) => {
  try {
    const users = await User.unscoped().findAll({
      attributes: { exclude: ["passwordHash", "otpCode", "otpExpiresAt"] },
      order: [["createdAt", "DESC"]],
    });
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Create Admin/Staff User ──────────────────────────────
const createAdminUser = async (req, res) => {
  try {
    const { email, firstName, lastName, role, password } = req.body;
    const exists = await User.unscoped().findOne({ where: { email } });
    if (exists)
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      id: uuidv4(),
      email,
      firstName,
      lastName,
      role,
      passwordHash,
      isActive: true,
      isVerified: true,
    });

    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// ─── Admin Login ─────────────────────────────────────────
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.unscoped().findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email",
      });
    }

    // 2. Check role (IMPORTANT: only admin allowed)
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // 4. Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    // 5. Send response
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
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
// ─── Invite CXO Member ────────────────────────────────────
const inviteMember = async (req, res) => {
  try {
    const { email, firstName, lastName, phone } = req.body;
    const exists = await User.unscoped().findOne({ where: { email } });
    if (exists)
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });

    const user = await User.create({
      id: uuidv4(),
      email,
      firstName,
      lastName,
      phone,
      role: "member",
      isActive: true,
      isVerified: false,
    });

    // Send invite email
    await sendEmail({
      to: email,
      templateType: "member_invite",
      relatedId: user.id,
      subject: "You are invited to CXO Orbit Global",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
          <div style="background:#0B2C4D;padding:24px;text-align:center;">
            <h2 style="color:#D4AF37;margin:0;">CXO Orbit Global</h2>
          </div>
          <div style="padding:32px;background:#F8F6F2;">
            <p>Dear <strong>${firstName}</strong>,</p>
            <p>You have been exclusively invited to join the CXO Orbit Global community.</p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${process.env.CLIENT_URL}/portal/login"
                 style="background:#D4AF37;color:#0B2C4D;padding:14px 32px;border-radius:4px;text-decoration:none;font-weight:bold;">
                Access Your Portal
              </a>
            </div>
            <p style="color:#888;font-size:13px;">Use your email to login via OTP.</p>
          </div>
        </div>`,
    });

    // Mark as verified after invite
    await user.update({ isVerified: true });

    res.status(201).json({
      success: true,
      message: "Member invited successfully",
      data: { id: user.id, email },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Toggle User Active Status ────────────────────────────
const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    await user.update({ isActive: !user.isActive });
    res.json({
      success: true,
      message: `User ${user.isActive ? "activated" : "deactivated"}`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllUsers,
  createAdminUser,
  inviteMember,
  toggleUserStatus,
  loginAdmin, // ✅ CMS Admin
};
