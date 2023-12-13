const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  phone_number: String,
  location: String,
  gender: String,
  dob: Date,
  email_id: String,
  retail_category: String,
  otp: String, 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
