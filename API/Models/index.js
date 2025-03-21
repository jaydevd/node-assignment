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

module.exports = {
    User
};
