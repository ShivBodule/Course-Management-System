const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db")

const Batch = sequelize.define(
  "Batch",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    students_id: { type: DataTypes.INTEGER, allowNull: false },
    courses_id: { type: DataTypes.INTEGER, allowNull: false },
    batch_name: { type: DataTypes.STRING(100), allowNull: false },
    start_time: { type: DataTypes.TIME, allowNull: false },
    end_time: { type: DataTypes.TIME, allowNull: false },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
    max_students: { type: DataTypes.STRING(255), allowNull: false },
    instructor_id: { type: DataTypes.INTEGER, allowNull: false },
    created_by: { type: DataTypes.INTEGER, allowNull: false },
    modified_by: { type: DataTypes.INTEGER, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    modified_at: { type: DataTypes.DATE, allowNull: true },
    deleted_on: { type: DataTypes.DATE, allowNull: true },
    is_deleted: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    tableName: "batches",
    timestamps: false, // We handle timestamps manually
  }
);

module.exports = Batch;
