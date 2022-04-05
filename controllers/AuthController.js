// Import Packages
const bcrypt = require('bcrypt');
// Import Model
const User = require('../models/User');

exports.registerUser = (req, res) => {
  try {
    const user = User.create(req.body);
    res.status(200).json({
      status: 'User register successfully',
      user
    })
  } catch(error) {
    res.status(400).json({
      status: 'Something went wrong',
      error
    })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const {email,password} = req.body

    const user = await User.findOne({email});

    if (user) {
      bcrypt.compare(password,user.password, (err,same)=>{
        if(same) {
          res.status(200).send('you are logged in')
        }
      })
    }

  } catch(error) {
    res.status(400).json({
      status: 'Sometinhg went wrong',
      error
    })
  }
}