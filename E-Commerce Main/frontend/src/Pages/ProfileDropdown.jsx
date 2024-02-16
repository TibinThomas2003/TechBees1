// ProfileDropdown.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProfileDropdown = ({ handleLogout }) => {
  return (
    <div className="profile-dropdown">
      <Link to="/profile">Profile</Link>
      <div onClick={handleLogout}>Logout</div>
    </div>
  );
};

export default ProfileDropdown;
