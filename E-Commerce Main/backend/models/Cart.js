const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  description: String,
  image1: String,
  quantity: Number,
  userEmail: String
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
