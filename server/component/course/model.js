const { DataTypes } = require("sequelize");
const db = require("../../config/db");

const Course = db.define(
  "Course",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "students",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    },
    purchase_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    courses_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "courses",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    },
    payment_type: {
      type: DataTypes.ENUM("installment", "fullPayment"),
      allowNull: false,
    },
    total_fees: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discount_applied: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    order_ammount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance_ammount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payable_ammount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_mode: {
      type: DataTypes.ENUM("Cash", "Cheque", "Online payment"),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    modified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    modified_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deleted_on: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_deleted: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    tableName: "courses",
    timestamps: false,
  }
);

module.exports = Course;
