/**
 * @name userAuthentication
 * @file isAuthenticated.js
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 * @throwsF
 * @description This file will import all middlewares.
 * @author Jaydev Dwivedi (Zignuts)
 */

const jwt = require('jsonwebtoken');
const { Admin } = require('../Models/index.js');
const { HTTP_STATUS_CODES } = require('../Config/constants.js');

const isAdminAuthenticated = async (req, res, next) => {

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("token from isAdminAuthenticated: ", token);

    if (!token) {
      return res.status(400).json({
        status: HTTP_STATUS_CODES.CLIENT_ERROR,
        message: '',
        data: '',
        error: 'Invalid Token'
      })
    }

    // Verify JWT
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    console.log("payload: ", payload);

    if (!payload) {
      console.log("payload not found");
      return res.status(400).json({
        status: HTTP_STATUS_CODES.CLIENT_ERROR,
        message: '',
        error: 'Invalid Token',
        data: ''
      })
    }

    const admin = await Admin.findOne({
      where: { id: payload.id },
      attributes: ['id', 'name', 'email', 'token', 'is_active']
    });

    if (!admin.id) {
      return res.status(400).json({
        status: '400',
        message: '',
        error: 'Authentication: No user found',
        data: ''
      });
    }

    if (token !== admin.token) {
      return res.status(400).json({
        status: '400',
        message: '',
        data: '',
        error: "Tokens don't match"
      });
    }

    if (!admin.is_active) {
      return res.status(400).json({
        status: '400',
        message: '',
        error: 'Admin is not active',
        data: ''
      });
    }
    req.body.admin = admin;
    console.log("admin authenticated");

    next();

  } catch (error) {

    console.log(error);
    return res.status(500).json({
      status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: '',
      data: '',
      error: error.message
    });
  }
}

module.exports = isAdminAuthenticated;