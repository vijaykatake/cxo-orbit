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

// ✅ CREATE NEWS
exports.createNews = async (req, res) => {
  try {
    const {
      title,
      info,
      date,
      venue,
      address,
      link,
      main_image,
      gallery = [],
    } = req.body;

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

    // 🔥 Insert gallery images
    if (gallery.length > 0) {
      const galleryData = gallery.map((img) => ({
        news_id: news.id,
        image_url: img,
      }));

      await NewsGallery.bulkCreate(galleryData);
    }

    res.json({ message: "News created successfully", data: news });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET ALL NEWS (CMS)
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

// ✅ UPDATE NEWS
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
      main_image,
      gallery = [],
    } = req.body;

    const news = await News.findByPk(id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    const slug = generateSlug(title);

    await news.update({
      title,
      slug,
      info,
      date,
      venue,
      address,
      link,
      main_image,
    });

    // 🔥 Replace gallery
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

// ✅ DELETE NEWS (CASCADE HANDLED BY DB)
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

// ✅ PUBLIC API (HOMEPAGE)
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
