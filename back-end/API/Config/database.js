/**
 * @name sequelize
 * @file database.js
 * @throwsF
 * @description This file will configure database.
 * @author Jaydev Dwivedi (Zignuts)
 */

const { Sequelize } = require("sequelize");
const { DB_DIALECT } = require("./constants");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
});

(async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

module.exports = { sequelize };