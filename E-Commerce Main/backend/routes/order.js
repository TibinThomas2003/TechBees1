const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Route to create a new order
router.post('/placeorder', async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create new order' });
  }
});

// Route to fetch orders based on user's email
router.get('/orders/:userEmail', async (req, res) => {
  const userEmail = req.params.userEmail;
  try {
    const orders = await Order.find({ userEmail: userEmail });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});


module.exports = router;
