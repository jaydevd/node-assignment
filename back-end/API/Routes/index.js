/**
 * @name routesIndex
 * @file index.js
 * @throwsF
 * @description This file will import all routes.
 * @author Jaydev Dwivedi (Zignuts)
 */
const { UserAuthRoutes } = require('../Routes/UserAuthRoutes.js');
const { AdminAuthRoutes } = require('../Routes/AdminAuthRoutes.js');

module.exports = {
    UserAuthRoutes,
    AdminAuthRoutes
}