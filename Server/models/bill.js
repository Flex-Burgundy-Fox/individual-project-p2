"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
   class Bill extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Bill.belongsTo(models.User, { foreignKey: "UserId" })
      }
   }
   Bill.init(
      {
         OrderId: DataTypes.STRING,
         transaction_status: DataTypes.STRING,
         UserId: DataTypes.INTEGER
      },
      {
         sequelize,
         modelName: "Bill"
      }
   )
   return Bill
}
