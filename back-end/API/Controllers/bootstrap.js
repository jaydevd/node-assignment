/**
 * @name signup/login/logout
 * @file bootstrap.js
 * @param {Request} req
 * @param {Response} res
 * @throwsF
 * @description AdminSignUp method will create a new user, AdminLogIn method will log in an existing user and AdminLogOut method will log out the logged in user.
 * @author Jaydev Dwivedi (Zignuts)
 */
const { Admin, User, CountriesCities, Categories } = require("./../Models/index");
const { v4: uuidv4 } = require('uuid');
const Validator = require('validatorjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { HTTP_STATUS_CODES } = require('./../Config/constants');
const { Sequelize, Op } = require('sequelize');

const AdminSignUp = async (req, res) => {

    try {
        // console.log("API Called!");
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
                status: HTTP_STATUS_CODES.CLIENT_ERROR,
                data: '',
                message: 'Invalid Values',
                error: validation.errors.all()
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const id = uuidv4();

        const result = await Admin.create({
            id: id,
            name: name,
            email: email,
            gender: gender,
            password: hashedPassword,
            created_by: id,
            created_at: Math.floor(Date.now() / 1000),
            is_active: true,
            is_deleted: false
        });

        return res.status(200).json({
            status: HTTP_STATUS_CODES.SUCCESS,
            data: result.id,
            message: 'Data Created Successfully',
            error: ''
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
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

        const admin = await Admin.findOne({
            where: { email: email },
            attributes: ['id', 'name', 'email', 'password']
        });

        if (!admin) {
            return res.status(400).json({
                status: HTTP_STATUS_CODES.CLIENT_ERROR,
                message: "Admin Not Found",
                data: "",
                error: ""
            });
        }
        // console.log("User: ", user.password);
        const isMatch = await bcrypt.compare(password, admin.password);

        // console.log('Comparison completed: ', isMatch);
        if (!isMatch) {
            return res.status(400).json({
                status: HTTP_STATUS_CODES.CLIENT_ERROR,
                message: "Invalid Credentials",
                data: "",
                error: "Password doesn't match"
            })
        }

        // console.log("Password matched");
        const token = jwt.sign({
            id: admin.id,
        }, process.env.SECRET_KEY, { expiresIn: '1h' });

        // console.log("token:", token);

        await Admin.update(
            { token: token },
            {
                where: {
                    id: admin.id,
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
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            data: '',
            message: '',
            error: error.message
        });
    }
}

const AdminLogOut = async (req, res) => {
    try {
        console.log("Log Out API");
        const reqAdmin = req.body.admin;
        const token = reqAdmin.token;
        console.log("log out admin: ", reqAdmin);
        console.log("log out token: ", token);

        if (!token) {
            res.status(400).json({
                status: HTTP_STATUS_CODES.CLIENT_ERROR,
                message: 'No token found',
                data: '',
                error: ''
            })
        }

        const admin = await Admin.findOne({
            where: { token: token },
            attributes: ['id', 'token']
        });

        if ((token !== admin.token)) {
            return res.status(400).json({
                status: HTTP_STATUS_CODES.CLIENT_ERROR,
                message: 'No user found',
                data: '',
                error: ''
            })
        }
        await Admin.update({ token: null }, { where: { id: admin.id } });

        return res.status(200).json({
            status: HTTP_STATUS_CODES.SUCCESS,
            message: 'Logged out successfully',
            data: '',
            error: ''
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: '',
            data: '',
            error: error.message
        })
    }
}

const ListUsers = async (req, res) => {
    try {
        const { page } = req.query;
        const limit = 20;
        const skip = (page - 1) * limit;
        // console.log(skip);

        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'country', 'city', 'gender', 'age', 'company']
        }, { offset: skip, limit: limit });

        if (!users) {
            return res.status(400).json({
                status: HTTP_STATUS_CODES.CLIENT_ERROR,
                message: 'No users found',
                data: '',
                error: ''
            });
        }
        // console.log(users);
        return res.status(200).json({
            status: '200',
            message: '',
            data: users,
            error: ''
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: '',
            data: '',
            error: error.message()
        })
    }
}

const SearchUsers = async (req, res) => {
    try {
        let query = req.query["query"];
        console.log(query);
        query = query.toLowerCase();

        const users = await User.findAll({
            where: {
                [Op.or]: [{ name: { [Op.iLike]: `%${query}%` } }, { email: { [Op.iLike]: `%${query}%` } }]
            },
            attributes: ['id', 'name', 'email', 'age', 'gender', 'country', 'city', 'company']
        });

        return res.status(200).json({
            status: HTTP_STATUS_CODES.SUCCESS,
            message: '',
            data: users,
            error: ''
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: '',
            data: '',
            error: error.message
        })
    }
}

const GetCountries = async (req, res) => {
    try {
        // console.log("get coutries backend");
        const countries = await CountriesCities.findAll({
            attributes: ['country', 'city']
        });

        // console.log(countries);
        return res.status(200).json({
            status: HTTP_STATUS_CODES.SUCCESS,
            message: '',
            data: countries,
            error: ''
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: '',
            data: '',
            error: error.message
        })
    }
}

const EditUser = async (req, res) => {
    try {
        const { id, name, country, city, gender, age, company } = req.body;

        let validation = new Validator({
            id: id,
            name: name,
            gender: gender,
            country: country,
            city: city,
            gender: gender,
            age: age,
            company: company
        },
            {
                id: 'required',
                name: 'required',
                gender: 'required',
                country: 'required',
                city: 'required',
                gender: 'required',
                age: 'required',
                company: 'max:64'
            }
        )

        if (validation.fails()) {
            return res.status(400).json({
                status: HTTP_STATUS_CODES.CLIENT_ERROR,
                message: '',
                data: '',
                error: ''
            })
        }
        const result = await User.update({
            name: name,
            country: country,
            city: city,
            gender: gender,
            age: age,
            company: company || null
        }, {
            where: { id: id }
        })
        return res.status(200).json({
            status: HTTP_STATUS_CODES.SUCCESS,
            message: '',
            data: result,
            error: ''
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: '',
            data: '',
            error: error.message
        })
    }
}

const DeleteUser = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                status: HTTP_STATUS_CODES.CLIENT_ERROR,
                message: '',
                data: '',
                error: ''
            })
        }
        const result = await User.destroy({ where: { id: id } });

        return res.status(200).json({
            status: HTTP_STATUS_CODES.SUCCESS,
            message: '',
            data: '',
            error: ''
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: '',
            data: '',
            error: error.message
        })
    }
}
module.exports = {
    AdminLogIn,
    AdminSignUp,
    AdminLogOut,
    SearchUsers,
    ListUsers,
    GetCountries,
    EditUser,
    DeleteUser
};