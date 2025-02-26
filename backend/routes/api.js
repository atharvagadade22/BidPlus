const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Example route
router.get('/', (req, res) => {
  res.send('API is working');
});

// New route for handling POST requests to /submit
router.post('/submit', (req, res) => {
  const data = req.body;
  // Process the data here
  if (data) {
    res.status(200).send('Data received');
  } else {
    res.status(400).send('Invalid data');
  }
});

// New route for handling POST requests to /signin
router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  // Process the sign-in data here
  if (email && password) {
    // Perform authentication (this is a placeholder)
    res.status(200).send('Sign-in successful');
  } else {
    res.status(400).send('Invalid sign-in data');
  }
});

// New route for handling POST requests to /signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send('User already exists');
      }
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.status(200).send('Sign-up successful');
    } catch (error) {
      console.error('Error saving user:', error);
      res.status(500).send('Error saving user');
    }
  } else {
    res.status(400).send('Invalid sign-up data');
  }
});

// New route for handling POST requests to /post-auction
router.post('/post-auction', (req, res) => {
  const { item, startingBid, endTime } = req.body;
  // Process the auction data here
  if (item && startingBid && endTime) {
    // Save auction data (this is a placeholder)
    res.status(200).send('Auction posted successfully');
  } else {
    res.status(400).send('Invalid auction data');
  }
});

// Define other routes here

module.exports = router;
