// Import Packages
const bcrypt = require('bcrypt');
// Import Model
const User = require('../models/User');
const Category = require('../models/Category');
const Workout = require('../models/Workout');
const Gallery = require('../models/Gallery');
const Contact = require('../models/Contact');
const About = require('../models/About');
 
// Import Logger
const logger = require('../logger/User');

exports.registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    req.flash('success', `${user.name} welcome to misfit. Your registiration process successfully completed`)
    res.status(200).redirect('/login');
  } catch (error) {
    logger.log({
      level: 'error',
      message: error
    })
    req.flash('error', 'Please fill all fields correctly.')
    res.status(400).redirect('/register');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          req.session.userID = user._id;
          res.status(200).redirect('/user/dashboard');
        } else {
          req.flash('error', 'Please enter correct password');
          res.status(400).redirect('/login');
        }
      });
    } else {
      req.flash('error', 'User not found. Please register!');
      res.status(400).redirect('/login');
    }
  } catch (error) {
    logger.log({
      level: 'error',
      message: error
    })
    req.flash('error', 'User not found. Please register!')
    res.status(400).redirect('/login');
  }
};

exports.logout = (req, res) => {
  try {
    req.session.destroy(()=>{
      res.redirect('/')
    })
  } catch(error) {
    logger.log({
      level: 'error',
      message: error
    })
    res.status(400).redirect('/')
  }
}

exports.getDashboardPage = async (req, res) => {
  try {

    const user = await User.findOne({_id: req.session.userID}).populate('workouts');
    const categories = await Category.find();
    const workouts = await Workout.find({user:req.session.userID});
    const contact = await Contact.find().limit(1);
    // for admin
    const users = await User.find();
    const allWorkouts = await Workout.find();
    const images = await Gallery.find();
    const about = await About.find().limit(1);

    res.status(200).render('dashboard', {
      page_name: 'dashboard',
      user,
      categories,
      workouts,
      users,
      allWorkouts,
      images,
      contact,
      about
    })

  } catch(error) {
    res.status(400).redirect('/login')
  }
}

exports.uploadProfileImage = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({_id:req.session.userID}, {
      image: req.file.filename
    });
    await user.save();
    res.status(201).redirect('/user/dashboard');
  } catch(error) {
    logger.log({
      level: 'error',
      message: error
    })
    res.status(400).json({
      status: 'not uploaded',
      error
    })
  }
}

exports.deleteUser = async (req, res) => {
  try {

    const user = await User.findByIdAndDelete(req.params.id);
    await Workout.deleteMany({user: req.params.id});
    res.status(200).redirect('/user/dashboard');
  } catch(error) {
    logger.log({
      level: 'error',
      message: error
    })
    res.status(400).json({
      status: 'User not deleted',
      error
    })
  }
}