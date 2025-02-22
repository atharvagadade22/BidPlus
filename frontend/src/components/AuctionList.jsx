import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Add Bootstrap CSS

const AuctionList = ({ auctions, handleBid, isLoggedIn }) => {
  return (
    <ul className="list-group" style={{ backgroundImage: 'url(/path/to/your/image.jpg)', backgroundSize: 'cover' }}>
      {auctions.map((auction) => (
        <li key={auction._id} className="list-group-item auction-item">
          <div className="auction-info">
            <h3>{auction.title}</h3>
            <p>{auction.description}</p>
            <p>Current Bid: ${auction.currentBid}</p>
          </div>
          {isLoggedIn ? (
            <button className="btn btn-success" onClick={() => handleBid(auction._id)}>Place Bid</button>
          ) : (
            <span className="text-warning">Sign in to bid</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default AuctionList;
