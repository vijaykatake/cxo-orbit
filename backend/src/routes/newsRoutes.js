const router = require("express").Router();

const {
  createNews,
  getAllNews,
  updateNews,
  deleteNews,
  getPublicNews,
} = require("../controllers/newsController");

// 🔐 Middleware
const { authenticate, adminOnly } = require("../middleware/authMiddleware");

// ✅ Multer Upload
const upload = require("../middleware/upload");

// =========================
// 🔥 CMS ROUTES (ADMIN)
// =========================

// Create News (WITH IMAGE UPLOAD)
router.post(
  "/cms/news",
  authenticate,
  adminOnly,
  upload.single("main_image"), // ✅ added
  createNews,
);

// Get All News (CMS table)
router.get("/cms/news", authenticate, adminOnly, getAllNews);

// Update News (WITH IMAGE UPLOAD)
router.put(
  "/cms/news/:id",
  authenticate,
  adminOnly,
  upload.single("main_image"), // ✅ added
  updateNews,
);

// Delete News
router.delete("/cms/news/:id", authenticate, adminOnly, deleteNews);

// =========================
// 🌐 PUBLIC ROUTES (PORTAL)
// =========================

// Get News for Homepage
router.get("/news", getPublicNews);

module.exports = router;
