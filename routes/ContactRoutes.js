// Import Packages
const express = require('express');

// Import Controller
const ContactController = require('../controllers/ContactController');

// Create router 
const router = express.Router();

router.route('/').post(ContactController.createContact);

router.route('/:id').put(ContactController.updateContact);

module.exports = router;
