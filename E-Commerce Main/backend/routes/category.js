const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');

router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});





module.exports = router;
