const express = require('express');
const router = express.Router();
const authController = require('../controller/authController')

// Define routes and map them to controller functions
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;