/**
 * @name routesIndex
 * @file index.js
 * @throwsF
 * @description This file will import all routes.
 * @author Jaydev Dwivedi (Zignuts)
 */

const { UserAuthRoutes } = require('./UserAuthRoutes.js');
const { AdminAuthRoutes } = require('./AdminAuthRoutes.js');

module.exports = {
    UserAuthRoutes,
    AdminAuthRoutes
}