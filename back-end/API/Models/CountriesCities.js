/**
 * @name userModel
 * @file User.js
 * @throwsF
 * @description This file will define model of Users table.
 * @author Jaydev Dwivedi (Zignuts)
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/database.js");
const { commonAttributes } = require('./CommonAttributes.js');

const CountriesCities = sequelize.define("CountriesCities", {
    id: {
        type: DataTypes.STRING(60),
        primaryKey: true
    },
    city: {
        type: DataTypes.STRING(60),
        allowNull: true,
        unique: false
    },
    country: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: false
    }
},
    {
        tableName: "countries_cities", // Explicitly set the table name
        timestamps: false   // If your table does not have createdAt/updatedAt
    });

module.exports = { CountriesCities };