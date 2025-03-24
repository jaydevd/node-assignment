/**
 * @name middlewareIndex
 * @file index.js
 * @param {Request} req
 * @param {Response} res
 * @throwsF
 * @description This file will import all models.
 * @author Jaydev Dwivedi (Zignuts)
 */
const { User } = require('./User.js');
const { Admin } = require('./Admin.js');
const { Account } = require("./Account.js");

module.exports = {
    User,
    Admin,
    Account
};