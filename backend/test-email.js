require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "a7c6f6001@smtp-brevo.com",
    pass: process.env.SMTP_PASS,
  },
  tls: { rejectUnauthorized: false },
});

transporter.sendMail(
  {
    from: '"CXO Orbit" <cxoorbit@gmail.com>',
    to: "vijukatake@gmail.com",
    subject: "Brevo Test Email",
    html: "<p>If you see this, Brevo SMTP is working!</p>",
  },
  (err, info) => {
    if (err) {
      console.error("❌ Failed:", err.message);
    } else {
      console.log("✅ Sent! Message ID:", info.messageId);
      console.log("Response:", info.response);
    }
  },
);
