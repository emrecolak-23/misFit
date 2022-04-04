// Import Packages
const express = require('express');

// Import Controller
const CategoryController = require('../controllers/CategoryController');

// Declare router
const router = express.Router();

router.route('/').post(CategoryController.createCategory);

module.exports = router