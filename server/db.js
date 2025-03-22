const Sequelize = require('sequelize');

const keys = require('./keys.js');
require("dotenv").config();

// Create Sequelize instance
const sequelize = new Sequelize(keys.MYSQL_DB, keys.MYSQL_USER, keys.MYSQL_PASSWORD, {
  host: keys.MYSQL_HOST,
  dialect: 'mysql',
  timezone: '+05:30', // Set your desired timezone here
  logging: false, 
});

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
