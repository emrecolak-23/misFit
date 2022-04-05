// Import Packages
const bcrypt = require('bcrypt');
// Import Model
const User = require('../models/User');
const Category = require('../models/Category');

exports.registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).redirect('/login');
  } catch (error) {
    res.status(400).redirect('/register');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          req.session.userID = user._id;
          res.status(200).redirect('/user/dashboard');
        } else {
          res.status(400).redirect('/login');
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'Sometinhg went wrong',
      error,
    });
  }
};

exports.logout = (req, res) => {
  try {
    req.session.destroy(()=>{
      res.redirect('/')
    })
  } catch(error) {
    res.status(400).redirect('/')
  }
}

exports.getDashboardPage = async (req, res) => {
  try {

    const user = await User.findOne({_id: req.session.userID});
    const categories = await Category.find();

    res.status(200).render('dashboard', {
      page_name: 'dashboard',
      user,
      categories
    })

  } catch(error) {
    res.status(400).redirect('/login')
  }
}