import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div 
      className="d-flex align-items-center justify-content-center vh-100" 
      style={{ 
        backgroundImage: "url('/forgot-password-bg.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      
    >
      <div className="card p-4 shadow-lg" style={{ width: '400px', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <h3 className="text-center mb-3">Forgot Password</h3>
        <p className="text-center">Enter your email address and we'll send you a link to reset your password.</p>
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
          <button type="submit" className="btn btn-primary w-100 mb-2">Send Reset Link</button>
          <button type="button" className="btn btn-outline-secondary w-100" onClick={() => navigate('/signin')}>
            Back to Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;