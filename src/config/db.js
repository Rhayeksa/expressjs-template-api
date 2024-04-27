require("dotenv").config({ path: "./.env" });
exports.Sequelize = require("sequelize");

exports.sequelize = new this.Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    pool: {
      min: 0,
      max: 10,
      acquire: 30000,
      idle: 10000,
    },
  }
);
