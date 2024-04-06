
const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI;

const connectDB = () => {
  mongoose.connect(DB_URI).then(r => {
    console.log('Successfully connected to the database.');
  }).catch(e => {
    console.error(e);
  });
};

module.exports = connectDB;
