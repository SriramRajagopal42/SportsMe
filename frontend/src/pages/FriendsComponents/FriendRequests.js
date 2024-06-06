import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFriendContext } from '../../hooks/useFriendsContext';

import "./FriendRequests.css";

const FriendRequests = () => {

  const {user} = useAuthContext();
  const {friend_requests, get_users } = useFriendContext();

//   const get_friend_requests = async() => {
//     try {
//         const cur_user_data =  await axios.get('http://localhost:4000/api/user/' + user.id, {
//             headers: {
//               Authorization: `Bearer ${user.token}`
//             }
//           });
        
//           const all_data =  await axios.get('http://localhost:4000/api/user', {
//           headers: {
//             Authorization: `Bearer ${user.token}`
//           }
//         });
//         const all_users = all_data.data;
//         const cur_user_info = cur_user_data.data;
//         if(cur_user_info && all_users) {
//             const filtered_users = all_users.filter((cur_user)=>{
//                 return cur_user_info.friend_requests.includes(cur_user._id);
//             });
//             setUserFriends(filtered_users);
//         }
//       } catch(err) {
//         console.log(err);
//       }
// }

//   useEffect( () => {
//     get_friend_requests();
//   }, [user]);
// console.log(friend_requests[0]._id);
  const handleAcceptFriendButton = async(friend_id) => {
    
    await axios.patch('http://localhost:4000/api/user/friends/accept/' + user.id, {
        friend: {friend_id}
  },
  {
    headers: {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json'
    }
  });
    await get_users();
  }

  return (
    <div>
    <h2>Friend Requests!</h2>
     {friend_requests.map((friend_request, index) => {
        return (
           <div key={index} className="user-card">
                <span className="username">{friend_request.username}</span>
                <button className="add-friend-btn" onClick={() => {handleAcceptFriendButton(friend_request._id)}}>Accept Friend Request</button>
             </div>
        );
     })}
    </div>
  );
};

export default FriendRequests;
