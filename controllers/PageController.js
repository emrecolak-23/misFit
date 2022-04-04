exports.getHomePage = (req, res) => {
  try {
    res.status(200).render('index');
  } catch(error) {
    res.status(400).json({
      status: 'Home Page not loaded',
      error
    })
  }
}

exports.getAboutPage = (req, res) => {
  try{
    res.status(200).render('about');
  } catch(error) {
    res.status(400).json({
      status: 'About Page not loaded',
      error
    })
  }
}

exports.getServicePage = (req, res) => {
  try{
    res.status(200).render('service');
  } catch(error) {
    res.status(400).json({
      status: 'Service Page not loaded',
      error
    })
  }
}

exports.getTrainerPage = (req, res) => {
  try {
    res.status(200).render('trainer');
  } catch(error) {
    res.status(400).json({
      status: 'Trainer Page not loaded',
      error
    })
  }
}

exports.getGalleryPage = (req, res) => {
  try {
    res.status(200).render('gallery');
  } catch(error) { 
    res.status(400).json({
      status: 'Gallery Page not loaded',
      error
    })
  }
}

exports.getContactPage = (req, res) => {
  try {
    res.status(200).render('contact')
  } catch(error) {
    res.status(400).json({
      status: 'Contact Page not loaded',
      error
    })
  }
}