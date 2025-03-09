import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from 'axios';
import "../styles/SignUp.css";


const SignUp = () => {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); 

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }
    setPasswordError("");
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/signup`, {
        name, 
        email,
        password
      });
      if (response.status === 200) {
        alert('Sign Up successful!');
        navigate('/signin'); 
      } else {
        alert('Sign Up failed!');
      }
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        alert('Network error. Please check your connection and try again.');
      } else if (error.response && error.response.status === 400) {
        setErrorMessage('User already exists. Please try logging in.');
      } else {
        console.error('Error during sign up:', error);
      }
    }
  };

  return (
    <div className="signup-container d-flex justify-content-center align-items-center vh-100">
      <div className="signup-card card p-4 shadow-lg">
        <h2 className="text-center signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label signup-label">Name</label> 
            <input
              type="text"
              className="form-control signup-input"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
              placeholder="Enter your name" 
            />
          </div>
          <div className="mb-3">
            <label className="form-label signup-label">Email Address</label>
            <input
              type="email"
              className="form-control signup-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label signup-label">Password</label>
            <input
              type="password"
              className="form-control signup-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter a strong password"
            />
          </div>
          <div className="mb-3">
            <label className="form-label signup-label">Confirm Password</label>
            <input
              type="password"
              className="form-control signup-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Re-enter your password"
            />
          </div>
          {passwordError && <div className="text-danger mb-3">{passwordError}</div>}
          {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Sign Up
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="mb-0">
            Already have an account?{" "}
            <Link to="/signin" className="signup-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
