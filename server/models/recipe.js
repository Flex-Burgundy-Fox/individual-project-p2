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
      Recipe.belongsTo(models.User, { foreignKey: 'userId' })
      Recipe.hasMany(models.Rating, { foreignKey: 'recipeId' })
      Recipe.hasMany(models.Component, { foreignKey: 'recipeId' })
      Recipe.hasMany(models.Method, { foreignKey: 'recipeId' })
    }
  };
  Recipe.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    timeReq: DataTypes.INTEGER,
    servings: DataTypes.INTEGER,
    summary: DataTypes.TEXT,
    imageUrl: {
      type: DataTypes.STRING,
      validate:{
        isUrl: {
          args: [true],
          msg: "Invalid Url"
        }
      }
    },
    status: DataTypes.STRING,
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isGreaterThan0(value) {
          if (value < 0) {
            throw new Error("Price can't be negative.");
          }
        }
      }
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};