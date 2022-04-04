// Import Packages
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

// Import Routers
const PageRouter = require('./routes/PageRoutes');
const WorkoutRouter = require('./routes/WorkoutRoutes');

// Declare Express App
const app = express();

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Routes
app.use('/', PageRouter);
app.use('/workout', WorkoutRouter);

// DB Connect
const dbURI =
  "mongodb+srv://emco:emco3232@nodetuts.iuulr.mongodb.net/misFitApp?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log(err);
  });


// Declare Port
const PORT = 16000;
// Listen Server
app.listen(PORT, ()=> {
  console.log(`Server listened in ${PORT}`)
})
