// Import Models
const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create({
      name: req.body.category
    });
    req.flash('success', `${category.name} has been successfully created`);
    res.status(201).redirect('/user/dashboard');
  } catch (error) {
    req.flash('error', 'Something went wrong');
    res.status(400).redirect('/user/dashboard');
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: 'Categories listed successfully',
      categories,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Something went wrong',
      error,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    req.flash('success', `${category.name} has been successfully deleted`);
    res.status(201).redirect('/user/dashboard');
  } catch(error) {
    req.flash('error', 'Something went wrong');
    res.status(400).redirect('/user/dashboard');
  }
}