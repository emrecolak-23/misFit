// Import packages
const express = require('express');
const multer = require('multer');

// Import Controller
const WorkoutController = require('../controllers/WorkoutController');

// Import Middlewares
const RoleMiddlewares = require('../middlewares/rolemiddlewares');

// Create express router
const router = express.Router();

// Multer Middlewares
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + '/../uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
});
let upload = multer({
  storage: storage,
}).single('image');

// POST routes
router
  .route('/')
  .post(
    upload,
    WorkoutController.createWorkout
  );

router.route('/').get(WorkoutController.getAllWorkout);

router.route('/:slug').get(WorkoutController.getWorkout);

module.exports = router;
