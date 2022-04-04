// Import Packages
const express = require('express');

// Import Controller
const PageController = require('../controllers/PageController');

// Declare router
const router = express.Router();

// Home Page
router.route('/').get(PageController.getHomePage);

// About Page
router.route('/about').get(PageController.getAboutPage);

// Services Page
router.route('/service').get(PageController.getServicePage);

// Trainer Page
router.route('/trainer').get(PageController.getTrainerPage);

// Gallery Page
router.route('/gallery').get(PageController.getGalleryPage);

// Contact page
router.route('/contact').get(PageController.getContactPage);

module.exports = router