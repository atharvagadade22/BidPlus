import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
import axios from "axios";

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); 
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (token) {
      // Fetch user details if logged in
      axios.get(`${process.env.REACT_APP_API_URL}/api/users/me`, { headers: { Authorization: `Bearer ${token}` } }) 
        .then(response => {
          const fullName = response.data.name;
          const firstName = fullName.split(' ')[0]; 
          setUsername(firstName); 
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
          }
          console.error("Error fetching user details", error);
        });
    }
  }, []);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        console.log("Fetching auctions...");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auctions/random?count=3`); 
        console.log("Auctions fetched:", response.data);
        if (response.data && Array.isArray(response.data)) {
          setAuctions(response.data);
        } else {
          console.error("Unexpected response format", response.data);
        }
      } catch (error) {
        console.error("Error fetching auctions", error);
      }
    };
    fetchAuctions();
  }, []);

  return (
    <div className="container mt-5">
      {!isLoggedIn ? (
        <header className="text-center bg-light py-5 rounded shadow-sm landing-header">
          <img src="/logo2.svg" alt="BidPlus Logo" className="mb-3 logo-img" width={200}/>
          <h1 className="display-4 fw-bold text-primary">Welcome to BidPlus!</h1>
          <p className="lead text-secondary">Your ultimate online auction platform.</p>
          <div className="mt-4">
            <Link to="/signup" className="btn btn-warning btn-lg fw-bold">Create Account</Link>
          </div>
        </header>
      ) : (
        <header className="text-center bg-light py-5 rounded shadow-sm landing-header">
          <h1 className="display-4 fw-bold text-primary">
            Welcome Back, {username}!
          </h1>
          <p className="lead text-secondary">Check out the latest auctions and place your bids.</p>
          <div className="mt-4">
            <Link to="/auctions" className="btn btn-success btn-lg fw-bold">View Auctions</Link>
          </div>
        </header>
      )}
      {/* Featured Auctions Section */}
      <section className="mt-5">
        <h2 className="text-center text-primary fw-bold">Featured Auctions</h2>
        <div className="row mt-4">
          {auctions.length > 0 ? (
            auctions.map((item) => (
              <div key={item._id} className="col-md-4 mb-4">
                <div className="card auction-card shadow-sm">
                  <img 
                    src={item.image ? `${process.env.REACT_APP_API_URL}/${item.image}` : '/default-auction.png'} 
                    alt={item.item} 
                    className="card-img-top" 
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      console.log('Image failed to load:', e.target.src);
                      e.target.src = '/default-auction.png';
                    }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title text-primary fw-bold">{item.item}</h5>
                    <p className="card-text">Starting Bid: ${item.startingBid}</p>
                    <Link to={`/auction/${item._id}`} className="btn btn-success">View Auction</Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No auctions available</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
