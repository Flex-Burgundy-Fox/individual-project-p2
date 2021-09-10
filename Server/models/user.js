"use strict"
const { Model } = require("sequelize")
const { hashingPassword } = require("../helpers/bcrypt")

module.exports = (sequelize, DataTypes) => {
   class User extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         User.hasMany(models.FavoriteMovie, { foreignKey: "UserId" })
         User.hasMany(models.Bill, { foreignKey: "UserId" })
      }
   }
   User.init(
      {
         email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               isEmail: {
                  msg: "Email input must be in email format"
               },
               notNull: {
                  msg: "Email input cannot be null"
               },
               notEmpty: {
                  msg: "Email input cannot be empty"
               }
            }
         },
         password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               len: {
                  args: [8],
                  msg: "Password input must be at least 8 characters"
               },
               notNull: {
                  msg: "Password input cannot be null"
               },
               notEmpty: {
                  msg: "Password input cannot be empty"
               }
            }
         },
         role: {
            type: DataTypes.STRING,
            defaultValue: "basic",
            allowNull: false,
            validate: {
               notNull: {
                  msg: "Role input cannot be null"
               },
               notEmpty: {
                  msg: "Role input cannot be empty"
               }
            }
         }
      },
      {
         sequelize,
         modelName: "User"
      }
   )

   User.beforeCreate((instance, options) => {
      const hashedPassword = hashingPassword(instance.password)

      instance.password = hashedPassword
   })
   return User
}
