// server.js

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => {
    console.log('MongoDB Connected Successfully');
});

const corsOptions = {
    origin: '*',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build'))); // Serve static files from the 'build' directory

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Route for product
const productRoute = require('./routes/product');
app.use("/api/product", productRoute);

// Route for home products
const homeRoute = require('./routes/home');
app.use("/api/home", homeRoute);

// Route for cart
const cartRoute = require('./routes/cart');
app.use("/api/cart", cartRoute);

// Route for order
const orderRoute = require('./routes/order');
app.use('/api/orders', orderRoute); 

// Route for Custom PC
const customPCRoute = require('./routes/custompc'); // Import the custom PC route file
app.use('/api/custompc', customPCRoute); // Use the custom PC route

const customPCOrderRoute = require('./routes/custompcorder'); // Import the custom PC order route file
app.use('/api/custompcorder', customPCOrderRoute); // Use the custom PC order route

// Route for categories
const categoryRoute = require('./routes/category'); // Import the category route file
app.use('/api/category', categoryRoute); // Use the category route

// Route for feedback
const feedbackRoute = require('./routes/feedback'); // Import the feedback route file
app.use('/api/feedback', feedbackRoute); // Use the feedback route

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
