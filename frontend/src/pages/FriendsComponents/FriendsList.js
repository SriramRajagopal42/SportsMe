import React, { useEffect } from 'react';
import axios from 'axios';
import "./FriendsList.css";
import { useFriendContext } from '../../hooks/useFriendsContext';

const FriendsList = ({ userId }) => {
  const {friends} = useFriendContext();

  // useEffect(() => {
  //   const fetchFriends = async () => {
  //     try {
  //       const response = await axios.get(`/api/friends/${userId}`);
  //       setFriends(response.data);
  //     } catch (err) {
  //       console.error('Error fetching friends', err);
  //     }
  //   };

  //   fetchFriends();
  // }, [userId]);

  return (
    <div>
      <h2>Friends List</h2>
      <ul>
        {friends.map(friend => (
          <li key={friend._id}>{friend.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;