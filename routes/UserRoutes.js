// Import Packages
const express = require('express');

// Import Controllers
const AuthController = require('../controllers/AuthController');

// Create express router
const router = express.Router();

router.route('/register').post(AuthController.registerUser);
router.route('/login').post(AuthController.loginUser);
router.route('/logout').get(AuthController.logout);
router.route('/dashboard').get(AuthController.getDashboardPage);

module.exports = router;