import React, { useState } from 'react';
import axios from 'axios';

const RemoveFriend = ({ userId }) => {
  const [friendId, setFriendId] = useState('');

  const handleRemoveFriend = async () => {
    try {
      await axios.post('/api/remove-friend', { userId, friendId });
      alert('Friend removed successfully');
    } catch (err) {
      console.error('Error removing friend', err);
      alert('Error removing friend');
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
      <button onClick={handleRemoveFriend}>Remove Friend</button>
    </div>
  );
};

export default RemoveFriend;