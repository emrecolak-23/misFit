// Import Packages
const mongoose = require('mongoose');

// Create Schema
const Schema = mongoose.Schema;

// Create Gallery Schema
const GallerySchema = new Schema({
  image: {
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Gallery Model
const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery