// Import Packages
const express = require('express');
const ejs = require('ejs');

// Import Routers
const PageRouter = require('./routes/PageRoutes');

// Declare Express App
const app = express();

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));

// Routes
app.use('/', PageRouter);

// Declare Port
const PORT = 16000;
// Listen Server
app.listen(PORT, ()=> {
  console.log(`Server listened in ${PORT}`)
})
