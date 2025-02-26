import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <header className="text-center bg-light py-5 rounded shadow-sm">
        <img src="/logo.svg" alt="BidPlus Logo" className="mb-3 logo-img" width={200}/>
        <h1 className="display-4 fw-bold text-primary">Welcome to BidPlus!</h1>
        <p className="lead text-secondary">Your ultimate online auction platform.</p>
        <div className="mt-4">
          <Link to="/signup" className="btn btn-warning btn-lg fw-bold">Create Account</Link>
        </div>
      </header>

      {/* Featured Auctions Section */}
      <section className="mt-5">
        <h2 className="text-center text-primary fw-bold">Featured Auctions</h2>
        <div className="row mt-4">
          {[
            { id: 1, image: "/auction1.jpg", title: "Luxury Watch", desc: "Bid on this amazing item." },
            { id: 2, image: "/auction2.jpg", title: "Classic Car", desc: "Don't miss out on this great deal." },
            { id: 3, image: "/auction3.jpg", title: "Vintage Painting", desc: "Place your bid now!" },
          ].map((item) => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card auction-card shadow-sm">
                <img src={item.image} alt={item.title} className="card-img-top" />
                <div className="card-body text-center">
                  <h5 className="card-title text-primary fw-bold">{item.title}</h5>
                  <p className="card-text">{item.desc}</p>
                  <Link to="/auctions" className="btn btn-success">View Auction</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
