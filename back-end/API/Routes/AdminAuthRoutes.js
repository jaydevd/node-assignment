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
const { AdminLogIn, AdminLogOut, AdminSignUp, ListUsers, SearchUsers, GetCountries, EditUser, DeleteUser } = require('../Controllers/bootstrap');
const { AddCountryCity, DeleteCountryCity, GetCountriesCities } = require("./../Controllers/CountryController");
const { AddCatSubCats, DeleteCatSubCats, GetCatSubCats } = require("./../Controllers/CategoryController");
const isAdminAuthenticated = require('../Middlewares/isAdminAuthenticated');
const router = express.Router();

router.post('/signup', AdminSignUp);
router.post('/login', AdminLogIn);

router.route('/logout')
    .all(isAdminAuthenticated)
    .post(AdminLogOut);

router.route('/ListUsers')
    .all(isAdminAuthenticated)
    .get(ListUsers);

router.route('/SearchUsers')
    .all(isAdminAuthenticated)
    .get(SearchUsers);

router.route('/EditUser')
    .all(isAdminAuthenticated)
    .post(EditUser);

router.route('/DeleteUser')
    .all(isAdminAuthenticated)
    .post(DeleteUser);

router.route('/AddCountryCity')
    .all(isAdminAuthenticated)
    .post(AddCountryCity);

router.route('/DeleteCountryCity')
    .all(isAdminAuthenticated)
    .post(DeleteCountryCity);

router.route('/GetCountriesCities')
    .get(GetCountriesCities);

router.route('/GetCategories')
    .get(GetCatSubCats);

router.route('/AddCatSubCats')
    .all(isAdminAuthenticated)
    .post(AddCatSubCats);

router.route('/DeleteCatSubCats')
    .all(isAdminAuthenticated)
    .post(DeleteCatSubCats);

module.exports = { AdminAuthRoutes: router };