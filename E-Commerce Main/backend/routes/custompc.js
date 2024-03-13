const express = require('express');
const router = express.Router();
const CustomPC = require('../models/Custompc');

router.post('/add', async (req, res) => {
  try {
    const { name, category, price, image1 } = req.body;
    const userEmail = req.body.userEmail || ''; // Get userEmail from request body
    
    // Check if the product already exists for the user and category
    let existingProduct = await CustomPC.findOne({ category, userEmail });

    if (existingProduct) {
      // If the product exists for the user and category, update it
      existingProduct.name = name;
      existingProduct.price = price;
      existingProduct.image1 = image1; // Update image1 field
      await existingProduct.save();
      console.log('Product updated:', existingProduct); // Log the updated product
      
      // Fetch updated cart items and send them in the response
      const cartItems = await CustomPC.find({ userEmail });
      res.status(200).json({ message: 'Product updated successfully', cartItems });
    } else {
      // If the product doesn't exist for the user and category, create a new one
      const newProduct = await CustomPC.create({ name, category, price, userEmail, image1 });
      res.status(201).json({ message: 'Product added successfully', cartItems: [newProduct] });
    }
  } catch (error) {
    console.error('Error adding/updating product:', error);
    res.status(500).json({ message: 'Failed to add/update product' });
  }
});

// Route to fetch cart items based on user's email
router.get('/cart', async (req, res) => {
  try {
    const userEmail = req.query.userEmail || ''; // Get userEmail from query params
    const cartItems = await CustomPC.find({ userEmail });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Failed to fetch cart items' });
  }
});


router.get('/placeordercustompc', async (req, res) => {
  try {
    const cartItems = await CustomPC.find();
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Failed to fetch cart items' });
  }
});


module.exports = router;
