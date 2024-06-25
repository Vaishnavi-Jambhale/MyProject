const express = require('express');
const { registerUser, login, getAllUsers } = require('../controller/auth'); 
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(login)
router.route('/userdata').get(getAllUsers)
module.exports = router;
