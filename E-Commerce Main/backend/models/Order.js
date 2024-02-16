const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  pincode: { type: String, required: true },
  landmark: String,
  alternatePhoneNumber: String,
  quantity: { type: Number, required: true },
  totalValue: { type: Number, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true }, // Include product name
  productDescription: { type: String, required: true }, // Include product description
  status: { type: String, enum: ['Order Placed', 'Processing', 'Shipped', 'Delivered', 'Canceled', 'Pending'], default: 'Order Placed' },
  userEmail: { type: String, required: true }, 
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
