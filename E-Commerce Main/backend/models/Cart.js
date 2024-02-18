const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  description: String,
  image1: String,
  quantity: Number,
  userEmail: String
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
