const { DataTypes } = require("sequelize");
const db = require("../../config/db");

const Instructor = db.define(
  "Instructor",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    phone_no: {
      type: DataTypes.INTEGER, // Assuming phone_no remains integer as per your schema
      allowNull: false,
    },
    join_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "courses",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    },
    modified_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
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
    tableName: "instructors",
    timestamps: false,
  }
);

module.exports = Instructor;
