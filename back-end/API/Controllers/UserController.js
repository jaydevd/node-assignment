/**
 * @name signup/login/logout
 * @file UserController.js
 * @param {Request} req
 * @param {Response} res
 * @throwsF
 * @description editProfile will be used to edit profile of users
 * @author Jaydev Dwivedi (Zignuts)
 */

const { v4: uuidv4 } = require('uuid');
const Validator = require("validatorjs");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Account } = require('../Models/Account');

const EditProfile = async (req, res) => {

    try {
        const { id: id, name: name, gender: gender, country: country, city: city } = req.body;

        let validation = new Validator({
            id: id,
            name: name,
            gender: gender,
            country: country,
            city: city
        },
            {
                id: 'required'
            }
        )

        if (validation.fails()) {
            return res.status(400).json({
                status: PAGE_NOT_FOUND,
                data: '',
                message: 'Invalid Credentials',
                error: validation.errors.all()
            })
        }

        const userId = uuidv4();
        const result = await User.update({ where: { id: userId } }, {
            name: name,
            gender: gender,
            country: country,
            city: city
        });

        return res.status(200).json({
            status: '200',
            data: result.id,
            message: 'Data Created Successfully',
            error: ''
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: 500,
            data: '',
            message: '',
            error: error.message()
        })
    }
}

module.exports = {
    EditProfile
};