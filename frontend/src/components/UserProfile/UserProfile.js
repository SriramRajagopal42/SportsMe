import React from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { user } = useAuthContext();

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {user ? (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          {/* Add more user information here if needed */}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;

// username, email, gender, favorite sport, year, major