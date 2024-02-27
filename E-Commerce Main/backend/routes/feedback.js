// Assuming you have an Express app set up
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST route to add feedback
router.post('/feedback', async (req, res) => {
  try {
    const { productId, userEmail, feedback } = req.body;
    // Create a new feedback instance
    const newFeedback = new Feedback({
      productId,
      userEmail,
      feedback
    });
    // Save the feedback to the database
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback added successfully' });
  } catch (error) {
    console.error('Error adding feedback:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
