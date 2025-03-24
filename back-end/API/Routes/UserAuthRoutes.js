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
const isAuthenticated = require("./../Middlewares/isAuthenticated");
const router = express.Router();

router.post('/user/signup', UserSignUp);
router.get('/user/login', UserLogIn);

router.route('/user/logout')
    .all(isAuthenticated)
    .post(UserLogOut);

router.route('/user/EditProfile')
    .all(isAuthenticated)
    .post(EditProfile);

router.route('/user/ListAccounts')
    .all(isAuthenticated)
    .get(ListAccounts);

router.route('/user/CreateAccount')
    .all(isAuthenticated)
    .post(CreateAccount);

router.route('/user/UpdateAccount')
    .all(isAuthenticated)
    .post(UpdateAccount);

router.route('/user/DeleteAccount')
    .all(isAuthenticated)
    .get(DeleteAccount);

router.route('/user/SearchAccount')
    .all(isAuthenticated)
    .get(SearchAccount);

router.route('/user/FilterAccounts')
    .all(isAuthenticated)
    .get(FilterAccounts);

module.exports = { UserAuthRoutes: router };