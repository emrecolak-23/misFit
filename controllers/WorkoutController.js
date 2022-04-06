// Import Packages
const fs = require('fs')
// Import Model
const User = require('../models/User');
const Workout = require('../models/Workout');

exports.createWorkout = async (req, res) => {
  try {
    const workout = await Workout.create({
      name: req.body.name,
      description: req.body.description,
      image: req.file.filename,
      category: req.body.category,
      user: req.session.userID
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
    const workout = await Workout.findOne({ slug: req.params.slug })
    .populate('category')
    .populate('user');
    const user = await User.findById(req.session.userID);
    res.status(200).render('workout-single', {
      page_name: 'workout',
      workout,
      user
    });
  } catch (error) {
    res.status(400).json({
      status: 'Something went wrong',
      error,
    });
  }
};

exports.enrollWorkout = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.workouts.push({_id:req.body.workout_id})
    await user.save();
    res.status(201).redirect('/user/dashboard');
  } catch(error) {
    res.status(400).redirect('/user/dashboard');
  }
}

exports.releaseWorkout = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.workouts.pull({_id:req.body.workout_id});
    await user.save();
    res.status(201).redirect('/user/dashboard');
  } catch(error) {
    res.status(400).redirect('/user/dashboard');
  }
}

exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndRemove({slug:req.params.slug});
    let deletedImage = __dirname + "/../uploads/" + workout.image;
    fs.unlinkSync(deletedImage);
    res.status(201).redirect('/user/dashboard');
  } catch(error) {
    res.status(400).redirect('/user/dashboard');
  }
}