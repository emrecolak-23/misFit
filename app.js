// Import Packages
const express = require('express');

// Declare Express App
const app = express();

// Declare Port
const PORT = 16000;
// Listen Server
app.listen(PORT, ()=> {
  console.log(`Server listened in ${PORT}`)
})
