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
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  userEmail: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  image1: {
    type: String,
    required: true,
  },
});

const CustomPC = mongoose.model('CustomPC', CustomPCSchema);

module.exports = CustomPC;
