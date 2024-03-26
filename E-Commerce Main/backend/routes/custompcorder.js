const express = require('express');
const router = express.Router();
const CustomPCOrder = require('../models/Custompcorder');
const Product = require('../models/Product'); // Assuming Product model is defined

// POST route to handle placing orders
router.post('/placeordercustompc', async (req, res) => {
  try {
    const { items } = req.body;

    // Insert each item into custompcorder table
    const orders = await CustomPCOrder.create(items);

    // Optionally, remove ordered products from custompc table
    // Assuming you have a method to remove products from custompc table

    res.status(201).json(orders);
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Error placing order" });
  }
});


// GET route to fetch all custom orders
router.get('/getcustomorders', async (req, res) => {
    try {
      const orders = await CustomPCOrder.find();
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching custom orders:', error);
      res.status(500).json({ error: 'Error fetching custom orders' });
    }
  });





// Define route to fetch a product by its ID
router.get('/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    // Fetch the product based on the product ID from the database
    const product = await Product.findById(productId);
    
    // Check if the product exists
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
