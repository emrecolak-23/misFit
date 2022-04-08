// Import Packages
const mongoose = require('mongoose');
const slugify = require('slugify');

// Import Logger
const logger = require('../logger/Workout');

// Create Schema Object
const Schema = mongoose.Schema;

// Create Workout Schema
const WorkoutSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  slug: {
    type: String,
    unique: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

WorkoutSchema.pre('validate', function(next){
  this.slug = slugify(this.name, {
    lower: true,
    strict: true
  })
  next();
});

WorkoutSchema.post('save', (doc)=> {

  logger.log({
    level: 'info',
    message: doc
  })
  
});
// Create Workout Model
const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;