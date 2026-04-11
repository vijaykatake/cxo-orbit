require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const rateLimit = require("express-rate-limit");

const sequelize = require("./src/config/database");

// ─── App Init ─────────────────────────────────────────────
const app = express();

// ✅ TRUST PROXY (Render / Production fix)
app.set("trust proxy", 1);

// ─── Rate Limiter ─────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

// ─── Config ───────────────────────────────────────────────
const SERVER_URL =
  process.env.SERVER_URL ||
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

// ─── Route Imports ────────────────────────────────────────
const authRoutes = require("./src/routes/authRoutes");
const eventRoutes = require("./src/routes/eventRoutes");
const memberRoutes = require("./src/routes/memberRoutes");
const sponsorRoutes = require("./src/routes/sponsorRoutes");
const partnerRoutes = require("./src/routes/partnerRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const emailRoutes = require("./src/routes/emailRoutes");
const cmsRoutes = require("./src/routes/cmsRoutes");
const newsRoutes = require("./src/routes/newsRoutes");

// ─── Security Middleware ──────────────────────────────────
app.use(
  helmet({
    crossOriginResourcePolicy: false, // allow external images (Cloudinary etc.)
  }),
);

// ─── CORS ─────────────────────────────────────────────────
app.use(
  cors({
    origin: [CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.options("*", cors());

// ─── Logging ──────────────────────────────────────────────
app.use(morgan("dev"));

// ─── Body Parsers ─────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ─── Rate Limiter (after parsers) ─────────────────────────
app.use(limiter);

// ─── Static Uploads (Legacy / Optional) ───────────────────
const uploadDir = path.join(__dirname, "uploads/NewImgUpload");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("✅ Upload folder created:", uploadDir);
} else {
  console.log("📁 Upload folder exists");
}

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
    },
  }),
);

// ─── Routes ───────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/sponsors", sponsorRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/cms", cmsRoutes);
app.use("/api", newsRoutes);

// ─── Health Check ─────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    app: "CXO Orbit Global API",
    timestamp: new Date(),
  });
});

// ─── 404 Handler ──────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ─── Global Error Handler ─────────────────────────────────
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ─── Start Server ─────────────────────────────────────────
const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ MySQL connected");
    return sequelize.sync({ alter: false }); // use migrations in production
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at ${SERVER_URL}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  });
