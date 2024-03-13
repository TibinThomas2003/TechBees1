const mongoose = require('mongoose');

const CustomPCSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  image1: {
    type: String, // Assuming image1 is a URL
    required: true,
  },
});

const CustomPC = mongoose.model('CustomPC', CustomPCSchema);

module.exports = CustomPC;
