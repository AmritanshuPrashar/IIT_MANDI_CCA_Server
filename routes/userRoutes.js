const express = require("express");
const { getAllUsers, signUp, deleteAll } = require("../controllers/userController");
const router = express.Router();


router.get('/allUsers', getAllUsers);
router.post('/signup', signUp);
// router.post('/login', login);
router.delete('/delete', deleteAll)

module.exports = router;