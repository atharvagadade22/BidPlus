import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostAuction = () => {
  const [item, setItem] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [endTime, setEndTime] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auctionData = { item, startingBid, endTime };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auctions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(auctionData),
      });

      if (response.ok) {
        alert('Auction posted successfully!');
        navigate('/auctions');
      } else {
        alert('Failed to post auction');
      }
    } catch (error) {
      console.error('Error posting auction:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Post a New Auction</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Item</label>
          <input
            type="text"
            className="form-control"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Starting Bid</label>
          <input
            type="number"
            className="form-control"
            value={startingBid}
            onChange={(e) => setStartingBid(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">End Time</label>
          <input
            type="datetime-local"
            className="form-control"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Post Auction</button>
      </form>
    </div>
  );
};

export default PostAuction;
