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
const { Account } = require('./../Models/index');

const editProfile = async (req, res) => {

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

        const userId = await uuidv4();
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

const createAccount = async (req, res) => {
    try {
        const { id, name, category, subcategory } = req.body;
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
        const user = await Account.findOne({
            where: { email: email },
            attributes: ['id', 'name', 'email', 'password']
        });

        if (!user) {
            return res.status(400).json({
                status: PAGE_NOT_FOUND,
                message: "User Not Found",
                data: "",
                error: ""
            });

        }
        // console.log("User: ", user.password);

        const isMatch = await bcrypt.compare(password, user.password);

        // console.log('Comparison completed: ', isMatch);

        if (!isMatch) {
            return res.status(400).json({
                status: PAGE_NOT_FOUND,
                message: "Invalid Credentials",
                data: "",
                error: "Password doesn't match"
            })
        }

        // console.log("Password matched");
        const secretKey = process.env.SECRET_KEY;

        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email
        }, secretKey, { expiresIn: '1h' });

        // console.log("token:", token);

        await User.update(
            { token: token },
            {
                where: {
                    id: user.id,
                },
            },
        );
        // console.log(result);

        return res.status(200).json({
            status: HTTP_STATUS_CODES.SUCCESS,
            data: token,
            message: '',
            error: ''
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    editProfile,
    createAccount
};