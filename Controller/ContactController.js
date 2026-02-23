const ContactModel = require('../models/ContactModel.js');

module.exports = {
  getAllContact: async (req, res) => {
    const contacts = await ContactModel.find();
    res.render('home', { contacts: contacts });
  },
  AddContactPage: (req, res) => {
    res.render('add-contact');
  },
  AddContact: async (req, res) => {
    await ContactModel.insertOne({
      FirstName: req.body.first_name,
      LastName: req.body.last_name,
      Email: req.body.email,
      Phone: req.body.phone,
      Address: req.body.address,
    });
    res.redirect('/');
  },
  ShowContact: async (req, res) => {
    const Contact = await ContactModel.findById(req.params.id);
    res.render('show-contact', { contact: Contact });
  },
  UpdateContact: async (req, res) => {
    const contact = await ContactModel.findById(req.params.id);
    res.render('update-contact', { contact: contact });
  },
  UpdateContacts: async (req, res) => {
    await ContactModel.findByIdAndUpdate(req.params.id, {
      FirstName: req.body.first_name,
      LastName: req.body.last_name,
      Email: req.body.email,
      Phone: req.body.phone,
      Address: req.body.address,
    });
    res.redirect('/');
  },
  deleteContact: async (req, res) => {
    await ContactModel.findByIdAndDelete(req.params.id);
    res.redirect('/');
  },
};
