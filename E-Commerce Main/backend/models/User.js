// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  address: String,
  pincode: String,
  landmark: String,
  phoneNumber: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
