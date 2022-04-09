// Import Packages
const mongoose = require('mongoose');

// Create Schema
const Schema = mongoose.Schema;

// Create About Schema
const AboutSchema = new Schema({
  detail: {
    type: String,
    required: true
  }, 
  image: {
    type: String
  }
});

// Create About Model
const About = mongoose.model('About', AboutSchema);

module.exports = About