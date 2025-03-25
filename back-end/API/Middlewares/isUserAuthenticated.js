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
const { User } = require('../Models/index.js');
const { HTTP_STATUS_CODES } = require('../Config/constants.js');

const isUserAuthenticated = async (req, res, next) => {

    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        // console.log(token);

        if (!token) {
            return res.status(400).json({
                status: PAGE_NOT_FOUND,
                message: '',
                data: '',
                error: 'Invalid Token'
            })
        }

        // Verify JWT
        const payload = jwt.verify(token, process.env.SECRET_KEY);

        if (!payload) {
            return res.status(400).json({
                status: HTTP_STATUS_CODES.CLIENT_ERROR,
                message: '',
                error: 'Invalid Token',
                data: ''
            })
        }

        const user = await User.findOne({
            where: { token: token, id: payload.id },
            attributes: ['name', 'email']
        });

        if (!user) {
            return res.status(400).json({
                status: '400',
                message: '',
                error: 'No user found',
                data: ''
            });
        }

        if (token !== user.token) {
            return res.status(400).json({
                status: '400',
                message: '',
                data: '',
                error: 'some error occurred'
            });
        }

        if (!user.isActive) {
            return res.status(400).json({
                status: '400',
                message: '',
                error: 'some error occurred',
                data: ''
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: '',
            data: '',
            error: error.message
            ,
        });
    }
}

module.exports = isUserAuthenticated;