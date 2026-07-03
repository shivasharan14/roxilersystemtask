'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      models.Rating.belongsTo(models.Store, { foreignKey: 'storeId' });
      models.Rating.belongsTo(models.User, { foreignKey: 'userId' }); // युजरशी लिंक कर
    }
  }
  
  Rating.init({
    score: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: DataTypes.STRING,
    storeId: { // हे अपडेट कर
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: { // हे नवीन ॲड कर
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};