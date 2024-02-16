const express = require('express');
const router = express.Router();
const CartItem = require('../models/cartItem');

router.post('/add-to-cart', async (req, res) => {
  try {
    const { productId, name, price, description, image1, quantity, userEmail } = req.body; 

    const newItem = new CartItem({
      productId,
      name,
      price,
      description,
      image1,
      quantity,
      userEmail
    });

    await newItem.save();

    res.status(201).json({ message: 'Product added to cart successfully', item: newItem });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/get-cart-items', async (req, res) => {
  try {
    const { userEmail } = req.query; // Extract userEmail from query parameters
    const cartItems = await CartItem.find({ userEmail }); // Fetch cart items based on userEmail
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
