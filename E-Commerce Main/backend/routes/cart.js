const express = require('express');
const router = express.Router();
const CartItem = require('../models/Cart');
const Product = require('../models/Product'); // Import the Product model or adjust the import path accordingly

// Add item to cart
router.post('/add-to-cart', async (req, res) => {
  try {
    const { productId, name, price, description, image1, quantity, userEmail } = req.body;

    // Check if the item already exists in the cart for the user
    const existingCartItem = await CartItem.findOne({ productId, userEmail });

    if (existingCartItem) {
      // If the item exists, update the quantity
      const updatedQuantity = existingCartItem.quantity + quantity;
      await CartItem.findByIdAndUpdate(existingCartItem._id, { quantity: updatedQuantity });
      res.status(200).json({ message: 'Quantity updated in cart successfully' });
    } else {
      // If the item does not exist, add it as a new item
      const newItem = new CartItem({
        productId,
        name,
        price,
        description,
        image1,
        quantity,
        userEmail,
      });
      await newItem.save();
      res.status(201).json({ message: 'Product added to cart successfully', item: newItem });
    }
  } catch (error) {
  
  }
});


// Get cart items
router.get('/cart/get-cart-items', async (req, res) => {
  const userEmail = req.query.email;
  try {
    const cartItems = await CartItem.find({ userEmail });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update quantity of an item in cart
router.put('/update-quantity/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  try {
    // Check if the quantity is greater than 10
    if (quantity > 5) {
      return res.status(400).json({ error: 'Quantity cannot exceed 10' });
    }
    
    const updatedItem = await CartItem.findByIdAndUpdate(itemId, { quantity }, { new: true });
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Delete an item from cart
router.delete('/delete-item/:itemId', async (req, res) => {
  const { itemId } = req.params;
  try {
    await CartItem.findByIdAndDelete(itemId);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get product details by ID
router.get('/product/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





module.exports = router;
