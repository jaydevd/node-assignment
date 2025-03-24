/**
 * @name AuthRoutes
 * @file AuthRoutes.js
 * @param {Request} req
 * @param {Response} res
 * @throwsF
 * @description This method will manage user authentication routes.
 * @author Jaydev Dwivedi (Zignuts)
 */

const express = require("express");
const { AdminLogIn, AdminLogOut, AdminSignUp, ListUsers, FilterUsers, SearchUsers } = require('../Controllers/bootstrap');
const isAuthenticated = require('./../Middlewares/isAuthenticated');
const router = express.Router();

router.post('/admin/signup', AdminSignUp);
router.get('/admin/login', AdminLogIn);

router.route('/admin/logout')
    .all(isAuthenticated)
    .post(AdminLogOut);

router.route('/admin/ListUsers')
    .all(isAuthenticated)
    .get(ListUsers);

router.route('/admin/FilterUsers')
    .all(isAuthenticated)
    .get(FilterUsers);

router.route('/admin/SearchUsers')
    .all(isAuthenticated)
    .get(SearchUsers);

module.exports = { AdminAuthRoutes: router };