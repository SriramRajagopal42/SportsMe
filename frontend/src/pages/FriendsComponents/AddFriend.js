import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFriendContext } from '../../hooks/useFriendsContext';
import "./Friends.css";
const AddFriend = ({ userId }) => {
  const [friendId, setFriendId] = useState('');
  const [filtered_users, setFilteredUsers] = useState([]);
  const {user} = useAuthContext();
  const {other_people, get_users } = useFriendContext();

  useEffect(()=> {
    setFilteredUsers(other_people.filter((person) => {
          return person.username.toLowerCase().includes(friendId.toLowerCase());
      }));
  }, [friendId, other_people]);

  // const get_users = async() => {
  //   try {
  //       const users =  await axios.get('http://localhost:4000/api/user', {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`
  //         }
  //       });

  //       const user_info =  await axios.get('http://localhost:4000/api/user/' + user.id, {
  //             headers: {
  //               Authorization: `Bearer ${user.token}`
  //             }
  //           });
  //       setFilteredUsers(users.data);
  //       setAllUsers(users.data);
        
  //   } catch(err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   get_users();
  // }, []);

  const handleAddFriend = async (friend_id) => {
    try {
      console.log(user);
      await axios.patch('http://localhost:4000/api/user/friends/request/' + user.id, {
            _id: {friend_id}
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      }
    );
      await get_users();
      setFriendId("");
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
      <div className="user-list">
            {filtered_users.map((filtered_user, index)=> {
          return (
            <div key={index} className="user-card">
                <span className="username" >{filtered_user.username}</span>
                <button className="add-friend-btn" onClick={() => {handleAddFriend(filtered_user._id)}}>Add Friend</button>
            </div>
          );
            })}
      </div>

    </div>
  );
};

export default AddFriend;
