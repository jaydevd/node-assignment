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
        const { name, category, subcategory, description } = req.body;
        let validation = new Validator({
            id: id,
            name: name,
            category: category,
            subcategory: subcategory,
            description: description
        },
            {
                id: 'required',
                name: 'required',
                category: 'required',
                subcategory: 'required',
                description: 'max:500'
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

        const id = uuidv4();
        const account = await Account.create({
            id: id,
            name: name,
            category: category,
            subcategory: subcategory,
            description: description
        })
        return res.status(200).json({
            status: '200',
            message: "",
            data: account.id,
            error: ""
        });

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            status: '500',
            message: "",
            data: account.id,
            error: ""
        });
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

const FilterByCategory = async (req, res) => {
    try {
        const { category, subCategory } = req.params;
        const accounts = await Account.findAll({ where: { category: category, sub_category: subCategory } });

        return res.status(200).json({
            status: HTTP_STATUS_CODES.SUCCESS,
            message: "",
            data: accounts,
            error: ""
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    CreateAccount,
    ListAccounts,
    UpdateAccount,
    DeleteAccount,
    FilterByCategory
};