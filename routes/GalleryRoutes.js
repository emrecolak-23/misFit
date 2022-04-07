// Import Packages
const express = require('express');
const multer = require('multer');
// Import Controllers
const GalleryController = require('../controllers/GalleryControllers');

// Declare express router
const router = express.Router();

// Multer Middlewares
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + '/../uploads/gallery');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
});
let upload = multer({
  storage: storage,
}).single('image');

router.route('/').post(upload,GalleryController.uploadImageToGallery)

module.exports = router