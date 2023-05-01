'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rating.belongsTo(models.User, {foreignKey: 'userId'})
      Rating.belongsTo(models.Recipe, {foreignKey: 'recipeId'})
    }
  };
  Rating.init({
    rating: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};