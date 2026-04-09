const db = require("../models");
const { Op } = require("sequelize");

const News = db.News;
const NewsGallery = db.NewsGallery;

// 🔥 Helper: Generate slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");
};

// ===============================
// ✅ CREATE NEWS
// ===============================
exports.createNews = async (req, res) => {
  try {
    const multer = require("multer");
    const path = require("path");
    const fs = require("fs");

    // ✅ Always resolve relative to THIS FILE
    const uploadPath = path.join(__dirname, "../../uploads/NewImgUpload");

    console.log("📁 Upload Path:", uploadPath);

    // ✅ Ensure folder exists BEFORE upload
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
      console.log("✅ Upload folder created");
    }

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadPath);
      },
      filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
      },
    });

    module.exports = multer({ storage });

    const { title, info, date, venue, address, link, gallery = [] } = req.body;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    // ❌ If image is mandatory → enforce
    if (!req.file) {
      return res.status(400).json({
        error: "Image upload failed or missing",
      });
    }

    // ✅ HANDLE IMAGE UPLOAD
    const main_image = `/uploads/NewImgUpload/${req.file.filename}`;

    const slug = generateSlug(title);

    const news = await News.create({
      title,
      slug,
      info,
      date,
      venue,
      address,
      link,
      main_image,
    });

    // 🔥 Insert gallery images (UNCHANGED)
    if (gallery && gallery.length > 0) {
      const galleryData = gallery.map((img) => ({
        news_id: news.id,
        image_url: img,
      }));

      await NewsGallery.bulkCreate(galleryData);
    }

    res.json({
      message: "News created successfully",
      data: news,
    });
  } catch (error) {
    console.error("CREATE NEWS ERROR:", error); // 🔥 IMPORTANT FOR RENDER LOGS

    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

// ===============================
// ✅ GET ALL NEWS (CMS)
// ===============================
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.findAll({
      order: [["date", "DESC"]],
      include: {
        model: NewsGallery,
        as: "gallery",
      },
    });

    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// ✅ UPDATE NEWS
// ===============================
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      info,
      date,
      venue,
      address,
      link,
      main_image, // existing value (fallback)
      gallery = [],
    } = req.body;

    const news = await News.findByPk(id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    const slug = generateSlug(title);

    // ✅ HANDLE IMAGE (UPLOAD OR KEEP OLD)
    const updatedImage = req.file
      ? `/uploads/NewImgUpload/${req.file.filename}`
      : main_image;

    await news.update({
      title,
      slug,
      info,
      date,
      venue,
      address,
      link,
      main_image: updatedImage,
    });

    // 🔥 Replace gallery (unchanged)
    await NewsGallery.destroy({ where: { news_id: id } });

    if (gallery.length > 0) {
      const galleryData = gallery.map((img) => ({
        news_id: id,
        image_url: img,
      }));

      await NewsGallery.bulkCreate(galleryData);
    }

    res.json({ message: "News updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// ✅ DELETE NEWS
// ===============================
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findByPk(id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    await news.destroy();

    res.json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// ✅ PUBLIC API (HOMEPAGE)
// ===============================
exports.getPublicNews = async (req, res) => {
  try {
    const today = new Date();

    const latest = await News.findAll({
      where: {
        date: { [Op.gte]: today },
      },
      order: [["date", "ASC"]],
      include: "gallery",
    });

    const past = await News.findAll({
      where: {
        date: { [Op.lt]: today },
      },
      order: [["date", "DESC"]],
      include: "gallery",
    });

    res.json({ latest, past });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ===============================
// ✅ GET GALLERY BY NEWS ID
// ===============================
exports.getGalleryByNewsId = async (req, res) => {
  try {
    const { id } = req.params;

    const images = await NewsGallery.findAll({
      where: { news_id: id },
      order: [["id", "DESC"]],
    });

    res.json(images);
  } catch (error) {
    console.error("GET GALLERY ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
// ===============================
// ✅ UPLOAD GALLERY IMAGES
// ===============================
exports.uploadGalleryImages = async (req, res) => {
  try {
    const multer = require("multer");
    const path = require("path");
    const fs = require("fs");

    const { id } = req.params;

    const uploadPath = path.join(__dirname, "../../uploads/NewImgUpload");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, uploadPath),
      filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
      },
    });

    const upload = multer({ storage }).array("images", 10);

    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      const galleryData = req.files.map((file) => ({
        news_id: id,
        image_url: `/uploads/NewImgUpload/${file.filename}`,
      }));

      await NewsGallery.bulkCreate(galleryData);

      res.json({ message: "Images uploaded successfully" });
    });
  } catch (error) {
    console.error("UPLOAD GALLERY ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
// ===============================
// ✅ DELETE GALLERY IMAGE
// ===============================
exports.deleteGalleryImage = async (req, res) => {
  try {
    const path = require("path");
    const fs = require("fs");

    const { id } = req.params;

    const image = await NewsGallery.findByPk(id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // 🔥 DELETE FILE FROM SERVER
    const filePath = path.join(__dirname, "../../", image.image_url);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await image.destroy();

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("DELETE IMAGE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
// ===============================
// ✅ HOMEPAGE NEWS (NEW SAFE API)
// ===============================
exports.getHomePageNewsOLD = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 🔥 fix date issue

    const latestNewsRaw = await News.findAll({
      where: {
        date: { [Op.gte]: today },
      },
      order: [["date", "ASC"]],
      include: "gallery",
    });

    const pastNewsRaw = await News.findAll({
      where: {
        date: { [Op.lt]: today },
      },
      order: [["date", "DESC"]],
      include: "gallery",
    });

    // 🔥 BASE URL (for images)
    const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

    // 🔥 FORMAT FUNCTION (IMPORTANT)
    const formatNews = (list) =>
      list.map((item) => {
        const data = item.toJSON();

        return {
          ...data,

          // ✅ FIX MAIN IMAGE URL
          main_image: data.main_image ? BASE_URL + data.main_image : null,

          // ✅ FIX GALLERY ARRAY → ["url1", "url2"]
          gallery: data.gallery
            ? data.gallery.map((g) => BASE_URL + g.image_url)
            : [],
        };
      });

    res.json({
      latestNews: formatNews(latestNewsRaw),
      pastNews: formatNews(pastNewsRaw),
    });
  } catch (error) {
    console.error("HOMEPAGE NEWS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
// ===============================
// ✅ HOMEPAGE NEWS (SIMPLIFIED)
// ===============================
exports.getHomePageNews = async (req, res) => {
  try {
    // 🔥 FETCH ALL NEWS (NO DATE FILTER)
    const newsRaw = await News.findAll({
      order: [["date", "DESC"]], // ✅ latest first
      include: "gallery",
    });

    // 🔥 BASE URL (for images)
    const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

    // 🔥 FORMAT FUNCTION
    const formattedNews = newsRaw.map((item) => {
      const data = item.toJSON();

      return {
        ...data,

        // ✅ MAIN IMAGE FIX
        main_image: data.main_image ? BASE_URL + data.main_image : null,

        // ✅ GALLERY FIX
        gallery: data.gallery
          ? data.gallery.map((g) => BASE_URL + g.image_url)
          : [],
      };
    });

    // ✅ RETURN ONLY ONE LIST
    res.json({
      news: formattedNews,
    });
  } catch (error) {
    console.error("HOMEPAGE NEWS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
