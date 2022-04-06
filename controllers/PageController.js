// Import Models
const User = require("../models/User");
const Workout = require('../models/Workout');

exports.getHomePage = (req, res) => {
  try {
    res.status(200).render('index', {
      page_name: 'index'
    });
  } catch(error) {
    res.status(400).json({
      status: 'Home Page not loaded',
      error
    })
  }
}

exports.getAboutPage = (req, res) => {
  try{
    res.status(200).render('about', {
      page_name: 'about'
    });
  } catch(error) {
    res.status(400).json({
      status: 'About Page not loaded',
      error
    })
  }
}

exports.getTrainerPage = async (req, res) => {
  try {

    const trainers = await User.find({role:'trainer'});
    res.status(200).render('trainer', {
      page_name: 'trainer',
      trainers
    });
  } catch(error) {
    res.status(400).json({
      status: 'Trainer Page not loaded',
      error
    })
  }
}

exports.getSingleTrainer = async (req, res) => {
  try {
    const trainer = await User.findById(req.params.id);
    const workouts = await Workout.find({user:req.params.id});
    const user = await User.findById(req.session.userID);
    res.status(200).render('trainer-single', {
      page_name: 'trainer',
      trainer,
      user,
      workouts
    })
  } catch(error) {

  }
}

exports.getGalleryPage = (req, res) => {
  try {
    res.status(200).render('gallery', {
      page_name: 'gallery'
    });
  } catch(error) { 
    res.status(400).json({
      status: 'Gallery Page not loaded',
      error
    })
  }
}

exports.getContactPage = (req, res) => {
  try {
    res.status(200).render('contact', {
      page_name: 'contact'
    })
  } catch(error) {
    res.status(400).json({
      status: 'Contact Page not loaded',
      error
    })
  }
}

exports.getLoginPage = (req, res) => {
  try {
    res.status(200).render('login', {
      page_name: 'Login'
    })
  } catch(error) {
    res.status(400).json({
      status: 'Login Page not loaded',
      error
    })
  }
}

exports.getRegisterPage = (req, res) => {
  try {
    res.status(200).render('register', {
      page_name: 'register'
    })
  } catch(error) {
    res.status(400).json({
      status: 'Register Page not loaded',
      error
    })
  }
}