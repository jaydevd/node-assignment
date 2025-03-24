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
const { AdminLogIn, AdminLogOut, AdminSignUp } = require('../Controllers/UserAuthController');

const router = express.Router();

router.post('/admin/signup', AdminSignUp);
router.get('/admin/login', AdminLogIn);
router.route('/admin/logout')
    .post(isAuthenticated, AdminLogOut);

module.exports = { AdminAuthRoutes: router };