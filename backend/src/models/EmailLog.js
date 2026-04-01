const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const EmailLog = sequelize.define(
  "EmailLog",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    recipientEmail: { type: DataTypes.STRING(255), allowNull: false },
    subject: { type: DataTypes.STRING(255), allowNull: false },
    templateType: { type: DataTypes.STRING(100), allowNull: true },
    body: { type: DataTypes.TEXT, allowNull: true },
    status: {
      type: DataTypes.ENUM("pending", "sent", "failed"),
      defaultValue: "pending",
    },
    errorMessage: { type: DataTypes.TEXT, allowNull: true },
    sentAt: { type: DataTypes.DATE, allowNull: true },
    relatedId: { type: DataTypes.UUID, allowNull: true }, // eventId, userId etc.
  },
  {
    tableName: "email_logs",
    timestamps: true,
  },
);

module.exports = EmailLog;
