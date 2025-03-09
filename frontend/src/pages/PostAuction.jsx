import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostAuction = () => {
  const [item, setItem] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to post an auction.');
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('item', item);
      formData.append('startingBid', startingBid);
      formData.append('endTime', endTime);
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/post-auction`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        alert('Auction posted successfully!');
        navigate('/auctions');
      } else {
        alert('Failed to post auction');
      }
    } catch (error) {
      console.error('Error posting auction:', error);
      alert('An error occurred while posting the auction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Post a New Auction</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Post Auction'}
        </button>
      </form>
    </div>
  );
};

export default PostAuction;
