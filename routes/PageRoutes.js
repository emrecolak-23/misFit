// Import Packages
const express = require('express');

// Import Controller
const PageController = require('../controllers/PageController');

// Declare router
const router = express.Router();

// Home Page
router.route('/').get(PageController.getHomePage);

module.exports = router