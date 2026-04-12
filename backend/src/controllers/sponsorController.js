const { v4: uuidv4 } = require("uuid");
const Sponsor = require("../models/Sponsor");

// ─── Public: Submit Sponsor Inquiry ──────────────────────
const submitInquiry = async (req, res) => {
  try {
    const sponsor = await Sponsor.create({
      id: uuidv4(),
      ...req.body,
      status: "inquiry",
    });

    // Alert admin
    await sendInquiryAlert(process.env.SMTP_USER, "Sponsor", {
      companyName: sponsor.companyName,
      contactEmail: sponsor.contactEmail,
      package: sponsor.package || "Not specified",
    }).catch(() => {}); // non-blocking

    res
      .status(201)
      .json({
        success: true,
        message: "Thank you! We will get back to you shortly.",
        data: sponsor,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Admin: Get All Sponsors ──────────────────────────────
const getAllSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.unscoped().findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json({ success: true, data: sponsors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Admin: Update Sponsor ────────────────────────────────
const updateSponsor = async (req, res) => {
  try {
    const sponsor = await Sponsor.findByPk(req.params.id);
    if (!sponsor)
      return res
        .status(404)
        .json({ success: false, message: "Sponsor not found" });
    await sponsor.update(req.body);
    res.json({ success: true, data: sponsor });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { submitInquiry, getAllSponsors, updateSponsor };
