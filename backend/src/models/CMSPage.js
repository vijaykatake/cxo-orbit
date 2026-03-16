const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const CMSPage = sequelize.define(
  "CMSPage",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    slug: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    content: { type: DataTypes.TEXT("long"), allowNull: true },
    metaTitle: { type: DataTypes.STRING(255), allowNull: true },
    metaDesc: { type: DataTypes.STRING(500), allowNull: true },
    isPublished: { type: DataTypes.BOOLEAN, defaultValue: false },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    updatedBy: { type: DataTypes.UUID, allowNull: true },
  },
  {
    tableName: "cms_pages",
    timestamps: true,
  },
);

module.exports = CMSPage;
