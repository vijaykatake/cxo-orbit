const nodemailer = require("nodemailer");
const EmailLog = require("../models/EmailLog");
const { v4: uuidv4 } = require("uuid");

// ─── Transporter Factory ──────────────────────────────────
let transporter = null;

const createTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      `Missing SMTP config — HOST:${SMTP_HOST} USER:${SMTP_USER} PASS:${SMTP_PASS ? "set" : "MISSING"}`,
    );
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT) || 587,
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
    pool: false, // ✅ no persistent connection pool
    tls: { rejectUnauthorized: false },
  });
};

const getTransporter = () => {
  if (!transporter) {
    transporter = createTransporter();
  }
  return transporter;
};

// ✅ Reset transporter on failure so next send reconnects fresh
const resetTransporter = () => {
  if (transporter) {
    try {
      transporter.close();
    } catch (_) {}
    transporter = null;
  }
};

// ─── Startup Verify ───────────────────────────────────────
const verifyMailer = () => {
  return new Promise((resolve, reject) => {
    try {
      getTransporter().verify((err, success) => {
        if (err) {
          console.error("❌ SMTP verify failed:", err.message);
          resetTransporter(); // ✅ reset so next attempt reconnects
          reject(err);
        } else {
          console.log("✅ Brevo SMTP ready");
          resolve(success);
        }
      });
    } catch (err) {
      console.error("❌ SMTP config error:", err.message);
      resetTransporter();
      reject(err);
    }
  });
};

// ─── Safe EmailLog helper (never throws) ──────────────────
const safeLog = async (payload) => {
  try {
    await EmailLog.create(payload);
  } catch (dbErr) {
    console.error("⚠️ EmailLog write failed:", dbErr.message);
  }
};

// ─── Generic Send Email ───────────────────────────────────
const sendEmail = async ({
  to,
  subject,
  html,
  templateType = "general",
  relatedId = null,
}) => {
  const logId = uuidv4();

  const sendWithTimeout = async (mailOptions, retries = 3) => {
    try {
      return await Promise.race([
        getTransporter().sendMail(mailOptions),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("sendMail timeout")), 20000),
        ),
      ]);
    } catch (err) {
      console.error("❌ Attempt failed:", err.message);

      if (retries > 0) {
        console.log(`🔁 Retrying email... (${retries})`);
        resetTransporter(); // 🔥 VERY IMPORTANT
        return sendWithTimeout(mailOptions, retries - 1);
      }

      throw err;
    }
  };

  try {
    await sendWithTimeout({
      from: `"CXO Orbit Global" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
    });

    await safeLog({
      id: logId,
      recipientEmail: to,
      subject,
      templateType,
      body: html,
      status: "sent",
      sentAt: new Date(),
      relatedId,
    });

    return { success: true };
  } catch (err) {
    console.error(
      `❌ sendEmail failed [${templateType}] to ${to}:`,
      err.code,
      err.message,
    );

    resetTransporter(); // ✅ force fresh connection on next send

    await safeLog({
      id: logId,
      recipientEmail: to,
      subject,
      templateType,
      body: html,
      status: "failed",
      errorMessage: err.message,
      relatedId,
    });

    throw err;
  }
};

// ─── OTP Email ────────────────────────────────────────────
const sendOTPEmail = (to, otp, firstName) =>
  sendEmail({
    to,
    templateType: "otp",
    subject: "Your CXO Orbit Login Code",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;">
        <div style="background:#0B2C4D;padding:24px;text-align:center;">
          <h2 style="color:#D4AF37;margin:0;">CXO Orbit Global</h2>
        </div>
        <div style="padding:32px;background:#F8F6F2;">
          <p style="color:#2E2E2E;">Hi <strong>${firstName}</strong>,</p>
          <p>Your one-time login code is:</p>
          <div style="text-align:center;margin:24px 0;">
            <span style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#0B2C4D;">${otp}</span>
          </div>
          <p style="color:#888;font-size:13px;">This code expires in 10 minutes. Do not share it.</p>
        </div>
      </div>`,
  });

// ─── Event Invitation Email ───────────────────────────────
const sendEventInvite = (to, firstName, event) =>
  sendEmail({
    to,
    templateType: "event_invite",
    relatedId: event.id,
    subject: `You're Invited: ${event.title}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
        <div style="background:#0B2C4D;padding:24px;text-align:center;">
          <h2 style="color:#D4AF37;margin:0;">CXO Orbit Global</h2>
        </div>
        <div style="padding:32px;background:#F8F6F2;">
          <p style="color:#2E2E2E;">Dear <strong>${firstName}</strong>,</p>
          <p>We are pleased to invite you to an exclusive CXO event:</p>
          <h3 style="color:#0B2C4D;">${event.title}</h3>
          <p><strong>Date:</strong> ${new Date(event.startDate).toDateString()}</p>
          <p><strong>Venue:</strong> ${event.venue || event.city || "TBA"}</p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${process.env.CLIENT_URL}/events/${event.slug}/rsvp"
               style="background:#D4AF37;color:#0B2C4D;padding:14px 32px;border-radius:4px;text-decoration:none;font-weight:bold;">
              RSVP Now
            </a>
          </div>
        </div>
      </div>`,
  });

// ─── Registration Confirmation ────────────────────────────
const sendRegistrationConfirmation = (to, firstName, event) =>
  sendEmail({
    to,
    templateType: "registration_confirm",
    relatedId: event.id,
    subject: `Registration Confirmed: ${event.title}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
        <div style="background:#0B2C4D;padding:24px;text-align:center;">
          <h2 style="color:#D4AF37;margin:0;">CXO Orbit Global</h2>
        </div>
        <div style="padding:32px;background:#F8F6F2;">
          <p>Hi <strong>${firstName}</strong>,</p>
          <p>Your registration for <strong>${event.title}</strong> is confirmed.</p>
          <p><strong>Date:</strong> ${new Date(event.startDate).toDateString()}</p>
          <p><strong>Venue:</strong> ${event.venue || event.city || "TBA"}</p>
          <p style="color:#1FA6A0;">See you there!</p>
        </div>
      </div>`,
  });

// ─── Sponsor/Partner Inquiry Alert ────────────────────────
const sendInquiryAlert = (adminEmail, inquiryType, data) =>
  sendEmail({
    to: adminEmail,
    templateType: "inquiry_alert",
    subject: `New ${inquiryType} Inquiry — ${data.companyName || data.name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;">
        <h3 style="color:#0B2C4D;">New ${inquiryType} Inquiry Received</h3>
        <table style="width:100%;border-collapse:collapse;">
          ${Object.entries(data)
            .map(
              ([k, v]) => `
            <tr>
              <td style="padding:8px;border:1px solid #ddd;font-weight:bold;width:140px;">${k}</td>
              <td style="padding:8px;border:1px solid #ddd;">${v}</td>
            </tr>`,
            )
            .join("")}
        </table>
        <p style="margin-top:24px;">Login to admin panel to review.</p>
      </div>`,
  });

// ─── Exports ──────────────────────────────────────────────
module.exports = {
  sendEmail,
  verifyMailer,
  sendOTPEmail,
  sendEventInvite,
  sendRegistrationConfirmation,
  sendInquiryAlert,
};
