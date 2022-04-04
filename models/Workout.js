// Import Packages
const mongoose = require('mongoose');
const slugify = require('slugify');

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
  slug: {
    type: String,
    unique: true
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

// Create Workout Model
const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;