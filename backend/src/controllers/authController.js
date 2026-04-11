const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const MemberProfile = require("../models/MemberProfile");
const { sendOTPEmail } = require("../services/emailService");
const emailService = require("../services/emailService");
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
    console.log("📥 REQ BODY:", req.body);

    const {
      firstName,
      lastName,
      personalEmail,
      officialEmail,
      organization,
      industry,
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
      linkedIn,
      password,
    } = req.body;

    // ─── Step 1: Required fields ──────────────────────────
    console.log("🔍 Step 1: Checking required fields...");
    if (!firstName || !lastName || !personalEmail || !password) {
      console.log("❌ Missing required fields:", {
        firstName,
        lastName,
        personalEmail,
        password: !!password,
      });
      return res.status(400).json({
        success: false,
        message: "First name, last name, email and password are required",
      });
    }
    console.log("✅ Step 1 passed");

    // ─── Step 2: Password length ──────────────────────────
    console.log("🔍 Step 2: Checking password length:", password.length);
    if (password.length < 5) {
      console.log("❌ Password too short:", password.length);
      return res.status(400).json({
        success: false,
        message: "Password must be at least 5 characters",
      });
    }
    console.log("✅ Step 2 passed");
    // -- Test Step
    // ─── DEV ONLY: Auto-cleanup test user before re-registering ──
    // ─── Auto-cleanup test user before re-registering ────────
    console.log("🧹 Personal EmailID:", personalEmail);
    if (personalEmail === "vijukatake@gmail.com") {
      console.log("🧹 Auto-cleaning test user:", personalEmail);

      const testUser = await User.findOne({ where: { email: personalEmail } });

      if (testUser) {
        console.log(
          `🔍 Found user: ${testUser.id} — ${testUser.firstName} ${testUser.lastName}`,
        );

        const profileDeleted = await MemberProfile.destroy({
          where: { user_id: testUser.id },
        });
        console.log(`🗑️ MemberProfile deleted: ${profileDeleted} row(s)`);

        await User.destroy({ where: { id: testUser.id } });
        console.log(`🗑️ User deleted: ${personalEmail}`);
        console.log("✅ Cleanup complete — proceeding with fresh registration");
      } else {
        console.log("⚠️ No existing test user — skipping cleanup");
      }
    }
    // ─── Step 3: Check existing user ─────────────────────
    console.log("🔍 Step 3: Checking if email exists:", personalEmail);
    const existing = await User.findOne({ where: { email: personalEmail } });
    if (existing) {
      console.log("❌ Email already registered:", personalEmail);
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }
    console.log("✅ Step 3 passed — email is free");

    // ─── Step 4: Hash password ────────────────────────────
    console.log("🔍 Step 4: Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Step 4 passed — password hashed");

    // ─── Step 5: Create user ──────────────────────────────
    console.log("🔍 Step 5: Creating user...");
    const user = await User.create({
      firstName,
      lastName,
      email: personalEmail,
      passwordHash: hashedPassword,
      role: "member",
      isVerified: false,
    });
    console.log("✅ Step 5 passed — user created:", user.id);

    // ─── Step 6: Create member profile ───────────────────
    console.log("🔍 Step 6: Creating member profile...");
    console.log("Profile data:", {
      organization,
      industry,
      designation,
      department,
      personalEmail,
      officialEmail,
      mobile,
      experience,
      birthDate,
      anniversaryDate,
      gender,
      country,
      state,
      city,
      linkedIn,
    });

    await MemberProfile.create({
      user_id: user.id,
      organization: organization || null,
      industry: industry || null,
      designation: designation || null,
      department: department || null,
      personal_email: personalEmail,
      official_email: officialEmail || null,
      mobile: mobile || null,
      experience_years: experience ? parseInt(experience) : null,
      birth_date: birthDate
        ? new Date(birthDate).toISOString().split("T")[0]
        : null,
      anniversary_date: anniversaryDate
        ? new Date(anniversaryDate).toISOString().split("T")[0]
        : null,
      gender: gender || null,
      country: country || null,
      state: state || null,
      city: city || null,
      LinkedIn: linkedIn || null,
    });
    console.log("✅ Step 6 passed — member profile created");

    // ─── Step 7: Send welcome email ───────────────────────
    console.log("🔍 Step 7: Queuing welcome email to:", personalEmail);
    setImmediate(async () => {
      try {
        await emailService.sendEmail({
          to: personalEmail,
          subject: "Welcome to CXO Orbit Global Community 🚀",
          html: `
            <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
              <p>Dear ${firstName} ${lastName},</p>
              <p>We are absolutely delighted to officially welcome you to the <strong>CXO Orbit Global Community</strong>!</p>
              <p>Your enthusiasm and leadership mindset are what make this ecosystem powerful, and we're excited to have you onboard.</p>

              <h3 style="color:#0B2C4D;">How CXO Orbit Elevates You</h3>
              <h4>1. Networking & Knowledge</h4>
              <ul>
                <li>Be part of a trusted, vendor-free network of CXOs</li>
                <li>Connect with industry leaders and peers</li>
                <li>Exclusive roundtables & leadership events</li>
                <li>Collaboration & consulting opportunities</li>
              </ul>
              <h4>2. Personal Growth & Branding</h4>
              <ul>
                <li>Speaking opportunities & panel discussions</li>
                <li>Support for LinkedIn branding & storytelling</li>
                <li>Access to curated insights & reports</li>
              </ul>
              <h4>3. Giving Back & Influence</h4>
              <ul>
                <li>Mentor emerging leaders</li>
                <li>Co-create playbooks & thought leadership</li>
                <li>Lead impactful discussions</li>
              </ul>

              <h3 style="color:#0B2C4D;">Member Privileges</h3>
              <ul>
                <li>Travel & stay benefits (Flights & Hotels)</li>
                <li>Premium lifestyle & brand collaborations</li>
                <li>Education & wellness offers</li>
                <li>Custom LinkedIn content support</li>
              </ul>

              <p>As a token of appreciation, a welcome gift will be shared with you shortly.</p>
              <p><strong>Registered Organization:</strong> ${organization || "N/A"}</p>
              <p>Join our community on LinkedIn:<br/>
                <a href="https://www.linkedin.com/groups/15057005/" target="_blank">CXO Orbit Community</a>
              </p>
              <br/>
              <p>Once again, welcome to CXO Orbit — where leadership meets influence.</p>
              <div style="margin-top:20px; font-size:14px;">
                <p><strong>Thanks & Regards,</strong></p>
                <p style="margin:0;"><strong>Mansi Borkhetaria</strong></p>
                <p style="margin:0;">Asst. Manager - Community</p>
                <p style="margin:0;">📞 +91-9619273892</p>
                <p style="margin:0;">🌐 www.kestoneglobal.com</p>
                <p style="margin:0;">📍 Mumbai, India</p>
              </div>
            </div>
          `,
        });
        console.log("✅ Welcome email sent to:", personalEmail);
      } catch (err) {
        console.error("❌ Welcome email failed:", err.message);
      }
    });

    // ─── Step 8: Respond ──────────────────────────────────
    console.log("✅ Step 8: Sending success response");
    res.json({
      success: true,
      message: "Registration submitted for approval",
    });
  } catch (err) {
    console.error("🔥 registerMember CRASH at:", err.message);
    console.error("🔥 Full error:", err);
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
