const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image1: { type: String, required: true },
  quantity: { type: Number, required: true },
  userEmail: { type: String, required: true }
});

const CartItem = mongoose.model('CartItem', cartSchema);

module.exports = CartItem;
