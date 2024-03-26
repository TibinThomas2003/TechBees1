// Custompcorder.js
const mongoose = require('mongoose');

// Define schema for custom PC orders
const customPCOrderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CustomPC', // Assuming the product details are stored in the CustomPC table
    required: true
  },
  name: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  pincode: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  landmark: { type: String, required: true },
  alternatePhoneNumber: { type: String },
  email: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalValue: { type: Number, required: true },
  status: { type: String, default: "Order Placed" }
}, { timestamps: true });

const CustomPCOrder = mongoose.model('CustomPCOrder', customPCOrderSchema);

module.exports = CustomPCOrder;
