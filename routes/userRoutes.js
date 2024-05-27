const express = require("express");
const { getAllUsers, signUp, deleteAll, protectRoute, getUserProfile, login, isAuthorised, revokeAccess, giveAccess, checkDataAccess } = require("../controllers/userController");
const router = express.Router();
const passport = require('passport');
const downloadData = require("../controllers/nodemailerController");

router.post('/signup', signUp);
router.post('/login', login);
router.use(protectRoute)
router
.route('/userProfile')
.get(getUserProfile)

router.use(checkDataAccess)
router.get('/download', downloadData);
router.use(isAuthorised(['admin']));
router.delete('/delete', deleteAll)
router.get('/allUsers', getAllUsers);
router.post('/giveAccess', giveAccess)
router.post('/revokeAccess',revokeAccess)
module.exports = router;