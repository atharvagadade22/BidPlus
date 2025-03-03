import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuctionList from '../components/AuctionList';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Auctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        const response = await fetch('http://localhost:5000/api/auctions');
        const data = await response.json();
        setAuctions(data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };

    fetchAuctions();
  }, []);

  const handleBid = (auctionId) => {
    if (isLoggedIn) {
      // Implement bid logic here, e.g., navigate to bid page or open a modal
      console.log(`Bidding on auction ${auctionId}`);
      // For example, you can navigate to a bidding page:
      navigate(`/auction/${auctionId}`);
    } else {
      alert('Please sign in to bid on this auction.');
      navigate('/login');
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
    <div className="container-fluid" style={{ backgroundImage: 'url(/path/to/your/image.jpg)', backgroundSize: 'cover', minHeight: '100vh' }}>
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
