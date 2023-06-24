const express = require("express");
const { getAllUsers, signUp, deleteAll, protectRoute, getUserProfile, login } = require("../controllers/userController");
const router = express.Router();


router.get('/allUsers', getAllUsers);
router.post('/signup', signUp);
router.post('/login', login);
router.delete('/delete', deleteAll)
router.use(protectRoute)
router
    .route('/userProfile')
    .get(getUserProfile)
module.exports = router;