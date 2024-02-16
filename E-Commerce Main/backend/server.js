const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

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
app.use(express.static('build'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.js')); 
});

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// route for product
const productRoute = require('./routes/product');
app.use("/api/product", productRoute);

// route for cart
const cartRoute = require('./routes/cart');
app.use("/api/cart", cartRoute);

// route for order
const orderRoute = require('./routes/order');
app.use('/api/orders', orderRoute); 


app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
