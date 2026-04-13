const db = require("../models");

const ContactForm = db.ContactForm;
const EmailLog = db.EmailLog;
console.log("ContactForm:", ContactForm);
const { sendEmail } = require("../services/email.service");
const {
  adminTemplate,
  userTemplate,
} = require("../templates/contact.template");

exports.submitContact = async (req, res) => {
  const data = req.body;

  try {
    // ✅ 1. Save Contact Form
    const contact = await ContactForm.create({
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      subject: data.subject,
      message: data.message,
      closed: 0,
    });
    console.log("✅ CONTACT SAVED:", contact.id);
    // ✅ 2. Send Admin Email
    const adminRes = await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact - ${data.name}`,
      htmlContent: adminTemplate(data),
    });
    console.log("📧 ADMIN EMAIL RESULT:", adminRes);
    // ✅ 3. Log Admin Email
    await EmailLog.create({
      recipientEmail: process.env.ADMIN_EMAIL,
      subject: `New Contact - ${data.name}`,
      templateType: "CONTACT_ADMIN",
      body: JSON.stringify(data),
      status: adminRes.success ? "sent" : "failed",
      errorMessage: adminRes.success ? null : "Failed",
      sentAt: new Date(),
      relatedId: contact.id,
    });
    console.log("✅ ADMIN EMAIL LOGGED");
    // ✅ 4. Send User Email
    const userRes = await sendEmail({
      to: data.email,
      subject: "We received your message",
      htmlContent: userTemplate(data),
    });
    console.log("📧 USER EMAIL RESULT:", userRes);
    // ✅ 5. Log User Email
    await EmailLog.create({
      recipientEmail: data.email,
      subject: "We received your message",
      templateType: "CONTACT_USER",
      body: JSON.stringify(data),
      status: userRes.success ? "sent" : "failed",
      errorMessage: userRes.success ? null : "Failed",
      sentAt: new Date(),
      relatedId: contact.id,
    });
    console.log("✅ USER EMAIL LOGGED");
    return res.status(200).json({
      success: true,
      message: "Contact saved & email sent",
      id: contact.id,
    });
  } catch (err) {
    console.error("❌ Contact error:", err);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
