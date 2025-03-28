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
const { AddCountry, DeleteCountry, AddCity, DeleteCity } = require("./../Controllers/CountryController");
const { AddCategory, DeleteCategory, AddSubCategory, DeleteSubCategory, GetCategories } = require("./../Controllers/CategoryController");
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

router.route('/GetCountries')
    .all(isAdminAuthenticated)
    .get(GetCountries);

router.route('/GetCategories')
    .all(isAdminAuthenticated)
    .get(GetCategories);

router.route('/EditUser')
    .all(isAdminAuthenticated)
    .post(EditUser);

router.route('/DeleteUser')
    .all(isAdminAuthenticated)
    .post(DeleteUser);

router.route('/AddCountry')
    .all(isAdminAuthenticated)
    .post(AddCountry);

router.route('/DeleteCountry')
    .all(isAdminAuthenticated)
    .post(DeleteCountry);

router.route('/AddCity')
    .all(isAdminAuthenticated)
    .post(AddCity);

router.route('/DeleteCity')
    .all(isAdminAuthenticated)
    .post(DeleteCity);

router.route('/AddCategory')
    .all(isAdminAuthenticated)
    .post(AddCategory);

router.route('/DeleteCategory')
    .all(isAdminAuthenticated)
    .post(DeleteCategory);

router.route('/AddSubCategory')
    .all(isAdminAuthenticated)
    .post(AddSubCategory);

router.route('/DeleteSubCategory')
    .all(isAdminAuthenticated)
    .post(DeleteSubCategory);

module.exports = { AdminAuthRoutes: router };