const express = require('express');
const router = express.Router();
const CustomOrder = require('../models/Custompc'); // Assuming you have a CustomOrder model defined

// Route for placing an order
router.post('/placeorder', async (req, res) => {
  try {
    const { productIds } = req.body; // Assuming the request body contains an array of product IDs

    // Fetch products from the database based on the product IDs
    // Here, you would fetch the product details and calculate the total value based on the products in the cart

    // Create a new order using the fetched product details
    const order = new CustomOrder({
      products: productIds, // Assuming you have a 'products' field in your order schema to store product IDs
      // Other fields like user details, total value, etc., can be added here
    });

    // Save the order to the database
    const savedOrder = await order.save();

    res.status(201).json(savedOrder); // Respond with the saved order
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

module.exports = router;
