// Import Model
const Gallery = require('../models/Gallery');

exports.uploadImageToGallery = async (req, res) => {
  try {

    const image = await Gallery.create({
      image: req.file.filename
    })
    res.status(201).redirect('/gallery')
  } catch(error) {
    res.status(400).json({
      status: 'Image not uploaded',
      error
    })
  }
}

