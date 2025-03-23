const Sequelize = require('sequelize');
require("dotenv").config();

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.MYSQL_DB, 
  process.env.MYSQL_USER, 
  process.env.MYSQL_PASSWORD, 
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    timezone: '+05:30', // Set your desired timezone here
    logging: false, 
  }
);

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('✅ MySQL connection has been established successfully.');
  })
  .catch(err => {
    console.error(' ❌ Unable to connect to the MySQL database:', err);
  });

// Export sequelize
module.exports = { sequelize };