'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Component extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Component.belongsTo(models.Recipe, { foreignKey: 'recipeId' })
    }
  };
  Component.init({
    lists: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notNull: true,
        //still allows string false, null and numbers
        isJson(item) {
          item = typeof item !== "string"
            ? JSON.stringify(item)
            : item;

          try {
            item = JSON.parse(item);
          } catch (e) {
            throw new Error('MUST BE JSON')
          }

          if (typeof item !== "object" || item == null) {
            throw new Error('MUST BE JSON')
          }
        }
      }
    },
    category: DataTypes.STRING,
    recipeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Component',
  });
  return Component;
};