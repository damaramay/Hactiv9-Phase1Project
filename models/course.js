"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Category, { foreignKey: "categoryId" });
      Course.belongsToMany(models.User, {
        through: "UserCourses",
        foreignKey: "courseId",
      });
    }
  }
  Course.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      pdfLink: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
