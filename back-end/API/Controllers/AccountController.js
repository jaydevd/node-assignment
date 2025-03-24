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
const { User, Account, Item } = require('../Models/index');
const { HTTP_STATUS_CODES } = require('../Config/constants');

const CreateAccount = async (req, res) => {
    try {
        const { id, name, category, subCategory, description } = req.body;
        let validation = new Validator({
            id: id,
            name: name,
            category: category,
            subCategory: subCategory,
            description: description
        },
            {
                id: 'required',
                name: 'required',
                category: 'required',
                subCategory: 'required',
                description: 'max:500'
            }
        )

        if (validation.fails()) {
            return res.status(400).json({
                status: HTTP_STATUS_CODES.CLIENT_ERROR,
                data: '',
                message: 'Invalid Credentials',
                error: validation.errors.all()
            })
        }

        const accountID = uuidv4();
        const account = await Account.create({
            id: accountID,
            name: name,
            category: category,
            sub_category: subCategory,
            description: description,
            created_by: id,
            created_at: Math.floor(Date.now() / 1000),
            is_active: true,
            is_deleted: false
        });

        return res.status(200).json({
            status: '200',
            message: "",
            data: account.id,
            error: ""
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: '500',
            message: "",
            data: '',
            error: ""
        });
    }
}

const ListAccounts = async (req, res) => {
    try {
        const { id } = req.body;
        const accountIDs = await User.findOne({ attributes: ['accounts'] }, { where: { id: id } });

        if (!accountIDs) {
            return res.status(400).json({
                status: HTTP_STATUS_CODES.CLIENT_ERROR,
                message: '',
                data: '',
                error: ''
            });
        }

        const accounts = await Account.findAll({ attributes: ['name', 'category', 'sub_category'] }, { where: { id: [accountIDs] } })
        if (!accounts) {
            return res.status(400).json({
                status: HTTP_STATUS_CODES.CLIENT_ERROR,
                message: '',
                data: '',
                error: ''
            })
        }

        return res.status(200).json({
            status: HTTP_STATUS_CODES.SUCCESS,
            message: '',
            data: accounts,
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

const UpdateAccount = async (req, res) => {
    try {

        const { id, name, category, subCategory } = req.body;
        const result = await Account.update({
            name: name,
            category: category,
            sub_category: subCategory,
            updated_at: Math.floor(Date.now() / 1000),
            updated_by: id
        }, { where: { id: id } });

        return res.status(200).json({
            status: HTTP_STATUS_CODES.SUCCESS,
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
        const result = await Account.update({ is_active: false, is_deleted: true }, { where: { id: id } });

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
            data: '',
            error: error.message()
        })
    }
}

const FilterAccounts = async (req, res) => {

    try {
        const { category, subCategory } = req.params;
        const accounts = await Account.findAll({ where: { category: category, sub_category: subCategory || { [Op.like]: `%%` } } });

        return res.status(200).json({
            status: HTTP_STATUS_CODES.SUCCESS,
            message: "",
            data: accounts,
            error: ""
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

module.exports = {
    CreateAccount,
    ListAccounts,
    UpdateAccount,
    DeleteAccount,
    FilterAccounts
};