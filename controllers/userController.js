const userModel = require('../models/userModel')

async function getAllUsers(req, res) {
    try {
        let users = await userModel.find();
        res.status(200).json({
            data: users,
        });
    } catch (err) {
        res.json({
            message: err.message,
        });
    }
}


async function signUp(req, res) {
    try {
        let body = req.body;
        let newUser = await userModel.create(body);
        res.status(200).json({
            message: "user signup sucessfully",
            newUser: newUser
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

async function deleteAll(req, res) {
    await userModel.deleteMany();
    res.json({
        message: "Users Deleted"
    })
}

module.exports = {
    signUp,
    getAllUsers,
    deleteAll
}