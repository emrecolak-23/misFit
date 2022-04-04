// Import Packages
const mongoose = require('mongoose');

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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Workout Model
const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;