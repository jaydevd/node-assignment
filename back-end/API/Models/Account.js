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

const Account = sequelize.define("Account", {
    id: {
        type: DataTypes.STRING(60),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
    },
    sub_category: {
        type: DataTypes.INTEGER,
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