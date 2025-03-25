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
const { UserLogIn, UserLogOut, UserSignUp, EditProfile, SearchAccount } = require('./../Controllers/UserAuthController');
const { CreateAccount, UpdateAccount, DeleteAccount, ListAccounts, FilterAccounts } = require('./../Controllers/AccountController');
const isUserAuthenticated = require("../Middlewares/isUserAuthenticated");
const router = express.Router();

router.post('/signup', UserSignUp);
router.post('/login', UserLogIn);

router.route('/logout')
    .all(isUserAuthenticated)
    .post(UserLogOut);

router.route('/EditProfile')
    .all(isUserAuthenticated)
    .post(EditProfile);

router.route('/ListAccounts')
    .all(isUserAuthenticated)
    .get(ListAccounts);

router.route('/CreateAccount')
    .all(isUserAuthenticated)
    .post(CreateAccount);

router.route('/UpdateAccount')
    .all(isUserAuthenticated)
    .post(UpdateAccount);

router.route('/DeleteAccount')
    .all(isUserAuthenticated)
    .get(DeleteAccount);

router.route('/SearchAccount')
    .all(isUserAuthenticated)
    .get(SearchAccount);

router.route('/FilterAccounts')
    .all(isUserAuthenticated)
    .get(FilterAccounts);

module.exports = { UserAuthRoutes: router };