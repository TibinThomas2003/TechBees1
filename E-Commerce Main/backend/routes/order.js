// order.js (routes)
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const CartItem = require('../models/Cart');

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

// Route to cancel an order
router.put('/cancelorder/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: "Canceled" }, { new: true });
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error canceling order:', error);
    res.status(500).json({ error: 'Failed to cancel order' });
  }
});


// Route to get the total number of orders
router.get('/totalorders', async (req, res) => {
  try {
    // Count all orders in the database
    const totalOrders = await Order.countDocuments();

    // Respond with the total number of orders
    res.status(200).json({ totalOrders });
  } catch (error) {
    // Handle errors
    console.error('Error fetching total number of orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/placeordercart', async (req, res) => {
  try {
    // Extract data from request body
    const { userEmail, items } = req.body;

    // Check if items array exists and is not empty
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items array is missing or empty' });
    }

    // Iterate over each item and create order
    const orders = await Promise.all(items.map(async (item) => {
      const order = new Order({
        productId: item.productId,
        customerName: item.customerName,
        shippingAddress: item.shippingAddress,
        pincode: item.pincode,
        phoneNumber: item.phoneNumber,
        landmark: item.landmark,
        alternatePhoneNumber: item.alternatePhoneNumber,
        quantity: item.quantity,
        totalValue: item.totalValue,
        productName: item.productName,
        productDescription: item.productDescription,
        status: item.status,
        userEmail: userEmail
      });
      await order.save();
      return order;
    }));

    res.status(200).json({ message: 'Orders placed successfully', orders });
  } catch (error) {
    console.error('Error placing orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.post('/placeordercustompc', async (req, res) => {
  try {
    // Extract data from request body
    const { userEmail, items } = req.body;

    // Check if items array exists and is not empty
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items array is missing or empty' });
    }

    // Iterate over each item and create order
    const orders = await Promise.all(items.map(async (item) => {
      const order = new Order({
        productId: item.productId,
        customerName: item.customerName,
        shippingAddress: item.shippingAddress,
        pincode: item.pincode,
        phoneNumber: item.phoneNumber,
        landmark: item.landmark,
        alternatePhoneNumber: item.alternatePhoneNumber,
        quantity: item.quantity,
        totalValue: item.totalValue,
        productName: item.productName,
        productDescription: item.productDescription,
        status: item.status,
        userEmail: userEmail
      });
      await order.save();
      return order;
    }));

    res.status(200).json({ message: 'Orders placed successfully', orders });
  } catch (error) {
    console.error('Error placing orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
