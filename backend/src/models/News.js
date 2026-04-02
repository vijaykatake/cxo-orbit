module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define(
    "News",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(191), // ✅ matches DB fix
        unique: true,
      },
      info: {
        type: DataTypes.TEXT,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      venue: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.TEXT,
      },
      link: {
        type: DataTypes.STRING,
      },
      main_image: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "news",
      underscored: true,
      timestamps: true,
    },
  );

  News.associate = (models) => {
    News.hasMany(models.NewsGallery, {
      foreignKey: "news_id",
      as: "gallery",
      onDelete: "CASCADE",
    });
  };

  return News;
};
