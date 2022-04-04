// Import Model
const Workout = require('../models/Workout');

exports.createWorkout = async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json({
      status: 'Workout successfuly created',
      workout,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Something went wrong',
      error,
    });
  }
};

exports.getAllWorkout = async (req, res) => {
  try {
    const workouts = await Workout.find().sort('-createdAt');
    console.log(workouts);
    res.status(200).render('workout', {
      page_name: 'workout',
      workouts
    });
  } catch (error) {
    res.status(400).json({
      status: 'Something went wrong!',
      error,
    });
  }
};

exports.getWorkout = async (req, res) => {
  try { 

    const workout = await Workout.findOne({slug:req.params.slug});
    res.status(200).render('workout-single', {
      page_name: 'workout',
      workout
    })

  } catch(error) {
    res.status(400).json({
      status: 'Something went wrong',
      error
    })
  }
}