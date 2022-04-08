// Import Packages
const fs = require('fs');
// Import Model
const User = require('../models/User');
const Workout = require('../models/Workout');
const Category = require('../models/Category');

exports.createWorkout = async (req, res) => {
  try {
    const workout = await Workout.create({
      name: req.body.name,
      description: req.body.description,
      image: req.file.filename,
      category: req.body.category,
      user: req.session.userID,
    });
    req.flash('success', `${workout.name} has been successfully created.`);
    res.status(201).redirect('/user/dashboard');
  } catch (error) {
    req.flash('error', 'Something went wrong!')
    res.status(400).redirect('/user/dashboard');
  }
};

exports.getAllWorkout = async (req, res) => {
  try {
    // Pagination
    const page = req.query.page || 1;
    const workoutPerPage = 6;
    const totalWorkOut = await Workout.find().countDocuments();

    // Search
    const categorySlug = req.query.category;

    const category = await Category.findOne({ slug: categorySlug });

    let filter = {};
    const query = req.query.search;

    if (categorySlug) {
      filter = { category: category._id };
    }
    if (query) {
      filter = { name: query };
    }
    if (!query && !categorySlug) {
      filter.name = '';
      filter.category = null;
    }
    // Get workouts
    const workouts = await Workout.find({
      $or: [
        { name: { $regex: '.*' + filter.name + '.*', $options: 'i' } },
        { category: filter.category },
      ],
    })
      .sort('-createdAt')
      .skip((page - 1) * workoutPerPage)
      .limit(workoutPerPage);

    // Get Categories
    const categories = await Category.find();

    res.status(200).render('workout', {
      page_name: 'workout',
      workouts,
      current: page,
      pages: Math.ceil(totalWorkOut / workoutPerPage),
      categories,
      category,
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
      user,
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
    await user.workouts.push({ _id: req.body.workout_id });
    await user.save();
    req.flash('success', `You has been successfully enrolled this workout`);
    res.status(201).redirect('/user/dashboard');
  } catch (error) {
    res.status(400).redirect('/user/dashboard');
  }
};

exports.releaseWorkout = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.workouts.pull({ _id: req.body.workout_id });
    await user.save();
    req.flash('success', `You has been successfully released this workout`);
    res.status(201).redirect('/user/dashboard');
  } catch (error) {
    res.status(400).redirect('/user/dashboard');
  }
};

exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndRemove({ slug: req.params.slug });
    let deletedImage = __dirname + '/../uploads/' + workout.image;
    fs.unlinkSync(deletedImage);

    req.flash('success',`${workout.name} deleted successfully.`)
    res.status(201).redirect('/user/dashboard');
  } catch (error) {
    req.flash('error', 'Something went wront when delete workout');
    res.status(400).redirect('/user/dashboard');
  }
};

exports.updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { slug: req.params.slug },
      {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
      }
    );
    await workout.save();
    
    req.flash('success',`${workout.name} has been successfully updated`);
    res.status(201).redirect('/user/dashboard');
  } catch (error) {
    req.flash('error', 'Something went wrong!')
    res.status(400).redirect('/user/dashboard');
  }
};
