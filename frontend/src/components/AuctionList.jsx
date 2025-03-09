import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/custom.css';

const AuctionList = ({ auctions, handleBid, isLoggedIn }) => {
  return (
    <section className="mt-5">
      <div className='row mt-4'>
        {auctions.length > 0 ? (
          auctions.map((auction) => (
            <div key={auction._id} className="col-md-4 mb-4">
              <div className="card auction-card shadow-sm">
                <img
                  src={auction.image ? `${process.env.REACT_APP_API_URL}/${auction.image}` : '/default-auction.png'}
                  alt={auction.item}
                  className="card-img-top"
                  style={{height: '200px', objectFit: 'cover'}}
                  onError={(e) => {
                    console.log('Image failed to load', e.target.src);
                    e.target.src = '/default-auction.png';
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title text-primary fw-bold">{auction.item}</h5>
                  <p className="card-text">Starting Bid: ${auction.startingBid}</p>
                  <p className="card-text">Current Bid: ${auction.currentBid}</p>                  
                  <p className="card-text">Highest Bidder: {auction.highestBidder || 'No bids yet'}</p>
                  <small>End Time: {new Date(auction.endTime).toLocaleString()}</small>
                  <br />
                  <Link to={`/auction/${auction._id}`} className="btn btn-success mt-2">View Auction</Link>
                  <div className="mt-2">
                    {isLoggedIn ? (
                      <button 
                        className="btn btn-warning" 
                        onClick={() => handleBid(auction._id)}
                      >
                        Place Bid
                      </button>
                    ) : (
                      <span className="text-warning">Sign in to bid</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No auctions available.</p>
        )}
      </div>
    </section>
  );
};

export default AuctionList;
