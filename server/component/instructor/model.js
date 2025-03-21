const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const Instructor = sequelize.define("Instructor", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    expertise: { type: DataTypes.STRING },
});

module.exports = Instructor;
