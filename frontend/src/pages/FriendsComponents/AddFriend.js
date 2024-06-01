import React, { useState } from 'react';
import axios from 'axios';

const AddFriend = ({ userId }) => {
  const [friendId, setFriendId] = useState('');

  const handleAddFriend = async () => {
    try {
      await axios.post('/api/add-friend', { userId, friendId });
      alert('Friend added successfully');
    } catch (err) {
      console.error('Error adding friend', err);
      alert('Error adding friend');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Friend ID"
        value={friendId}
        onChange={e => setFriendId(e.target.value)}
      />
      <button onClick={handleAddFriend}>Add Friend</button>
    </div>
  );
};

export default AddFriend;
