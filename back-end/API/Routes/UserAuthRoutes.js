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

router.post('/user/signup', UserSignUp);
router.get('/user/login', UserLogIn);

router.route('/user/logout')
    .all(isUserAuthenticated)
    .post(UserLogOut);

router.route('/user/EditProfile')
    .all(isUserAuthenticated)
    .post(EditProfile);

router.route('/user/ListAccounts')
    .all(isUserAuthenticated)
    .get(ListAccounts);

router.route('/user/CreateAccount')
    .all(isUserAuthenticated)
    .post(CreateAccount);

router.route('/user/UpdateAccount')
    .all(isUserAuthenticated)
    .post(UpdateAccount);

router.route('/user/DeleteAccount')
    .all(isUserAuthenticated)
    .get(DeleteAccount);

router.route('/user/SearchAccount')
    .all(isUserAuthenticated)
    .get(SearchAccount);

router.route('/user/FilterAccounts')
    .all(isUserAuthenticated)
    .get(FilterAccounts);

module.exports = { UserAuthRoutes: router };