import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { ID } = useParams();
  const { user } = useAuthContext();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    gender: '',
    pronouns: '',
    fav_sport: '',
    year: '',
    major: '',
    height: '',
    skill_level: ''
  });

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/user/${ID}`, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          const data = await response.json();
          setUserData(data);
          setFormData({
            username: data.username,
            email: data.email,
            gender: data.gender || '',
            pronouns: data.pronouns || '',
            fav_sport: data.fav_sport || '',
            year: data.year || '',
            major: data.major || '',
            height: data.height || '',
            skill_level: data.skill_level || ''
          });
        } catch (err) {
          setError(err.message);
        }
      };
      fetchUserData();
    }
  }, [user, ID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
      if (!response.ok) {
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
      {error && <p className="error">{error}</p>}
      {userData ? (
        <>
          {isEditing ? (
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>
                  Username:
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Gender:
                  <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Pronouns:
                  <input
                    type="text"
                    name="pronouns"
                    value={formData.pronouns}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Favorite Sport:
                  <input
                    type="text"
                    name="fav_sport"
                    value={formData.fav_sport}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Year:
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Major:
                  <input
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Height:
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Skill Level:
                  <input
                    type="text"
                    name="skill_level"
                    value={formData.skill_level}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          ) : (
            <div className="profile-details">
              <p><strong>Username:</strong> {userData.username}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Gender:</strong> {userData.gender}</p>
              <p><strong>Pronouns:</strong> {userData.pronouns}</p>
              <p><strong>Favorite Sport:</strong> {userData.fav_sport}</p>
              <p><strong>Year:</strong> {userData.year}</p>
              <p><strong>Major:</strong> {userData.major}</p>
              <p><strong>Height:</strong> {userData.height}</p>
              <p><strong>Skill Level:</strong> {userData.skill_level}</p>
              {ID === user.id && <button onClick={() => setIsEditing(true)}>Edit</button>}
            </div>
          )}
        </>
      ) : (
        <p className="loading">Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;