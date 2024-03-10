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
});

const CustomPC = mongoose.model('CustomPC', CustomPCSchema);

module.exports = CustomPC;
