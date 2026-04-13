const db = require("../models");

const EmailLog = db.EmailLog;
const PartnerInquiry = db.PartnerInquiry;

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

    const photo = "";

    // =========================
    // STEP 1 — SAVE TO DB
    // =========================
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

    // =========================
    // PREPARE DATA OBJECT
    // =========================
    const data = {
      name,
      organization_name,
      designation,
      email,
      mobile,
      city,
      linkedin_consent,
    };

    console.log("📧 Sending partner emails...");

    // =========================
    // STEP 2 — ADMIN EMAIL
    // =========================
    let adminRes = { success: false };

    try {
      adminRes = await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Partner - ${name}`,
        htmlContent: adminTemplate(data),
      });
    } catch (err) {
      console.error("❌ Admin email failed:", err.message);
    }

    // LOG ADMIN EMAIL
    try {
      await EmailLog.create({
        recipientEmail: process.env.ADMIN_EMAIL,
        subject: `New Partner - ${name}`,
        templateType: "PARTNER_ADMIN",
        body: JSON.stringify(data),
        status: adminRes.success ? "sent" : "failed",
        errorMessage: adminRes.success ? null : "Admin email failed",
        sentAt: new Date(),
        relatedId: partner.id,
      });
    } catch (err) {
      console.error("❌ Admin log failed:", err.message);
    }

    // =========================
    // STEP 3 — USER EMAIL
    // =========================
    let userRes = { success: false };

    try {
      userRes = await sendEmail({
        to: email,
        subject: "Partner Registration Received",
        htmlContent: userTemplate(data),
      });
    } catch (err) {
      console.error("❌ User email failed:", err.message);
    }

    // LOG USER EMAIL
    try {
      await EmailLog.create({
        recipientEmail: email,
        subject: "Partner Registration Received",
        templateType: "PARTNER_USER",
        body: JSON.stringify(data),
        status: userRes.success ? "sent" : "failed",
        errorMessage: userRes.success ? null : "User email failed",
        sentAt: new Date(),
        relatedId: partner.id,
      });
    } catch (err) {
      console.error("❌ User log failed:", err.message);
    }

    console.log("✅ Partner flow completed");

    // =========================
    // STEP 4 — RESPONSE
    // =========================
    return res.status(201).json({
      success: true,
      message: "Partner registered successfully",
      data: partner,
    });
  } catch (error) {
    console.error("❌ Partner Registration Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
