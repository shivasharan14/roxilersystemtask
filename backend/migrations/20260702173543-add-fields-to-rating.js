'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // नवीन कॉलम्स ॲड करण्यासाठी
    await queryInterface.addColumn('Ratings', 'storeId', { type: Sequelize.INTEGER, allowNull: false });
    await queryInterface.addColumn('Ratings', 'userId', { type: Sequelize.INTEGER, allowNull: false });
    await queryInterface.addColumn('Ratings', 'comment', { type: Sequelize.TEXT });
  },

  down: async (queryInterface, Sequelize) => {
    // जर माइग्रेशन 'undo' करायचं असेल तर हे कॉलम्स काढून टाकेल
    await queryInterface.removeColumn('Ratings', 'storeId');
    await queryInterface.removeColumn('Ratings', 'userId');
    await queryInterface.removeColumn('Ratings', 'comment');
  }
};