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
const { UserLogIn, UserLogOut, UserSignUp } = require('./../Controllers/UserAuthController');
const { editProfile } = require('./../Controllers/UserController');
const { isAuthenticated } = require("./../Middlewares/isAuthenticated");
const router = express.Router();

router.post('/user/signup', UserSignUp);
router.get('/user/login', UserLogIn);
router.route('/user/logout')
    .post(isAuthenticated, UserLogOut);


module.exports = { UserAuthRoutes: router };