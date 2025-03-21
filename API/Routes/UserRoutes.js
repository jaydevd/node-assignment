/**
 * @name UserRoutes
 * @file UserRoutes.js
 * @param {Request} req
 * @param {Response} res
 * @throwsF
 * @description This method will manage user routes.
 * @author Jaydev Dwivedi (Zignuts)
 */

const express = require("express");
const { UserLogIn, UserLogOut, UserSignUp } = require('./../Controllers/UserAuthController');
const { editProfile } = require('./../Controllers/UserController');
const { isAuthenticated } = require("./../Middlewares/isAuthenticated");
const router = express.Router();

router.route('/user/edit_profile')
    .post(isAuthenticated, editProfile);

module.exports = { UserRoutes: router };