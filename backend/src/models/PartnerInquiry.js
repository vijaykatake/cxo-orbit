module.exports = (sequelize, DataTypes) => {
  const PartnerInquiry = sequelize.define(
    "PartnerInquiry",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      organization_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      designation: {
        type: DataTypes.STRING(150),
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(100),
      },
      photo: {
        type: DataTypes.STRING(255),
      },
      linkedin_consent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password: {
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: "partner_inquiries",
      timestamps: true,
    },
  );

  return PartnerInquiry;
};
