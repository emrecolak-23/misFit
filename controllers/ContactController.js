// Import Models
const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
  try {
     const contact = await Contact.create(req.body);
     res.statu(201).json(contact);
  }  catch(error) {
    res.status(400).json({
      error
    })
  }
}

exports.updateContact = async (req, res) => {
  try {
    await Contact.findByIdAndUpdate({_id: req.params.id},req.body);
    req.flash('success', 'Contact section has been successfully updated.')
    res.status(200).redirect('/user/dashboard');
  } catch(error) {
    res.status(400).redirect('/user/dashboard');
  }
}