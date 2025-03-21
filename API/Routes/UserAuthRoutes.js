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

const router = express.Router();

router.post('/user/signup', UserSignUp);
router.get('/user/login', UserLogIn);
router.post('/user/logout', UserLogOut);

module.exports = { UserAuthRoutes: router };