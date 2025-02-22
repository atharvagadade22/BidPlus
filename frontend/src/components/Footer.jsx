import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"; // Import social media icons

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-4 mt-auto">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* About Section */}
          <div className="col-md-4 mb-4">
            <h3 className="text-warning fw-bold">Bid+</h3>
            <p className="mb-0">
              Bid+ is your premier online auction platform, offering a seamless and exciting bidding experience.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-4 mb-4">
            <h3 className="text-warning fw-bold">Quick Links</h3>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none footer-link">Home</a></li>
              <li><a href="/auctions" className="text-white text-decoration-none footer-link">Auctions</a></li>
              <li><a href="/about" className="text-white text-decoration-none footer-link">About</a></li>
              <li><a href="/contact" className="text-white text-decoration-none footer-link">Contact</a></li>
            </ul>
          </div>

          {/* Contact & Socials Section */}
          <div className="col-md-4 mb-4">
            <h3 className="text-warning fw-bold">Contact Us</h3>
            <p className="mb-1">support@bidplus.com</p>
            <p className="mb-3">+91 (123) 456-7890</p>

            {/* Social Media Links */}
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="#" className="text-white fs-4 footer-icon"><FaFacebookF /></a>
              <a href="#" className="text-white fs-4 footer-icon"><FaTwitter /></a>
              <a href="#" className="text-white fs-4 footer-icon"><FaInstagram /></a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center pt-3 border-top border-warning">
          <p className="mb-0">&copy; {new Date().getFullYear()} Bid+. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
