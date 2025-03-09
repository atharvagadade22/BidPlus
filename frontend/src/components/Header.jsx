import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { alignPropType } from "react-bootstrap/esm/types";

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
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Brand href="/" className="me-auto">
          <img src="/logo.svg" alt="BidPlus Logo" className="logo-img"/>
        </Navbar.Brand>
          {isLoggedIn && (
            <img
              src={profileImage || "/default-profile.png"}
              alt="Profile"
              className="rounded-circle profile-img mb-2"
              width="40"
              height="40"
              onClick={() => navigate('/profile')}
              style={{ cursor: 'pointer' }}
            />
          )}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav className="nav-links">
            <Nav.Link href="/" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link href="/auctions" className="nav-link-custom">Auctions</Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link href="/post-auction" className="nav-link-custom">Post Auction</Nav.Link>
                <Button variant="outline-danger" onClick={handleSignOut}>Sign Out</Button>
              </>
            ) : (
              <>
                <Nav.Link href="/signin" className="nav-link-custom">Sign In</Nav.Link>
                <Nav.Link href="/signup" className="btn btn-warning fw-bold px-3 ms-2 nav-link-custom">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
