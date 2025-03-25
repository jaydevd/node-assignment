/**
 * @name commonAttributes
 * @file CommonAttributes.js
 * @param {Request} req
 * @param {Response} res
 * @throwsF
 * @description This file contains all common attributes used across the tables.
 * @author Jaydev Dwivedi (Zignuts)
 */

const { DataTypes } = require("sequelize");

const commonAttributes = {
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Math.floor(Date.now() / 1000),
        allowNull: false
    },
    created_by: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updated_by: {
        type: DataTypes.STRING(60),
        allowNull: true
    }
}

module.exports = {
    commonAttributes
}