const Admin = require("../Models/AdminModel");
const jwt = require("jsonwebtoken");
const axios = require("axios");

exports.addAdmin = async (req, res, next) => {
    try {
        console.log(req.body);

        const dataOfAdmin = new Admin({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        const savingData = await dataOfAdmin.save();

        const token = jwt.sign({ id: savingData._id, email: savingData.email }, process.env.JWT_SECRET, {
            expiresIn: "24h"
        });

        res.status(200).json({
            message: "Admin added successful!",
            result: savingData,
            token: token
        })

        // res.send("It is working");
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }

}

exports.getAllAdminData = async (req, res) => {
    try {
        const findAll = await Admin.find();

        res.status(200).json({
            message: "Success!",
            data: findAll
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message })
    }
}

