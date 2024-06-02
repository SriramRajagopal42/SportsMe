import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';

const FriendRequests = () => {

  const {user} = useAuthContext();
  const [userFriends, setUserFriends] = useState([]);

  useEffect( () => {

    const get_friends = async() => {
        try {
            const cur_user_data =  await axios.get('http://localhost:4000/api/user/' + user.id, {
                headers: {
                  Authorization: `Bearer ${user.token}`
                }
              });
            
              const all_data =  await axios.get('http://localhost:4000/api/user', {
              headers: {
                Authorization: `Bearer ${user.token}`
              }
            });
            const all_users = all_data.data;
            const cur_user_info = cur_user_data.data;
            if(cur_user_info && all_users) {
                const filtered_users = all_users.filter((cur_user)=>{
                    return cur_user_info.friend_requests.includes(cur_user._id);
                });
                setUserFriends(filtered_users);
            }
          } catch(err) {
            console.log(err);
          }
    }
    get_friends();
  }, [user])

  return (
    <div>
     {userFriends.map((friend_request, index) => {
        return (
           <div key={index}>
                {friend_request.username}
             </div>
        );
     })}
    </div>
  );
};

export default FriendRequests;
