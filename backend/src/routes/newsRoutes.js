const router = require("express").Router();

const {
  createNews,
  getAllNews,
  updateNews,
  deleteNews,
  getPublicNews,

  // 🔥 GALLERY
  getGalleryByNewsId,
  uploadGalleryImages,
  deleteGalleryImage,
} = require("../controllers/newsController");

// 🔐 Middleware
const { authenticate, adminOnly } = require("../middleware/authMiddleware");

// ✅ Multer Upload
const upload = require("../middleware/upload");

// =========================
// 🔥 CMS ROUTES (ADMIN)
// =========================

// =========================
// 📰 NEWS ROUTES
// =========================

// Create News
router.post(
  "/cms/news",
  authenticate,
  adminOnly,
  upload.single("main_image"),
  createNews,
);

// Get All News
router.get("/cms/news", authenticate, adminOnly, getAllNews);

// Update News
router.put(
  "/cms/news/:id",
  authenticate,
  adminOnly,
  upload.single("main_image"),
  updateNews,
);

// Delete News
router.delete("/cms/news/:id", authenticate, adminOnly, deleteNews);

// =========================
// 🖼️ GALLERY ROUTES
// =========================

// Delete gallery image (specific first)
router.delete(
  "/cms/news/gallery/:id",
  authenticate,
  adminOnly,
  deleteGalleryImage,
);

// Get gallery by news ID
router.get(
  "/cms/news/:id/gallery",
  authenticate,
  adminOnly,
  getGalleryByNewsId,
);

// Upload gallery images
router.post(
  "/cms/news/:id/gallery",
  authenticate,
  adminOnly,
  uploadGalleryImages,
);

// =========================
// 🌐 PUBLIC ROUTES (PORTAL)
// =========================

// Get News for Homepage
router.get("/news", getPublicNews);

module.exports = router;
