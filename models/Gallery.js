// Import Packages
const mongoose = require('mongoose');

// Import Logger
const logger = require('../logger/Gallery');

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

GallerySchema.post('save', (doc)=>{
   logger.log({
     level: 'info',
     message: doc
   })
})

// Create Gallery Model
const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery