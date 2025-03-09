import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuctionList from '../components/AuctionList';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Auctions.css';

const Auctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [selectedAuction, setSelectedAuction] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    // Fetch auctions data from API
    const fetchAuctions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auctions`);
        setAuctions(response.data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };

    fetchAuctions();
  }, []);

  const handleBid = async (auctionId) => {
    if (!isLoggedIn) {
      alert('Please sign in to place a bid');
      navigate('/signin');
      return;
    }

    const auction = auctions.find(a => a._id === auctionId);
    if (!auction) return;

    const amount = prompt(`Please enter bid amount (Current bid: $${auction.currentBid}):`);
    if (!amount) return;

    const bidValue = parseFloat(amount);
    if (isNaN(bidValue)) {
      alert('Please enter a valid amount');
      return;
    }

    if (bidValue <= auction.currentBid) {
      alert('Bid amount must be greater than current bid');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const userName = localStorage.getItem('userName');
      
      if (!userName) {
        alert('User information not found. Please sign in again.');
        navigate('/signin');
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/bid/${auctionId}`,
        {
          bidValue: bidValue,
          bidder: userName
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.status === 200) {
        // Refresh auctions list
        const updatedResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/auctions`);
        setAuctions(updatedResponse.data);
        alert('Bid placed successfully!');
      }
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Error placing bid. Please try again.');
    }
  };

  const handlePostAuction = () => {
    if (isLoggedIn) {
      navigate('/post-auction');
    } else {
      alert('Please sign in to post an auction.');
      navigate('/login');
    }
  };

  return (
    <div className="container-fluid">
      <div className="auctions-header text-center py-4">
        <h1>Auctions</h1>
        {isLoggedIn && (
          <button className="btn btn-primary" onClick={handlePostAuction}>Post New Auction</button>
        )}
      </div>
      {!isLoggedIn && (
        <div className="alert alert-info text-center">
          <p>Sign in to bid on auctions or post your own auctions.</p>
        </div>
      )}
      <AuctionList auctions={auctions} handleBid={handleBid} isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default Auctions;
