// Import Model
const Workout = require('../models/Workout');

exports.createWorkout = async (req, res) => {
  try {

    const workout = await Workout.create(req.body);
    res.status(201).json({
      status: 'Workout successfuly created',
      workout
    });
  } catch(error) {
    res.status(400).json({
      status: 'Something went wrong',
      error
    })
  }
}