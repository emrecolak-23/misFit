// Import packages
const express = require('express');

// Import Controller
const WorkoutController = require('../controllers/WorkoutController');

// Create express router
const router = express.Router();

// POST routes
router.route('/').post(WorkoutController.createWorkout);

router.route('/').get(WorkoutController.getAllWorkout);

router.route('/:id').get(WorkoutController.getWorkout);

module.exports = router