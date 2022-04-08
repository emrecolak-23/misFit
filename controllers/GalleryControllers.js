// Import Packages
const fs = require('fs');
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

exports.deleteImageToGallery = async (req, res) => {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.id);
    let deletedImage = __dirname+'/../uploads/gallery/'+image.image;
    fs.unlinkSync(deletedImage);
    req.flash('success',`${image.image} has been successfully deleted`);
    res.status(200).redirect('/user/dashboard');
  } catch(error) {
    res.status(400).json({
      error
    })
  }
}

