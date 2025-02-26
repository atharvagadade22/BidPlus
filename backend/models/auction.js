const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auctionSchema = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
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
  // Add any other fields you need to store
}, {
  timestamps: true
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;
