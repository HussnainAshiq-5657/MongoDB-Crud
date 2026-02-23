const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  Email: {
    type: String,
  },
  Phone: {
    type: String,
  },
  Address: {
    type: String,
  },
});

const ContactModel = mongoose.model('Users', ContactSchema);
module.exports = ContactModel;
