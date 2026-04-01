const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Sponsor = sequelize.define(
  "Sponsor",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    companyName: { type: DataTypes.STRING(255), allowNull: false },
    contactName: { type: DataTypes.STRING(150), allowNull: true },
    contactEmail: { type: DataTypes.STRING(255), allowNull: false },
    contactPhone: { type: DataTypes.STRING(20), allowNull: true },
    website: { type: DataTypes.STRING(255), allowNull: true },
    logo: { type: DataTypes.STRING(500), allowNull: true },
    package: {
      type: DataTypes.ENUM("title", "gold", "silver", "bronze", "associate"),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("inquiry", "active", "inactive"),
      defaultValue: "inquiry",
    },
    notes: { type: DataTypes.TEXT, allowNull: true },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "sponsors",
    timestamps: true,
  },
);

module.exports = Sponsor;
