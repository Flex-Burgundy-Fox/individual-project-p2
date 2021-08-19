'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Method extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Method.belongsTo(models.Recipe, {foreignKey: 'recipeId'})
    }
  };
  Method.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    recipeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Method',
  });
  return Method;
};