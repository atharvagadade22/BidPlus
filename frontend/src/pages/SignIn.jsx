import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/SignIn.css';


const SignIn = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/signin`, {
        email,
        password
      });
      if (response.status === 200) {
        alert('Sign In successful!');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.userName);
        setIsLoggedIn(true);
        navigate('/'); 
      } else {
        setError('Sign In failed!');
      }
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        setError('Network error. Please check your connection and try again.');
      } else if (error.response && error.response.status === 400) {
        setError('Invalid email or password.');
      } else {
        console.error('Error during sign in:', error);
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="signin-container d-flex justify-content-center align-items-center vh-100">
      <div className="card signin-card p-4 shadow-lg">
        <h2 className="text-center signin-title">Sign In</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Link to="/forgot-password" className="signin-link">
              Forgot password?
            </Link>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="mb-0">
            Don't have an account?{" "}
            <Link to="/signup" className="signin-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
