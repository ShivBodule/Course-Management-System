const { Sequelize } = require("sequelize");
require("dotenv").config();

// Initialize Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Set to true to debug raw SQL queries
});

// Function to connect to DB
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully!");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
    }
};

module.exports = sequelize; // ❌ Don't destructure
module.exports.connectDB = connectDB;
