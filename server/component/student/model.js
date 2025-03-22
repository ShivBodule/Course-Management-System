const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db")

const StudentsModel = sequelize.define("students", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  student_id: { type: DataTypes.INTEGER, allowNull: false },
  batch_id: { type: DataTypes.INTEGER, allowNull: false },
  status: { 
    type: DataTypes.ENUM("drop", "terminate", "completed", "on-going"), 
    allowNull: false, 
    defaultValue: "on-going" 
  },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  modified_at: { type: DataTypes.DATE, allowNull: true },
  created_by: { type: DataTypes.INTEGER, allowNull: false },
  modified_by: { type: DataTypes.INTEGER, allowNull: true },
  deleted_on: { type: DataTypes.DATE, allowNull: true },
  is_deleted: { 
    type: DataTypes.ENUM("active", "inactive"), 
    defaultValue: "active" 
  },
}, {
  tableName: "Students",
  timestamps: false,
});

module.exports = StudentsModel;
