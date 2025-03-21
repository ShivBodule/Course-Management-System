const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const Course = sequelize.define("Course", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
});

module.exports = Course;
