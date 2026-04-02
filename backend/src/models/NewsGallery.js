module.exports = (sequelize, DataTypes) => {
  const NewsGallery = sequelize.define(
    "NewsGallery",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      news_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "news_gallery",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false, // matches DB
    },
  );

  NewsGallery.associate = (models) => {
    NewsGallery.belongsTo(models.News, {
      foreignKey: "news_id",
      as: "news",
    });
  };

  return NewsGallery;
};
