const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
const { sendInquiryAlert } = require("../services/emailService");
const { authenticate, adminOnly } = require("../middleware/authMiddleware");

// Inline model for Partner (similar to Sponsor)
const Partner = sequelize.define(
  "Partner",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    companyName: { type: DataTypes.STRING(255), allowNull: false },
    contactName: { type: DataTypes.STRING(150), allowNull: true },
    contactEmail: { type: DataTypes.STRING(255), allowNull: false },
    partnerType: {
      type: DataTypes.ENUM("strategic", "media", "technology", "community"),
      allowNull: true,
    },
    website: { type: DataTypes.STRING(255), allowNull: true },
    logo: { type: DataTypes.STRING(500), allowNull: true },
    status: {
      type: DataTypes.ENUM("inquiry", "active", "inactive"),
      defaultValue: "inquiry",
    },
    notes: { type: DataTypes.TEXT, allowNull: true },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { tableName: "partners", timestamps: true },
);

// Public: Partner inquiry
router.post("/inquiry", async (req, res) => {
  try {
    const partner = await Partner.create({ id: uuidv4(), ...req.body });
    await sendInquiryAlert(process.env.SMTP_USER, "Partner", {
      companyName: partner.companyName,
      contactEmail: partner.contactEmail,
      type: partner.partnerType || "N/A",
    }).catch(() => {});
    res
      .status(201)
      .json({
        success: true,
        message: "Thank you! We will be in touch.",
        data: partner,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Admin: Get all
router.get("/", authenticate, adminOnly, async (req, res) => {
  try {
    const partners = await Partner.findAll({ order: [["createdAt", "DESC"]] });
    res.json({ success: true, data: partners });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
