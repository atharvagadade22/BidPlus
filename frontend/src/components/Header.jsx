import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../styles/Header.css";
const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserProfileImage = async () => {
      if (isLoggedIn) {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProfileImage(response.data.profileImage);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
          }
          console.error('Error fetching user profile image:', error);
        }
      }
    };

    fetchUserProfileImage();
  }, [isLoggedIn]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="navbar shadow-sm py-2" variant="light">
      <Container className="px-4">
        <div className="d-flex justify-content-between align-items-center w-100">
          <Navbar.Brand href="/" className="me-0">
            <img src="/logo2.svg" alt="BidPlus Logo" className="logo-img" style={{ maxHeight: '40px' }}/>
          </Navbar.Brand>
          
          {isLoggedIn && (
            <div className="order-lg-3">
              <img
                src={profileImage ? `${process.env.REACT_APP_API_URL}/${profileImage}` : "/default-profile.png"}
                alt="Profile"
                className="rounded-circle profile-img"
                width="40"
                height="40"
                onClick={() => navigate('/profile')}
                style={{ cursor: 'pointer', objectFit: 'cover' }}
              />
            </div>
          )}
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-2" />
        </div>

        <Navbar.Collapse id="basic-navbar-nav" className="mt-2 mt-lg-0">
          <Nav className="mx-auto text-center">
            <Nav.Link href="/" className="nav-link-custom px-3">Home</Nav.Link>
            <Nav.Link href="/auctions" className="nav-link-custom px-3">Auctions</Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link href="/post-auction" className="nav-link-custom px-3">Post Auction</Nav.Link>
                <Button variant="outline-danger" className="mt-2 mt-lg-0 mx-3" onClick={handleSignOut}>Sign Out</Button>
              </>
            ) : (
              <>
                <Nav.Link href="/signin" className="nav-link-custom px-3">Sign In</Nav.Link>
                <Nav.Link href="/signup" className="btn btn-warning fw-bold px-4 mt-2 mt-lg-0 mx-3">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
