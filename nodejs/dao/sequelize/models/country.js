"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Country.hasMany(models.Beer, {
        foreignKey: {
          name: "country",
          type: DataTypes.STRING,
          allowNull: true,
        },
      });
    }
  }
  Country.init(
    {
      code: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "Country",
    }
  );
  return Country;
};
