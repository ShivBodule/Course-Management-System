const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const Batch = sequelize.define("Batch", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false },
});

module.exports = Batch;
