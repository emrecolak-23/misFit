// Import Packages
const express = require('express');

// Import Controllers
const AuthController = require('../controllers/AuthController');

// Create express router
const router = express.Router();

router.route('/').post(AuthController.registerUser);

module.exports = router;