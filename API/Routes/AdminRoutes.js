/**
* @name AuthRoutes
* @file AdminRoutes.js
* @param {Response} res
* @throwsF
* @description This method will manage all admin routes.
* @author Jaydev Dwivedi (Zignuts)
*/

const express = require("express");
const { getAllUsers } = require('./../Controllers/bootstrap.js');
const { isAuthenticated } = require('./../Middlewares/isAuthenticated.js');
const router = express.Router();

router.route('/admin/getAllUsers')
    .get(isAuthenticated, getAllUsers);

module.exports = { AdminRoutes: router };