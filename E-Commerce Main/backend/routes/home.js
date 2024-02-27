// routes/home.js
const express = require('express');
const router = express.Router();
const Home = require('../models/Home');

// Route for updating home products
router.post('/update', async (req, res) => {
  try {
    const selectedProductDetails = req.body;

    // Validate that selectedProductDetails is an array
    if (!Array.isArray(selectedProductDetails)) {
      return res.status(400).json({ error: 'Selected product details must be an array' });
    }

    // Clear existing home products
    await Home.deleteMany();

    // Insert selected products as home products
    const insertedProducts = await Home.insertMany(selectedProductDetails);

    res.status(200).json({ message: 'Home products updated successfully', products: insertedProducts });
  } catch (error) {
    console.error('Error updating home products:', error);
    res.status(500).json({ error: 'Failed to update home products' });
  }
});



// Route for fetching product details from the homeitems collection
router.get('/products', async (req, res) => {
  try {
    // Fetch all products from the homeitems collection
    const products = await Home.find();

    // Return the products as JSON response
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;
