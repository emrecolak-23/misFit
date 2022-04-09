// Import Packages
const express = require('express');
const multer = require('multer');

// Multer Middlewares
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + '/../uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
});
let upload = multer({
  storage: storage,
}).single('image');



// Import Middlewares
const AuthMiddlewares = require('../middlewares/authMiddlewares');

// Import Controllers
const AuthController = require('../controllers/AuthController');

// Import Validate Middlewares
const validate = require('../middlewares/validate')
// Import Validations
const schema = require('../validations/User');
// Create express router
const router = express.Router();

router.route('/register').post(validate(schema.registerValidation,'/register'),AuthController.registerUser);
router.route('/login').post(validate(schema.loginValidation,'/login'),AuthController.loginUser);
router.route('/logout').get(AuthController.logout);
router.route('/dashboard').get(AuthMiddlewares,AuthController.getDashboardPage);
router.route('/upload').put(upload,AuthController.uploadProfileImage);
router.route('/:id').delete(AuthController.deleteUser);

module.exports = router;