const express = require('express');
const router = express.Router();
const CartItem = require('../models/Cart');
const Cart = require('../models/Cart');

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

router.get('/cart/get-cart-items', async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
