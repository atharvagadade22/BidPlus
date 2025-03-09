import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCog } from 'react-icons/fa';
import ChangePassword from '../components/ChangePassword';
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', user.name);
      formData.append('email', user.email);

      await axios.put(`${process.env.REACT_APP_API_URL}/api/update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile. Please try again.');
    }
  };

  const handleDeleteProfile = async () => {
    if (window.confirm('Do you really want to delete account?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/delete-account`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        localStorage.removeItem('token');
        window.location.href = '/login';
      } catch (error) {
        console.error('Error deleting profile:', error);
        alert('Error while deleting your account, please try again');
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="position-relative mb-4">
        <h2 className="profile-heading text-center mb-4">Profile</h2>
        <div className="position-absolute top-0 end-0">
          <button 
            className="btn btn-link settings-button" 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FaCog size={24} />
          </button>
          {showDropdown && (
            <div className="dropdown-menu show position-absolute end-0 profile-dropdown">
              <button className="dropdown-item" onClick={() => document.getElementById('profileForm').classList.toggle('d-none')}>
                Edit profile
              </button>
              <button className="dropdown-item" onClick={() => setShowChangePassword(true)}>
                Change password
              </button>
              <button className="dropdown-item text-danger" onClick={handleDeleteProfile}>
                Delete account
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="profile-card">
            <div className="card-body text-center">
              <div className="profile-image-container">
                {user.profileImage ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${user.profileImage}`}
                    alt="Profile"
                    className="rounded-circle profile-image"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                ) : (
                  <div 
                    className="rounded-circle profile-image bg-secondary d-flex align-items-center justify-content-center mx-auto"
                    style={{ width: '150px', height: '150px' }}
                  >
                    <span className="text-white h1">{user.name?.charAt(0)}</span>
                  </div>
                )}
              </div>
              <h2 className="fw-bold mb-3">{user.name}</h2>
              <p className="text-muted mb-4">{user.email}</p>

              <form id="profileForm" className="profile-form d-none">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={user.name || ''}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={user.email || ''}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Profile Photo</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageChange}
                  />
                </div>
                <button type="button" className="profile-btn" onClick={handleSave}>
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  );
};

export default Profile;
