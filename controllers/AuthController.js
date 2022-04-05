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