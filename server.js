const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ContactModel = require('./models/ContactModel.js');

//Connection To DataBase

mongoose.connect('mongodb://127.0.0.1:27017/Contact-App').then(() => {
  console.log('Database Connected Successfully');
});

//MiddleWare
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

//Routes

app.get('/', async (req, res) => {
  const contacts = await ContactModel.find();
  res.render('home', { contacts: contacts });
});
app.get('/add-contact', (req, res) => {
  res.render('add-contact');
});
app.post('/add-contact', async (req, res) => {
  await ContactModel.insertOne({
    FirstName: req.body.first_name,
    LastName: req.body.last_name,
    Email: req.body.email,
    Phone: req.body.phone,
    Address: req.body.address,
  });
  res.redirect('/');
});
app.get('/show-contact/:id', async (req, res) => {
  const Contact = await ContactModel.findById(req.params.id);
  res.render('show-contact', { contact: Contact });
});

app.get('/update-contact/:id', async (req, res) => {
  const contact = await ContactModel.findById(req.params.id);
  res.render('update-contact', { contact: contact });
});
app.post('/update-contact/:id', async (req, res) => {
  await ContactModel.findByIdAndUpdate(req.params.id, {
    FirstName: req.body.first_name,
    LastName: req.body.last_name,
    Email: req.body.email,
    Phone: req.body.phone,
    Address: req.body.address,
  });
  res.redirect('/');
});

app.get('/delete-contact/:id', async (req, res) => {
  await ContactModel.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// Connection To Server

const PORT = 5656;

app.listen(PORT, () => {
  console.log(`Your Project is Running on PORT Number ${PORT}`);
});
