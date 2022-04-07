// Import Packages
const express = require('express');

// Import Controller
const CategoryController = require('../controllers/CategoryController');

// Declare router
const router = express.Router();

router.route('/').post(CategoryController.createCategory)
                 .get(CategoryController.getAllCategories);

router.route('/:id').delete(CategoryController.deleteCategory);

module.exports = router