const express = require('express');
const router = express.Router();
const CustomPC = require('../models/Custompc');
const Product = require('../models/Product');

router.post('/add', async (req, res) => {
  try {
    const { name, category, price, image1, quantity } = req.body;
    const userEmail = req.body.userEmail || '';

    // Find the product based on name and category
    const product = await Product.findOne({ name, category });

    if (product) {
      // If product exists, extract its ID
      const productId = product._id;

      // Create or update CustomPC entry
      let existingProduct = await CustomPC.findOne({ category, userEmail });

      if (existingProduct) {
        existingProduct.name = name;
        existingProduct.price = price;
        existingProduct.image1 = image1;
        existingProduct.quantity = quantity;
        existingProduct.productId = productId; // Assign product ID
        await existingProduct.save();
        console.log('Product updated:', existingProduct);

        const cartItems = await CustomPC.find({ userEmail });
        res.status(200).json({ message: 'Product updated successfully', cartItems });
      } else {
        const newProduct = await CustomPC.create({ name, category, price, userEmail, productId, image1, quantity });
        res.status(201).json({ message: 'Product added successfully', cartItems: [newProduct] });
      }
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error adding/updating product:', error);
    res.status(500).json({ message: 'Failed to add/update product' });
  }
});

router.get('/cart', async (req, res) => {
  try {
    const userEmail = req.query.userEmail || '';
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
