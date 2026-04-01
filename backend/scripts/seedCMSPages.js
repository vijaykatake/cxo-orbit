const sequelize = require("../src/config/database");
const CMSPage = require("../src/models/CMSPage");

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("DB Connected ✅");

    await sequelize.sync();

    await CMSPage.bulkCreate([
      {
        title: "Home",
        slug: "home",
        content: {
          hero: {
            title: "Welcome to CXO Orbit",
            subtitle: "India's Elite CXO Network",
          },
        },
      },
      {
        title: "About",
        slug: "about",
        content: {
          about: {
            text: "CXO Orbit connects leaders across industries.",
          },
        },
      },
    ]);

    console.log("CMS Pages seeded successfully ✅");
    process.exit();
  } catch (err) {
    console.error("Seeding error ❌:", err.message);
    process.exit(1);
  }
}

seed();
