const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const CMSPage = require("../models/CMSPage");
const { authenticate, staffOrAbove } = require("../middleware/authMiddleware");

// Public: get published page by slug
router.get("/:slug", async (req, res) => {
  try {
    const page = await CMSPage.findOne({
      where: { slug: req.params.slug, isPublished: true },
    });
    if (!page)
      return res
        .status(404)
        .json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Admin: list all pages
router.get("/", authenticate, staffOrAbove, async (req, res) => {
  try {
    const pages = await CMSPage.findAll({ order: [["updatedAt", "DESC"]] });
    res.json({ success: true, data: pages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Admin: create page
router.post("/", authenticate, staffOrAbove, async (req, res) => {
  try {
    const page = await CMSPage.create({
      id: uuidv4(),
      ...req.body,
      updatedBy: req.user.id,
    });
    res.status(201).json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Admin: update page
router.put("/:id", authenticate, staffOrAbove, async (req, res) => {
  try {
    const page = await CMSPage.findByPk(req.params.id);
    if (!page)
      return res
        .status(404)
        .json({ success: false, message: "Page not found" });
    await page.update({ ...req.body, updatedBy: req.user.id });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
