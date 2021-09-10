'use strict';
const {hash} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Recipe, {foreignKey: 'userId'})
      User.hasMany(models.Rating, {foreignKey: 'userId'})
      User.hasMany(models.Transaction, {foreignKey: 'userId'})
    }
  };
  User.init({
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate : (user)=>{
        user.status = 'New User'
        user.password = hash(user.password);
        if(!user.name){
          user.name = user.email.split('@')[0]
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};