const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Registration = sequelize.define(
  "Registration",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    eventId: { type: DataTypes.UUID, allowNull: false },
    userId: { type: DataTypes.UUID, allowNull: false },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "confirmed",
        "cancelled",
        "attended",
        "no_show",
      ),
      defaultValue: "pending",
    },
    rsvpResponse: {
      type: DataTypes.ENUM("yes", "no", "maybe"),
      allowNull: true,
    },
    checkedInAt: { type: DataTypes.DATE, allowNull: true },
    notes: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    tableName: "registrations",
    timestamps: true,
  },
);

module.exports = Registration;
