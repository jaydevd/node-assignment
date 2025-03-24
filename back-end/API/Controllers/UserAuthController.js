/**
 * @name signup/login/logout
 * @file UserAuthController.js
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
const { User } = require('../Models/index');

const UserSignUp = async (req, res) => {

    try {
        const { name, email, password, age, gender, country, city, company } = req.body;

        let validation = new Validator({
            name: name,
            email: email,
            password: password,
            age: age,
            gender: gender,
            country: country,
            city: city,
            company: company
        },
            {
                name: ['required', 'max:30'],
                email: 'required',
                password: 'required',
                age: 'required',
                gender: 'required',
                country: 'required',
                city: 'required',
                company: 'max:64'
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

        const hashedPassword = await bcrypt.hash(password, 10);
        const id = uuidv4();

        const result = await User.create({
            id: id,
            name: name,
            email: email,
            password: hashedPassword,
            isActive: true,
            isDeleted: false,
            createdAt: Math.floor(Date.now() / 1000),
            createdBy: id
        });

        return res.status(200).json({
            status: '200',
            data: result.id,
            message: 'Data Created Successfully',
            error: ''
        });

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

const UserLogIn = async (req, res) => {
    try {
        const { email, password } = req.body;

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
        return res.status(500).json({
            status: INTERNAL_SERVER_ERROR,
            data: token,
            message: '',
            error: ''
        });
    }
}

const UserLogOut = async (req, res) => {
    try {
        const { token } = req.body;

        const user = await User.findOne({
            where: { token: token },
            attributes: ['id', 'token']
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
        console.log(error);

        return res.status(500).json({
            status: INTERNAL_SERVER_ERROR,
            message: '',
            data: '',
            error: error.message()
        })
    }
}

const EditProfile = async (req, res) => {

    try {
        const { id, name, gender, country, city } = req.body;

        let validation = new Validator({
            id: id,
            name: name,
            gender: gender,
            country: country,
            city: city
        },
            {
                id: 'required',
                name: 'required',
                gender: 'required',
                country: 'required',
                city: 'required'
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
        const result = await User.update({
            name: name,
            gender: gender,
            country: country,
            city: city
        }, { where: { id: userId } });

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

const ListAccounts = async (req, res) => {
    try {
        const { id } = req.body;
        const accounts = await Account.findAll({ attributes: ['name', 'category', 'subcategory'] }, { where: { user_id: id } });

        if (!accounts) {
            return res.status(400).json({
                status: '400',
                message: "",
                data: '',
                error: ""
            })
        }
        return res.status(200).json({
            status: '200',
            message: "",
            data: accounts,
            error: ""
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: INTERNAL_SERVER_ERROR,
            message: "",
            data: account.id,
            error: ""
        });
    }
}

const UpdateAccount = async (req, res) => {
    try {
        const { id, name, category, subcategory } = req.body;
        const result = await Account.update({ name: name, category: category, subcategory: subcategory }, { where: { id: id } });
        return res.status(200).json({
            status: '200',
            message: "",
            data: result.id,
            error: ""
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: INTERNAL_SERVER_ERROR,
            message: "",
            data: account.id,
            error: ""
        })
    }
}

const DeleteAccount = async (req, res) => {
    try {
        const { id } = req.body;
        const result = await Account.delete({ where: { id: id } });
        return res.status(200).json({
            status: '200',
            message: "",
            data: '',
            error: ""
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: INTERNAL_SERVER_ERROR,
            message: "",
            data: account.id,
            error: ""
        })
    }
}

module.exports = {
    UserLogIn,
    UserLogOut,
    UserSignUp,
    EditProfile,
    CreateAccount,
    ListAccounts,
    UpdateAccount,
    DeleteAccount
};