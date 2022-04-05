// Import Packages
const express = require('express');

// Import Controllers
const AuthController = require('../controllers/AuthController');

// Create express router
const router = express.Router();

router.route('/register').post(AuthController.registerUser);
router.route('/login').post(AuthController.loginUser);

module.exports = router;