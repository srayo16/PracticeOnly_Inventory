const Admin = require("../Models/AdminModel");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const multer = require("multer");

exports.addAdmin = async (req, res, next) => {
    try {
        console.log(req.body);
        let path = "/public/" + req.filename;
        const dataOfAdmin = new Admin({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: req.filename && path
        });
        const savingData = await dataOfAdmin.save();

        const token = jwt.sign({ id: savingData._id, email: savingData.email }, process.env.JWT_SECRET, {
            expiresIn: "24h"
        });

        return res.status(200).json({
            message: "Admin added successful!",
            result: savingData,
            token: token
        })

        // res.send("It is working");
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }

}

exports.getAllAdminData = async (req, res) => {
    try {
        const findAll = await Admin.find();

        return res.status(200).json({
            message: "Success!",
            data: findAll
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message })
    }
}

exports.getAdminById = async (req, res) => {

    try {
        const findAdmin = await Admin.findById(req.params.id);
        if (findAdmin) {
            return res.status(200).json({
                message: "Success!",
                data: findAdmin
            })
        }
        else {
            return res.status(400).json({
                message: "Not found!"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }

}

exports.getCurrentAdmin = async (req, res) => {
    try {
        console.log(req.user)
        const findByAuth = await Admin.findById(req.user.id);
        console.log(findByAuth);
        if (findByAuth) {
            return res.status(200).json({
                message: "Success!",
                data: findByAuth
            })
        }
        else {
            return res.status(400).json({
                message: "Not found!"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
}

exports.deleteAllAdminData = async (req, res) => {
    try {
        if (req.user) {
            const deleting = await Admin.remove();
            if (deleting) {
                return res.status(200).json({ message: "Deleted", data: deleting })
            }
            else {
                return res.status(400).json({ message: "something is wrong!" })
            }
        }
        else {
            return res.status(400).json({
                message: "Not Authorized!"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
}

exports.deleteAdminById = async (req, res) => {
    try {
        if (req.user) {
            const findWho = await Admin.findById(req.params.id);
            const deleting = await Admin.findByIdAndRemove(req.params.id);
            if (deleting) {
                return res.status(200).json({
                    message: `Deleted ${deleting.name}`,
                    data: deleting,
                })
            }
            else {
                return res.status(400).json({ message: "Something is wrong while deleting!" })
            }
        }
        else {
            return res.status(400).json({
                message: "Not Authorized!"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

exports.findSpecific = async (req, res) => {
    try {
        console.log(req.query)
        const finding = await Admin.find({ email: req.query.email });
        if (finding) {
            return res.status(200).json({
                message: "success!",
                data: finding
            })
        }
        else {
            return res.status(400).json({ message: "Not FOund!" })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
}

exports.findSpecificTwo = async (req, res) => {
    try {
        const finding = await Admin.find({ email: req.params.email });
        if (finding) {
            return res.status(200).json({
                message: "success!",
                data: finding
            })
        }
        else {
            return res.status(400).json({ message: "Not FOund!" })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
}

exports.updateById = async (req, res) => {
    try {
        // console.log(req.body)
        let path = "/public/" + req.filename;
        console.log("path", path)
        const findWho = Admin.findById(req.params.id);
        const updating = await findWho.updateOne({
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                image: req.filename && path
            }
        });

        if (updating) {
            return res.status(200).json({
                message: "Updated!",
                data: updating
            })
        }
        else {
            return res.status(400).json({
                message: "Failed"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
}
