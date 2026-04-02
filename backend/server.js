require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const sequelize = require("./src/config/database");

// Route imports
const authRoutes = require("./src/routes/authRoutes");
const eventRoutes = require("./src/routes/eventRoutes");
const memberRoutes = require("./src/routes/memberRoutes");
const sponsorRoutes = require("./src/routes/sponsorRoutes");
const partnerRoutes = require("./src/routes/partnerRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const emailRoutes = require("./src/routes/emailRoutes");
const cmsRoutes = require("./src/routes/cmsRoutes");
const newsRoutes = require("./src/routes/newsRoutes");

const app = express();

// ─── Middleware ───────────────────────────────────────────
app.use(helmet());
// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(
  cors({
    origin: "*",
  }),
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ─── Routes ───────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/sponsors", sponsorRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/cms", cmsRoutes);
// ✅ CMS News Page
app.use("/api", newsRoutes);
// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    app: "CXO Orbit Global API",
    timestamp: new Date(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ─── Start Server ────────────────────────────────────────
const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ MySQL connected");
    return sequelize.sync({ alter: false }); // use migrations in production
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  });
