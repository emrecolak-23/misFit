// Import Packages
const nodemailer = require('nodemailer');
// Import Models
const User = require('../models/User');
const Workout = require('../models/Workout');
const Gallery = require('../models/Gallery');

exports.getHomePage = (req, res) => {
  try {
    res.status(200).render('index', {
      page_name: 'index',
    });
  } catch (error) {
    res.status(400).json({
      status: 'Home Page not loaded',
      error,
    });
  }
};

exports.getAboutPage = (req, res) => {
  try {
    res.status(200).render('about', {
      page_name: 'about',
    });
  } catch (error) {
    res.status(400).json({
      status: 'About Page not loaded',
      error,
    });
  }
};

exports.getTrainerPage = async (req, res) => {
  try {
    const trainers = await User.find({ role: 'trainer' });
    res.status(200).render('trainer', {
      page_name: 'trainer',
      trainers,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Trainer Page not loaded',
      error,
    });
  }
};

exports.getSingleTrainer = async (req, res) => {
  try {
    const trainer = await User.findById(req.params.id);
    const workouts = await Workout.find({ user: req.params.id });
    const user = await User.findById(req.session.userID);
    res.status(200).render('trainer-single', {
      page_name: 'trainer',
      trainer,
      user,
      workouts,
    });
  } catch (error) {}
};

exports.getGalleryPage = async (req, res) => {
  try {
    const images = await Gallery.find();
    res.status(200).render('gallery', {
      page_name: 'gallery',
      images
    });
  } catch (error) {
    res.status(400).json({
      status: 'Gallery Page not loaded',
      error,
    });
  }
};

exports.getContactPage = (req, res) => {
  try {
    res.status(200).render('contact', {
      page_name: 'contact',
    });
  } catch (error) {
    res.status(400).json({
      status: 'Contact Page not loaded',
      error,
    });
  }
};

exports.getLoginPage = (req, res) => {
  try {
    res.status(200).render('login', {
      page_name: 'Login',
    });
  } catch (error) {
    res.status(400).json({
      status: 'Login Page not loaded',
      error,
    });
  }
};

exports.getRegisterPage = (req, res) => {
  try {
    res.status(200).render('register', {
      page_name: 'register',
    });
  } catch (error) {
    res.status(400).json({
      status: 'Register Page not loaded',
      error,
    });
  }
};

exports.sendEmail = async (req, res) => {
  try {
    const outputMessage = `
    <h1>Message Details</h1>
    <ul>
      <li><h3>Name:</h3>${req.body.name}</li>
      <li><h3>Email:</h3> ${req.body.email}</li>
      <li><h3>Phone:</h3> ${req.body.phone}</li>
    </ul>
    <h2> Message </h2>
    <h3>${req.body.subject}</h3>
    <p>${req.body.message}</p>
    `;
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'nodejs.app.test61@gmail.com', // gmail account
        pass: 'Emco32323626', // gmail password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"MisFit Contact Form" <nodejs.app.test61@gmail.com>', // sender address
      to: 'colakkemre@gmail.com', // list of receivers
      subject: 'MisFit New Message ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: outputMessage, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.status(201).redirect('/contact');
  } catch (error) {
    res.status(400).json({
      status: 'something went wrong',
      error
    })
  }
};
