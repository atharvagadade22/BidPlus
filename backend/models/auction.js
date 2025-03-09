const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auctionSchema = new Schema({
  item: {
    type: String,
    required: true
  },
  startingBid: {
    type: Number,
    required: true
  },
  currentBid: {
    type: Number,
    default: 0
  },
  highestBidder: {
    type: String,
    default: ''
  },
  endTime: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;
