import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement API call to backend for password reset
      alert('Password reset link has been sent to your email');
      navigate('/signin');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="forgot-password-container d-flex align-items-center justify-content-center">
      <div className="forgot-password-card">
        <h3 className="forgot-password-title text-center">Forgot Password</h3>
        <p className="forgot-password-text text-center">Enter your email address and we'll send you a link to reset your password.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-reset w-100">Send Reset Link</button>
          <button type="button" className="btn btn-back w-100" onClick={() => navigate('/signin')}>
            Back to Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;