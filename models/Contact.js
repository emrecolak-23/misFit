// Import Packages
const mongoose = require('mongoose');

// Create Schema
const Schema = mongoose.Schema;

// Create ContactSchema 
const ContactSchema = new Schema({
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Contact Model
const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact