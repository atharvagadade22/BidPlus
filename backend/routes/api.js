const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const Auction = require('../models/Auction');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Example route
router.get('/', (req, res) => {
  res.send('API is working');
});


router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    if (password.length < 7) {
      return res.status(400).json({ error: 'Password must be at least 7 characters long' });
    }
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send('User already exists');
      }
      const newUser = new User({ name, email, password });
      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      newUser.tokens = newUser.tokens.concat({ token });
      await newUser.save();
      res.status(200).send({ token });
    } catch (error) {
      console.error('Error saving user:', error);
      res.status(500).send('Error saving user');
    }
  } else {
    res.status(400).send('Invalid sign-up data');
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send('Invalid email or password');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send('Invalid email or password');
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      user.tokens = user.tokens.concat({ token });
      await user.save();
      res.status(200).send({ token });
    } catch (error) {
      console.error('Error during sign-in:', error);
      res.status(500).send('Error during sign-in');
    }
  } else {
    res.status(400).send('Invalid sign-in data');
  }
});

router.post('/post-auction', auth, async (req, res) => {
  const { itemId, item, startingBid, endTime } = req.body;

  if (!ObjectId.isValid(itemId)) {
    return res.status(400).send({ error: 'Invalid itemId' });
  }

  if (itemId && item && startingBid && endTime) {
    try {
      const existingAuction = await Auction.findOne({ itemId });
      if (existingAuction) {
        return res.status(400).send('Auction for this item already exists');
      }
      const newAuction = new Auction({
        itemId: itemId,
        item: item,
        startingBid: startingBid,
        endTime: endTime,
      });
      await newAuction.save();
      res.status(200).send('Auction posted successfully');
    } catch (error) {
      console.error('Error saving auction:', error);
      res.status(500).send('Error saving auction');
    }
  } else {
    res.status(400).send('Invalid auction data');
  }
});

router.put('/update-auction/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { item, startingBid, endTime } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid auction ID' });
  }

  try {
    const auction = await Auction.findById(id);
    if (!auction) {
      return res.status(404).send('Auction not found');
    }

    if (item) auction.item = item;
    if (startingBid) auction.startingBid = startingBid;
    if (endTime) auction.endTime = endTime;

    await auction.save();
    res.status(200).send('Auction updated successfully');
  } catch (error) {
    console.error('Error updating auction:', error);
    res.status(500).send('Error updating auction');
  }
});

router.post('/bid/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { bidValue, bidder } = req.body;

  if (bidValue && bidder) {
    try {
      const auction = await Auction.findById(id);
      if (!auction) {
        return res.status(404).send('Auction not found');
      }

      if (bidValue > auction.currentBid) {
        auction.currentBid = bidValue;
        auction.highestBidder = bidder;
        await auction.save();
        res.status(200).send('Bid placed successfully');
      } else {
        res.status(400).send('Bid value must be higher than the current bid');
      }
    } catch (error) {
      console.error('Error placing bid:', error);
      res.status(500).send('Error placing bid');
    }
  } else {
    res.status(400).send('Invalid bid data');
  }
});

router.get('/auction/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const auction = await Auction.findById(id);
    if (!auction) {
      return res.status(404).send('Auction not found');
    }
    res.status(200).json(auction);
  } catch (error) {
    console.error('Error fetching auction:', error);
    res.status(500).send('Error fetching auction');
  }
});

router.get('/auctions', async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.status(200).json(auctions);
  } catch (error) {
    console.error('Error fetching auctions:', error);
    res.status(500).send('Error fetching auctions');
  }
});

router.delete('/delete-auction/:id', auth, async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid auction ID' });
  }

  try {
    const auction = await Auction.findByIdAndDelete(id);
    if (!auction) {
      return res.status(404).send('Auction not found');
    }
    res.status(200).send('Auction deleted successfully');
  } catch (error) {
    console.error('Error deleting auction:', error);
    res.status(500).send('Error deleting auction');
  }
});

router.delete('/delete-account', auth, async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send('Account deleted successfully');
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).send('Error deleting account');
  }
});

router.put('/update-profile', auth, async (req, res) => {
  const userId = req.user._id;
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.status(200).send('Profile updated successfully');
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send('Error updating profile');
  }
});

module.exports = router;
