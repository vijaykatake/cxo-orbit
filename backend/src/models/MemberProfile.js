const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const MemberProfile = sequelize.define(
  "MemberProfile",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    designation: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    department: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    personal_email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    official_email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    mobile: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },

    experience_years: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    anniversary_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: true,
    },

    country: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    state: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "member_profiles",
    timestamps: false,
  },
);

module.exports = MemberProfile;
