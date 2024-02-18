// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      address,
      pincode,
      landmark,
      phoneNumber,
    } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      address,
      pincode,
      landmark,
      phoneNumber,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, 'techbees', { expiresIn: '1h' });

    // Send the token along with the success response
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Endpoint to fetch user details
router.get('/profile', async (req, res) => {
  const userEmail = req.query.email; // Get userEmail from query parameter
  try {
    const user = await User.findOne({ email: userEmail });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update user profile
router.put('/updateProfile', async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by their email and update their profile
    const updatedUser = await User.findOneAndUpdate({ email }, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Define route for fetching all registered users
router.get('/viewusers', async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Respond with the array of users
    res.status(200).json(users);
  } catch (error) {
    // Handle errors
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Define route to delete a user by userId
router.delete('/deleteusers/:userId', async (req, res) => {
  try {
    // Extract userId from request parameters
    const { userId } = req.params;

    // Find user by userId and delete it
    const deletedUser = await User.findByIdAndDelete(userId);

    // Check if user exists
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with success message
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    // Handle errors
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to fetch user details by email
router.get('/details/:email', async (req, res) => {
  const email = req.params.email;

  try {
    // Fetch user details from your database or any other source
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user details in the response
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to update password
router.put('/admin/updatepassword', async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'New password and confirm password do not match' });
    }

    // Find the user by their email
    const user = await User.findOne({ email: req.user.email });

    // Check if the current password is correct
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
