'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING,
        notEmpty: true,
        notNull: true
      },
      last_name: {
        type: Sequelize.STRING,
        notEmpty: true,
        notNull: true
      },
      email: {
        type: Sequelize.STRING,
        isEmail: true,
        notEmpty: true,
        notNull: true
      },
      password: {
        type: Sequelize.STRING,
        notEmpty: true,
        notNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};