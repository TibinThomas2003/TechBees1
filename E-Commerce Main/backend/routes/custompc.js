const express = require('express');
const router = express.Router();
const CustomPC = require('../models/Custompc');

// Route to add product to CustomPC model
router.post('/add', async (req, res) => {
  try {
    const productData = req.body; // Assuming the request body contains the product data
    const newProduct = await CustomPC.create(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Failed to add product' });
  }
});

module.exports = router;
