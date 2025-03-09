import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';
import '../styles/PostAuction.css';

const PostAuction = () => {
  const [item, setItem] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  // Function to get minimum allowed datetime
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Validate and set end time
  const handleEndTimeChange = (e) => {
    const selectedDateTime = new Date(e.target.value);
    const currentDateTime = new Date();
    
    if (selectedDateTime <= currentDateTime) {
      alert('Please select a future date and time.');
      return;
    }
    
    setEndTime(e.target.value);
  };

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
    <div className="post-auction-container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="logo-container text-center mb-4">
            <img src={logo} alt="BidPlus Logo" style={{ height: '60px' }} />
          </div>
          <div className="card post-auction-card">
            <div className="post-auction-header">
              <h2>Post a New Auction</h2>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                  <label className="form-label fw-bold">Item Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder="Enter item name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Starting Bid ($)</label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      value={startingBid}
                      onChange={(e) => setStartingBid(e.target.value)}
                      placeholder="Enter starting bid amount"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Auction End Time</label>
                  <input
                    type="datetime-local"
                    className="form-control form-control-lg"
                    value={endTime}
                    onChange={handleEndTimeChange}
                    min={getMinDateTime()}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Item Image</label>
                  <input
                    type="file"
                    className="form-control form-control-lg"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Posting...
                      </>
                    ) : 'Post Auction'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAuction;
