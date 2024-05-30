import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/user/${user.id}`, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });

          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }

          const data = await response.json();

          setUserData(data);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchUserData();
    }
  }, [user]);

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {error && <p>{error}</p>}
      {userData ? (
        <>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          {/* Display the user ID */}
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