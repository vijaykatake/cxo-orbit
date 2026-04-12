const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // your existing DB config

const db = {};

// 🔥 LOAD MODELS
db.News = require("./News")(sequelize, DataTypes);
db.NewsGallery = require("./NewsGallery")(sequelize, DataTypes);
db.PartnerInquiry = require("./PartnerInquiry")(sequelize, DataTypes);
db.ContactForm = require("./ContactForm")(sequelize, DataTypes);
db.EmailLog = require("./EmailLog")(sequelize, DataTypes);
// (optional: add your existing models here later)
// db.Event = require("./Event")(sequelize, DataTypes);
// db.User = require("./User")(sequelize, DataTypes);

// 🔥 APPLY ASSOCIATIONS
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 🔥 EXPORT
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
