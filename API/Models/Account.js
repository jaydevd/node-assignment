/**
 * @name AccountModel
 * @file User.js
 * @throwsF
 * @description This file will define model of accounts table.
 * @author Jaydev Dwivedi (Zignuts)
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("./../Config/database.js");
const { commonAttributes } = require('./CommonAttributes.js');

const Account = sequelize.define("Account", {
    id: {
        type: DataTypes.STRING(60),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
    },
    age: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
        unique: false
    },
    gender: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: false
    },
    city: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: false
    },
    country: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: false
    },
    company: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false
    },
    token: {
        type: DataTypes.STRING(500),
        allowNull: true,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: false
    },
    ...commonAttributes
},
    {
        tableName: "accounts", // Explicitly set the table name
        timestamps: false   // If your table does not have createdAt/updatedAt
    });

module.exports = { Account };