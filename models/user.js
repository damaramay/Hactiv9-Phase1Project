"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, { foreignKey: "userId" });
      User.belongsToMany(models.Course, {
        through: "UserCourses",
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user, options) => {
    if (user.role !== "admin" || user.role !== null) {
      user.role = "user";
    }
    user.password = bcrypt.hashSync(user.password, salt);
  });

  return User;
};
