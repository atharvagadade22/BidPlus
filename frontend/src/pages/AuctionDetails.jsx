import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/AuctionDetails.css';

const AuctionDetails = () => {
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const fetchAuctionDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auction/${id}`);
        setAuction(response.data);
        setBidAmount(response.data.currentBid + 1); // Set default bid to current bid + 1
      } catch (error) {
        console.error('Error fetching auction details:', error);
        setError('Failed to load auction details');
      }
    };

    fetchAuctionDetails();
  }, [id]);

  const handleBid = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Please sign in to place a bid');
      navigate('/signin');
      return;
    }

    if (bidAmount <= auction.currentBid) {
      setError('Bid amount must be higher than current bid');
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
        `${process.env.REACT_APP_API_URL}/api/bid/${id}`,
        {
          bidValue: parseFloat(bidAmount),
          bidder: userName
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.status === 200) {
        // Refresh auction details
        const updatedAuction = await axios.get(`${process.env.REACT_APP_API_URL}/api/auction/${id}`);
        setAuction(updatedAuction.data);
        setError('');
        alert('Bid placed successfully!');
      }
    } catch (error) {
      console.error('Error placing bid:', error);
      setError('Failed to place bid. Please try again.');
    }
  };

  if (error) {
    return <div className="auction-container loading-container text-danger">{error}</div>;
  }

  if (!auction) {
    return <div className="auction-container loading-container">Loading...</div>;
  }

  return (
    <div className="auction-container">
      <div className="row">
        <div className="col-md-6">
          <div className="auction-image-container">
            <img
              src={auction.image ? `${process.env.REACT_APP_API_URL}/${auction.image}` : '/default-auction.png'}
              alt={auction.item}
              className="auction-image"
            />
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="auction-title">{auction.item}</h2>
          <div className="auction-details-card">
            <div className="card-body">
              <p className="card-text"><strong>Starting Bid:</strong> ${auction.startingBid}</p>
              <p className="card-text"><strong>Current Bid:</strong> ${auction.currentBid}</p>
              <p className="card-text"><strong>Highest Bidder:</strong> {auction.highestBidder || 'No bids yet'}</p>
              <p className="card-text"><strong>Auction Ends:</strong> {new Date(auction.endTime).toLocaleString()}</p>
              
              {isLoggedIn && (
                <form onSubmit={handleBid} className="bid-form">
                  <div className="form-group">
                    <label htmlFor="bidAmount">Place your bid ($):</label>
                    <input
                      type="number"
                      className="form-control"
                      id="bidAmount"
                      value={bidAmount}
                      onChange={(e) => {
                        setBidAmount(e.target.value);
                        setError('');
                      }}
                      min={auction.currentBid + 1}
                      step="0.01"
                      required
                    />
                    {parseFloat(bidAmount) <= auction.currentBid && (
                      <small className="error-text">
                        Bid amount must be greater than ${auction.currentBid}
                      </small>
                    )}
                  </div>
                  <button 
                    type="submit" 
                    className="bid-button"
                    disabled={parseFloat(bidAmount) <= auction.currentBid}
                  >
                    Place Bid
                  </button>
                </form>
              )}
              
              {!isLoggedIn && (
                <div className="signin-alert">
                  Please <button onClick={() => navigate('/signin')} className="btn-link">sign in</button> to place a bid
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetails; 