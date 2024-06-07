import React/*, { useEffect }*/ from 'react';
import axios from 'axios';
import "./Friends.css";
import { useFriendContext } from '../../hooks/useFriendsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom';

const FriendsList = ({ userId }) => {
  const {friends} = useFriendContext();
  const {user} = useAuthContext();
  const {get_users } = useFriendContext();

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
  const removeFriend = async (friend_id) => {
    try {
      await axios.patch('http://localhost:4000/api/user/friends/remove/' + user.id, {
        friend: {friend_id}
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });
      await get_users();
      alert('Friend removed successfully');
    } catch (err) {
      console.error('Error removing friend', err);
      alert('Error removing friend');
    }
  };

  return (
    <div>
      <h2>Friends List</h2>
      <div className="user-list">
        {friends.map((friend, index)=> {
          return (
            <div key={index} className="user-card">
                <span className="username" ><Link to={`/profile/${friend._id}`} style={{ textDecoration: 'none', color: 'white' }} >  {friend.username} </Link></span>
                <button className="remove-friend-btn" onClick={() => {removeFriend(friend._id)}}>Remove Friend</button>
            </div>
          );
       })}
</div>
    </div>
  );
};




export default FriendsList;