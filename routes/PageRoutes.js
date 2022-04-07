// Import Packages
const express = require('express');

// Import Controller
const PageController = require('../controllers/PageController');

// Import Middlewares
const RedirectMiddlewares = require('../middlewares/redirectMiddlewares');

// Declare router
const router = express.Router();

// Home Page
router.route('/').get(PageController.getHomePage);

// About Page
router.route('/about').get(PageController.getAboutPage);

// Trainer Page
router.route('/trainer').get(PageController.getTrainerPage);
router.route('/trainer/:id').get(PageController.getSingleTrainer);
// Gallery Page
router.route('/gallery').get(PageController.getGalleryPage);

// Contact page
router.route('/contact').get(PageController.getContactPage)
                        .post(PageController.sendEmail);

// Login page
router.route('/login').get(RedirectMiddlewares,PageController.getLoginPage);

// Register page
router.route('/register').get(RedirectMiddlewares,PageController.getRegisterPage);

module.exports = router