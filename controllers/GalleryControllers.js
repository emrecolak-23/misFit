// Import Model
const Gallery = require('../models/Gallery');

exports.uploadImageToGallery = async (req, res) => {
  try {

    const image = await Gallery.create({
      image: req.file.filename
    })
    req.flash('success', `${image.image} has been successfully created`);
    res.status(201).redirect('/gallery')
  } catch(error) {
    req.flash('error', 'Something went wrong');
    res.status(400).redirect('/gallery');
  }
}

