const emailService = require("../services/emailService");

exports.contactForm = async (req, res) => {
  try {
    const { name, email, mobile, subject, message } = req.body;

    console.log("CONTACT FORM DATA:", req.body);

    // ✅ Immediate response (fast UX)
    res.status(200).json({
      success: true,
      message: "Your message has been received",
    });

    // ✅ Send email (non-blocking like partnerController)
    setImmediate(async () => {
      try {
        // 🔹 Email to Admin
        await emailService.sendEmail({
          to: process.env.EMAIL_FROM,
          subject: `CXO ORBIT : New Contact Inquiry: ${subject}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Mobile:</b> ${mobile}</p>
            <p><b>Subject:</b> ${subject}</p>
            <p><b>Message:</b><br/> ${message}</p>
          `,
        });

        // 🔹 Auto-reply to user (optional but recommended)
        await emailService.sendEmail({
          to: email,
          subject: "Thank you for contacting CXO Orbit Global",
          html: `
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to CXO Orbit Global.</p>
            <p>Our team will review your message and get back to you shortly.</p>
            <br/>
            <p>Warm regards,<br/>Team CXO Orbit Global</p>
          `,
        });

        console.log("✅ Contact emails sent");
      } catch (err) {
        console.error("❌ Contact email failed:", err.message);
      }
    });
  } catch (error) {
    console.error("Contact Form Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
