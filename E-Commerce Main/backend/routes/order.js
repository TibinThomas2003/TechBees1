// order.js (routes)
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

// Route to fetch all orders (for admin)
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ error: 'Failed to fetch all orders' });
  }
});

// Route to update order status
router.put('/orders/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  const { status } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

module.exports = router;
