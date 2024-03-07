const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST route to add feedback
router.post('/feedback', async (req, res) => {
  try {
    const { productId, userEmail, feedback, rating } = req.body;
    // Create a new feedback instance
    const newFeedback = new Feedback({
      productId,
      userEmail,
      feedback,
      rating
    });
    // Save the feedback to the database
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback added successfully' });
  } catch (error) {
    console.error('Error adding feedback:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get feedbacks for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const feedbacks = await Feedback.find({ productId });
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE endpoint to delete feedback by ID
router.delete('/feedback/:feedbackId', async (req, res) => {
  try {
    const { feedbackId } = req.params;
    // Assuming you have a Feedback model with a method to delete feedback by ID
    const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);
    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
