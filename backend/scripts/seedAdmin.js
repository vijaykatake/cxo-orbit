const bcrypt = require("bcrypt");
const { sequelize } = require("../src/config/database");
const User = require("../src/models/User");

const seedAdmin = async () => {
  try {
    await sequelize.authenticate();

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const existing = await User.findOne({
      where: { email: "admin@cxoorbit.com" },
    });

    if (existing) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    await User.create({
      email: "admin@cxoorbit.com",
      passwordHash: hashedPassword,
      firstName: "Super",
      lastName: "Admin",
      role: "admin",
      isActive: true,
      isVerified: true,
    });

    console.log("✅ Admin created successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
};

seedAdmin();
