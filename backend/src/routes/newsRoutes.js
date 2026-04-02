const router = require("express").Router();

const {
  createNews,
  getAllNews,
  updateNews,
  deleteNews,
  getPublicNews,
} = require("../controllers/newsController");

// 🔐 Middleware (reuse your existing)
const { authenticate, adminOnly } = require("../middleware/authMiddleware");

// =========================
// 🔥 CMS ROUTES (ADMIN)
// =========================

// Create News
router.post("/cms/news", authenticate, adminOnly, createNews);

// Get All News (CMS table)
router.get("/cms/news", authenticate, adminOnly, getAllNews);

// Update News
router.put("/cms/news/:id", authenticate, adminOnly, updateNews);

// Delete News
router.delete("/cms/news/:id", authenticate, adminOnly, deleteNews);

// =========================
// 🌐 PUBLIC ROUTES (PORTAL)
// =========================

// Get News for Homepage
router.get("/news", getPublicNews);

module.exports = router;
