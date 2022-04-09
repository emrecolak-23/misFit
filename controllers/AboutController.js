// Import Packages
const fs = require('fs');
// Import About Model
const About = require('../models/About');

exports.createAbout = async (req, res) => {
  try {
    const about = await About.create({
      detail: req.body.detail,
      image: req.file.filename
    })
    res.status(201).json({
      status: 'About page detail created',
      about
    })
  } catch(error) {
    res.status(400).json({
      status: 'Something went wrong',
      error
    })
  }
}

exports.updateAboutInfo = async (req, res) => {
  try {
    const about = await About.findByIdAndUpdate({_id: req.params.id}, {
      detail: req.body.detail,
    })
    await about.save();
    await req.flash('success', 'About Detail updated');
    res.status(201).redirect('/user/dashboard');
  } catch(error) {
    await req.flash('error', 'Something went wrong');
    res.status(400).redirect('/user/dashboard');
  }
}
