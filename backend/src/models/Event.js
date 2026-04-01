const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING(255), allowNull: false },
    slug: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    eventType: {
      type: DataTypes.ENUM(
        "conference",
        "roundtable",
        "webinar",
        "hybrid",
        "micro-conference",
      ),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("draft", "published", "cancelled", "completed"),
      defaultValue: "draft",
    },
    city: { type: DataTypes.STRING(100), allowNull: true },
    venue: { type: DataTypes.STRING(255), allowNull: true },
    address: { type: DataTypes.TEXT, allowNull: true },
    startDate: { type: DataTypes.DATE, allowNull: true },
    endDate: { type: DataTypes.DATE, allowNull: true },
    capacity: { type: DataTypes.INTEGER, allowNull: true },
    isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
    isPaid: { type: DataTypes.BOOLEAN, defaultValue: false },
    ticketPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    bannerImage: { type: DataTypes.STRING(500), allowNull: true },
    agenda: { type: DataTypes.JSON, allowNull: true },
    isInviteOnly: { type: DataTypes.BOOLEAN, defaultValue: true },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdBy: { type: DataTypes.UUID, allowNull: true },
  },
  {
    tableName: "events",
    timestamps: true,
    defaultScope: { where: { isDeleted: false } },
  },
);

module.exports = Event;
