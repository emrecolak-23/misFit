// Import Packages
const express = require('express');
const multer = require('multer');
// Import Controllers
const AboutController = require('../controllers/AboutController');

// Multer Middlewares
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + '/../uploads/about');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
});
let upload = multer({
  storage: storage,
}).single('image');

// Create express router
const router = express.Router();

router.route('/').post(upload,AboutController.createAbout);

router.route('/:id').put(AboutController.updateAboutInfo);


module.exports = router