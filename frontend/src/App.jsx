import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Auctions from './pages/Auctions';
import PostAuction from './pages/PostAuction';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import AuctionDetails from './pages/AuctionDetails';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} onSignOut={handleSignOut} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {!isLoggedIn && <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />}
        {!isLoggedIn && <Route path="/signup" element={<SignUp />} />}
        <Route path="/auctions" element={<Auctions />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/post-auction" element={<PostAuction />} />
        <Route path="/auction/:id" element={<AuctionDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
