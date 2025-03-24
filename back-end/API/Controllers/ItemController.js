/**
 * @name create/update/delete
 * @file ItemController.js
 * @param {Request} req
 * @param {Response} res
 * @throwsF
 * @description AdminSignUp method will create a new user, AdminLogIn method will log in an existing user and AdminLogOut method will log out the logged in user.
 * @author Jaydev Dwivedi (Zignuts)
 */
const { Admin, User, Item } = require("../Models/index");
const { v4: uuidv4 } = require('uuid');

const CreateCountry = async (req, res) => {
    try {
        const { country } = req.body;
        const id = uuidv4();

        const result = Item.create({ id: id, country: country });
        return res.status(200).json({
            status: '200',
            message: '',
            data: result.id,
            error: ''
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: '500',
            message: '',
            data: '',
            error: ''
        })
    }
}

const UpdateCountry = async (req, res) => {
    try {
        const { id, country } = req.body;

        const result = Item.update({ country: country }, { where: { id: id } });
        return res.status(200).json({
            status: '200',
            message: '',
            data: result.id,
            error: ''
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: '500',
            message: '',
            data: '',
            error: ''
        })
    }
}

const CreateCity = async (req, res) => {
    try {
        const { country, city } = req.body;
        const id = uuidv4();

        const result = Item.create({ id: id, city: city }, { where: { country: country } });
        return res.status(200).json({
            status: '200',
            message: '',
            data: result.id,
            error: ''
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: '500',
            message: '',
            data: '',
            error: ''
        })
    }
}

const UpdateCity = async (req, res) => {
    try {
        const { id, country, city } = req.body;

        const result = Item.update({ city: city }, { where: { id: id, country: country } });
        return res.status(200).json({
            status: '200',
            message: '',
            data: result.id,
            error: ''
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: '500',
            message: '',
            data: '',
            error: ''
        })
    }
}

const DeleteItem = async (req, res) => {
    try {
        const { id } = req.body;

        const result = Item.delete({ where: { id: id } });
        return res.status(200).json({
            status: '200',
            message: '',
            data: '',
            error: ''
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: '500',
            message: '',
            data: '',
            error: ''
        })
    }
}

module.exports = {
    CreateCountry,
    UpdateCountry,
    CreateCity,
    UpdateCity,
    DeleteItem
}