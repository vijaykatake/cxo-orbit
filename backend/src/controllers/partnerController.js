const { PartnerInquiry } = require("../models");
const emailService = require("../services/emailService");

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

    // Send Welcome Email
    await emailService.sendEmail({
      to: email,
      subject:
        "Welcome to CXO Orbit Global – Partnership Registration Received",
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for expressing your interest in partnering with CXO Orbit Global.</p>
        <p>We are delighted to connect with leaders and organizations who share our vision of building a trusted ecosystem for CXOs to collaborate, innovate, and lead.</p>
        <p>Our team will review your submission and connect with you shortly.</p>
        <br/>
        <p>Warm regards,<br/>Team CXO Orbit Global</p>
      `,
    });

    return res.status(201).json({
      success: true,
      message: "Partner registered successfully",
      data: partner,
    });
  } catch (error) {
    console.error("Partner Registration Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
