module.exports = (sequelize, DataTypes) => {
  const ContactForm = sequelize.define(
    "ContactForm",
    {
      id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      mobile: DataTypes.STRING,
      subject: DataTypes.STRING,
      message: DataTypes.TEXT,
      closed: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
    },
    {
      tableName: "contact_form",
      timestamps: true,
    },
  );

  return ContactForm;
};
