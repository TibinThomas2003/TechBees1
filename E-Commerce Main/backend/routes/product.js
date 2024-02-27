// routes/products.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/Product');

// Define route for adding a new product
router.post('/addproduct', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a product based on ID
router.put('/updateproduct/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product ID format' });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: req.body },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    if (error instanceof SyntaxError) {
      res.status(400).json({ error: 'Invalid JSON format in request body' });
    } else {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Define route for fetching all products
router.get('/viewproducts', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Define route for fetching all products for admin home page
router.get('/admin/viewproducts', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.post('/admin/updatehome', async (req, res) => {
  try {
    // Extract selected product details from the request body
    const selectedProductDetails = req.body;

    // Validate that selectedProductDetails is an array
    if (!Array.isArray(selectedProductDetails)) {
      return res.status(400).json({ error: 'Selected product details must be an array' });
    }

    // Clear existing home products
    await Product.deleteMany({ name: 'home' });

    // Insert selected products as home products
    const insertedProducts = await Product.insertMany(selectedProductDetails.map(product => ({ ...product, name: 'home' })));

    res.status(200).json({ message: 'Home products updated successfully', products: insertedProducts });
  } catch (error) {
    console.error('Error updating home products:', error);
    res.status(500).json({ error: 'Failed to update home products' });
  }
});


// Update a product by ID
router.put('/update/:id', async (req, res) => {
  const productId = req.params.id;
  const updates = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE request to delete a product by ID
router.delete('/delete/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define route for fetching products by category
router.get('/viewproductsbycategory/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch product details by ID
router.get('/vieweachproduct/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})



router.get('/customproducts', async (req, res) => {
  const { category } = req.query;
  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


// Define route to get the total number of products
router.get('/totalproducts', async (req, res) => {
  try {
    // Count all products in the database
    const totalProducts = await Product.countDocuments();

    // Respond with the total number of products
    res.status(200).json({ totalProducts });
  } catch (error) {
    // Handle errors
    console.error('Error fetching total number of products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
