/**
 * @name Constants
 * @file constants.js
 * @throwsF
 * @description This file will contain all constants used across the API.
 * @author Jaydev Dwivedi (Zignuts)
 */

module.exports = {
    // all constants goes here.
    DB_DIALECT: "postgres",
    HTTP_STATUS_CODES: {

        INTERNAL_SERVER_ERROR: 500,
        CLIENT_ERROR: 400,
        REDIRECTION_ERROR: 300,
        SUCCESS: 200
    }
}