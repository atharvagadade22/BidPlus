import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import './Header.css'; // Import custom CSS

const Header = () => {
  return (
    <Navbar expand="lg" className="bg-primary shadow py-3" variant="dark">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/">
          <img src="/icon.svg" alt="BidPlus Logo" className="logo-img" />
        </Navbar.Brand>

        {/* Mobile Toggle Button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navigation Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="nav-link-custom">Home</Nav.Link>
            {/* <Nav.Link href="/about" className="nav-link-custom">About</Nav.Link> */}
            {/* <Nav.Link href="/contact" className="nav-link-custom">Contact</Nav.Link> */}
            <Nav.Link href="/auctions" className="nav-link-custom">Auctions</Nav.Link>
            <Nav.Link href="/signin" className="nav-link-custom">Sign In</Nav.Link>
            <Nav.Link href="/signup" className="btn btn-warning fw-bold px-3 ms-2 nav-link-custom">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
