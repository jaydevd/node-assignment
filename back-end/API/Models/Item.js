/**
 * @name AccountModel
 * @file User.js
 * @throwsF
 * @description This file will define model of accounts table.
 * @author Jaydev Dwivedi (Zignuts)
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/database.js");
const { commonAttributes } = require('./CommonAttributes.js');

const Item = sequelize.define("Item", {
    id: {
        type: DataTypes.STRING(60),
        primaryKey: true
    },
    country: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
    },
    city: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    subCategory: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    ...commonAttributes
},
    {
        tableName: "items", // Explicitly set the table name
        timestamps: false   // If your table does not have createdAt/updatedAt
    });

module.exports = { Item };