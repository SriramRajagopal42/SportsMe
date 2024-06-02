import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';

const AddFriend = ({ userId }) => {
  const [friendId, setFriendId] = useState('');
  const [filtered_users, setFilteredUsers] = useState([]);
  const {user} = useAuthContext();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(()=> {
    setFilteredUsers(allUsers.filter((user) => {
          return user.username.includes(friendId);
      }));

        
  }, [friendId]);

  useEffect(() => {

    const get_users = async() => {
      try {
          const users =  await axios.get('http://localhost:4000/api/user', {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          });
          setAllUsers(users.data);
          setFilteredUsers(users.data);
      } catch(err) {
        console.log(err);
      }
    }
    get_users();

  }, [user])

  const handleAddFriend = async () => {
    try {
      await axios.post('http://localhost:4000/api/user', { userId, friendId });
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
        placeholder="Username"
        value={friendId}
        onChange={e => setFriendId(e.target.value)}
      />
      
      {filtered_users.map((filtered_user, index)=> {
        return (
          <div key={index}>
              {filtered_user.username}
              <button onClick={handleAddFriend}>Add Friend</button>
          </div>
        );
      })}
    </div>
  );
};

export default AddFriend;
