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
const isAdminAuthenticated = require('../Middlewares/isAdminAuthenticated');
const router = express.Router();

router.post('/signup', AdminSignUp);
router.get('/login', AdminLogIn);

router.route('/logout')
    .all(isAdminAuthenticated)
    .post(AdminLogOut);

router.route('/ListUsers')
    .all(isAdminAuthenticated)
    .get(ListUsers);

router.route('/FilterUsers')
    .all(isAdminAuthenticated)
    .get(FilterUsers);

router.route('/SearchUsers')
    .all(isAdminAuthenticated)
    .get(SearchUsers);

module.exports = { AdminAuthRoutes: router };