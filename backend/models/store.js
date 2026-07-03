'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   static associate(models) {
  models.Store.hasMany(models.Rating, { foreignKey: 'storeId' });
}
  }
  Store.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    // models/Store.js मध्ये असा बदल कर:
ownerId: {
  type: DataTypes.STRING,
  allowNull: true // सुरुवातीला 'true' ठेव म्हणजे जुन्या डेटाला त्रास होणार नाही
}
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};