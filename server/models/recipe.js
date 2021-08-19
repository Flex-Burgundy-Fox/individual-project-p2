'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recipe.belongsTo(models.User, {foreignKey: 'userId'})
      Recipe.hasMany(models.Rating, {foreignKey: 'recipeId'})
      Recipe.hasMany(models.Component, {foreignKey: 'recipeId'})
      Recipe.hasMany(models.Method, {foreignKey: 'recipeId'})
    }
  };
  Recipe.init({
    name: DataTypes.STRING,
    timeReq: DataTypes.INTEGER,
    servings: DataTypes.INTEGER,
    summary: DataTypes.STRING,
    status: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};