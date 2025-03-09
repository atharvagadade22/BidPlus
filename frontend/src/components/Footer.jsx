import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"; 
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* About Section */}
          <div className="col-md-4 mb-4">
            <h3 className="footer-title">Bid+</h3>
            <p className="footer-text">
              Bid+ is your premier online auction platform, offering a seamless and exciting bidding experience.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-4 mb-4">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="list-unstyled">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/auctions" className="footer-link">Auctions</a></li>
              <li><a href="/about" className="footer-link">About</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          {/* Contact & Socials Section */}
          <div className="col-md-4 mb-4">
            <h3 className="footer-title">Contact Us</h3>
            <p className="footer-text">support@bidplus.com</p>
            <p className="footer-text">+91 (123) 456-7890</p>

            {/* Social Media Links */}
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="#" className="footer-icon"><FaFacebookF /></a>
              <a href="#" className="footer-icon"><FaTwitter /></a>
              <a href="#" className="footer-icon"><FaInstagram /></a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center pt-3 border-top border-warning">
          <p className="footer-bottom-text">&copy; {new Date().getFullYear()} Bid+. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
