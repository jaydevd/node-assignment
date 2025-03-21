/**
 * @name signup/login/logout
 * @file AuthController.js
 * @param {Request} req
 * @param {Response} res
 * @throwsF
 * @description UserSignUp method will create a new user, UserLogIn method will log in an existing user and UserLogOut method will log out the logged in user.
 * @author Jaydev Dwivedi (Zignuts)
 */

const { v4: uuidv4 } = require('uuid');
const Validator = require("validatorjs");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('./../Models/index');

const AdminSignUp = async (req, res) => {

    try {
        const { name, email, gender, password } = req.body;

        let validation = new Validator({
            name: name,
            email: email,
            gender: gender,
            password: password
        },
            {
                name: 'required',
                email: 'required',
                gender: 'required',
                password: 'required'
            }
        )

        if (validation.fails()) {
            return res.status(400).json({
                status: PAGE_NOT_FOUND,
                data: '',
                message: 'Invalid Values',
                error: validation.errors.all()
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = await uuidv4();

        const result = await User.create({
            id: userId,
            name: name,
            email: email,
            password: hashedPassword,
            createdBy: userId,
            isActive: true,
            isDeleted: false
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

const AdminLogIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(email, password);

        const user = await User.findOne({
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
        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email
        }, process.env.SECRET_KEY, { expiresIn: '1h' });

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

const AdminLogOut = async (req, res) => {
    try {

        if (!token) {
            res.json({
                status: '400',
                message: 'No token found',
                data: '',
                error: ''
            })
        }

        const user = await User.findOne({
            where: { token: token },
            attributes: ['id', 'name', 'email', 'token']
        });

        if ((token !== user.token)) {
            return res.json({
                status: '400',
                message: 'No user found',
                data: '',
                error: ''
            })
        }
        await User.update({ token: null }, { where: { id: user.id } });

        return res.json({
            status: '200',
            message: 'Logged out successfully',
            data: '',
            error: ''
        })

    } catch (error) {
        console.log("Something went wrong", error);

        return res.status(500).json({
            status: INTERNAL_SERVER_ERROR,
            message: '',
            data: '',
            error: error.message()
        })
    }
}

module.exports = {
    AdminLogIn,
    AdminSignUp,
    AdminLogOut
};
