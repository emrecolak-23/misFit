// Import Model
const Workout = require('../models/Workout');

exports.createWorkout = async (req, res) => {
  try {
    const workout = await Workout.create({
      name: req.body.name,
      description: req.body.description,
      image: req.file.filename,
      category: req.body.category
    });
    res.status(201).redirect('/user/dashboard')
  } catch (error) {
    res.status(400).redirect('/user/dashboard')
  }
};

exports.getAllWorkout = async (req, res) => {
  try {
    const workouts = await Workout.find().sort('-createdAt');
    console.log(workouts);
    res.status(200).render('workout', {
      page_name: 'workout',
      workouts,
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
    const workout = await Workout.findOne({ slug: req.params.slug }).populate(
      'category'
    );
    res.status(200).render('workout-single', {
      page_name: 'workout',
      workout,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Something went wrong',
      error,
    });
  }
};
