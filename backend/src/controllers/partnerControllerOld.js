const db = require("../models");
const EmailLog = db.EmailLog;
const { sendEmail } = require("../services/email.service");
const {
  adminTemplate,
  userTemplate,
} = require("../templates/partner.template");

exports.registerPartner = async (req, res) => {
  try {
    const {
      name,
      organization_name,
      designation,
      email,
      mobile,
      city,
      linkedin_consent,
    } = req.body;

    // Photo upload
    // const photo = req.file ? `/uploads/partner/${req.file.filename}` : null;
    const photo = "";
    // Save to DB
    const partner = await PartnerInquiry.create({
      name,
      organization_name,
      designation,
      email,
      mobile,
      city,
      photo,
      linkedin_consent:
        linkedin_consent === "true" || linkedin_consent === true,
      password: null,
    });
    res.status(201).json({
      success: true,
      message: "Partner registered successfully",
      data: partner,
    });
    // Send Welcome Email
    // fire-and-forget email (non-blocking)
    setImmediate(async () => {
      try {
        await emailService.sendEmail({
          to: email,
          subject:
            "Welcome to CXO Orbit Global – Partnership Registration Received",
          html: `
        <p>Dear ${name},</p>
        <p>Thank you for expressing your interest in partnering with CXO Orbit Global.</p>
        <p>Our team will connect with you shortly.</p>
        <br/>
        <p>Warm regards,<br/>Team CXO Orbit Global</p>
      `,
        });

        console.log("✅ Email sent");
      } catch (err) {
        console.error("❌ Email failed:", err.message);
      }
    });
  } catch (error) {
    console.error("Partner Registration Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
