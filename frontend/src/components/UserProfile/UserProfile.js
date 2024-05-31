import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  // Fetch user data on component mount
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
          // Set both userData and formData with the fetched data
          setUserData(data);
          setFormData({
            username: data.username,
            email: data.email
          });
        } catch (err) {
          setError(err.message);
        }
      };
      fetchUserData();
    }
  }, [user]);

  // Handle input change, update formData state
  const handleInputChange = (e) => { 
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/user/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(formData)
      });
      console.log(response);
      if (!response.ok) {
        console.log("we're cooked");
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const updatedData = await response.json();
      setUserData(updatedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {error && <p>{error}</p>}
      {userData ? (
        <>
          {isEditing ? (
            <form onSubmit={handleFormSubmit}>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          ) : (
            <>
              <p>Username: {userData.username}</p>
              <p>Email: {userData.email}</p>
              <button onClick={() => setIsEditing(true)}>Edit</button>
            </>
          )}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;

// username, email, gender, favorite sport, year, major