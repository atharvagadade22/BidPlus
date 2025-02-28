const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const Auction = require('../models/Auction');
const auth = require('../middleware/auth');

// Example route
router.get('/', (req, res) => {
  res.send('API is working');
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
      res.status(200).send({ token });
    } catch (error) {
      console.error('Error during sign-in:', error);
      res.status(500).send('Error during sign-in');
    }
  } else {
    res.status(400).send('Invalid sign-in data');
  }
});

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
      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).send({ token });
    } catch (error) {
      console.error('Error saving user:', error);
      res.status(500).send('Error saving user');
    }
  } else {
    res.status(400).send('Invalid sign-up data');
  }
});

router.post('/post-auction', auth, async (req, res) => {
  const { itemId, item, startingBid, endTime } = req.body;
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

router.post('/bid/:id', async (req, res) => {
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

module.exports = router;
