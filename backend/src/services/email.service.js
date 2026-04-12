const { transactionalEmailApi } = require("../config/brevo");

const sendEmail = async ({ to, subject, htmlContent }) => {
  try {
    const response = await transactionalEmailApi.sendTransacEmail({
      sender: {
        email: process.env.BREVO_SENDER_EMAIL,
        name: process.env.BREVO_SENDER_NAME,
      },
      to: [{ email: to }],
      subject,
      htmlContent,
    });

    console.log("✅ Email sent:", response.messageId);
    return true;
  } catch (error) {
    console.error("❌ Email error:", error.response?.body || error);
    return false;
  }
};

module.exports = { sendEmail };
