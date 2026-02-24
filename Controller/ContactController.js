const ContactModel = require('../models/ContactModel.js');
const mongoose = require('mongoose');

module.exports = {
  getAllContact: async (req, res) => {
    try {
      const contacts = await ContactModel.find().sort({ createdAt: -1 });
      return res.render('home', { contacts });
    } catch (error) {
      return res.render('500', { message: error.message });
    }
  },

  AddContactPage: (req, res) => {
    return res.render('add-contact');
  },

  AddContact: async (req, res) => {
    try {
      await ContactModel.create({
        FirstName: req.body.first_name,
        LastName: req.body.last_name,
        Email: req.body.email,
        Phone: req.body.phone,
        Address: req.body.address,
      });

      return res.redirect('/');
    } catch (error) {
      return res.render('500', { message: error.message });
    }
  },

  ShowContact: async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.render('404', { message: 'Invalid Id' });
    }

    try {
      const contact = await ContactModel.findById(req.params.id);

      if (!contact) {
        return res.render('404', { message: 'User Not Found' });
      }

      return res.render('show-contact', { contact });
    } catch (error) {
      return res.render('500', { message: error.message });
    }
  },

  UpdateContact: async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.render('404', { message: 'Invalid Id' });
    }

    try {
      const contact = await ContactModel.findById(req.params.id);

      if (!contact) {
        return res.render('404', { message: 'User Not Found' });
      }

      return res.render('update-contact', { contact });
    } catch (error) {
      return res.render('500', { message: error.message });
    }
  },

  UpdateContacts: async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.render('404', { message: 'Invalid Id' });
    }
   
    try {
      const updatedContact = await ContactModel.findByIdAndUpdate(
        req.params.id,
        {
          FirstName: req.body.first_name,
          LastName: req.body.last_name,
          Email: req.body.email,
          Phone: req.body.phone,
          Address: req.body.address,
        },
        { new: true }
      );

      if (!updatedContact) {
        return res.render('404', { message: 'User Not Found' });
      }

      return res.redirect('/');
    } catch (error) {
      return res.render('500', { message: error.message });
    }
  },

  deleteContact: async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.render('404', { message: 'Invalid Id' });
    }

    try {
      const deletedContact = await ContactModel.findByIdAndDelete(req.params.id);

      if (!deletedContact) {
        return res.render('404', { message: 'User Not Found' });
      }

      return res.redirect('/');
    } catch (error) {
      return res.render('500', { message: error.message });
    }
  },
};
