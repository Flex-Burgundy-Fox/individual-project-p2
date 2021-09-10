'use strict';
const {
  Model
} = require('sequelize');
const { hashedPass } = require('../helper');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "please enter your email"
        },
        notEmpty: {
          msg: "please enter your email"
        },
        notNull: {
          msg: "please enter your email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "please enter your password"
        },
        notEmpty: {
          msg: "please enter your password"
        } 
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashedPass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};