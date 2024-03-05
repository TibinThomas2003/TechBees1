const mongoose = require('mongoose');

const customOrderSchema = new mongoose.Schema({
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'Product', // Assuming your product model is named 'Product'
  },
  // Other fields like user details, total value, etc., can be added here
}, { timestamps: true });

const CustomOrder = mongoose.model('CustomOrder', customOrderSchema);

module.exports = CustomOrder;
