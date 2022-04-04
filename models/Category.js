// Import Packages
const mongoose = require('mongoose');
const slugify = require('slugify');

// Create Schema
const Schema = mongoose.Schema;

// Create Category Schema
const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  slug: {
    type: String,
    unique: true
  }
});

CategorySchema.pre('validate', function(next){
  this.slug = slugify(this.name, {
    lower: true,
    strict: true
  });
  next();
})

// Create Category Model
const Category = mongoose.model('Category', CategorySchema);

module.exports = Category