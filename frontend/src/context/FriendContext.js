import {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
export const FriendsContext = createContext();


export const FriendsContextProvider = ({children}) => {
    const[friends, setFriends] = useState([]);
    const[friend_requests, setFriendRequests] = useState([]);
    const[other_people, setOtherPeople] = useState([]);
    const {user} = useAuthContext();


    const get_users = async() => {
        try {
            const users =  await axios.get('http://localhost:4000/api/user', {
              headers: {
                Authorization: `Bearer ${user.token}`
              }
            });
            const cur_user_info =  await axios.get('http://localhost:4000/api/user/' + user.id, {
                  headers: {
                    Authorization: `Bearer ${user.token}`
                  }
                });
            const all_users = users.data;
            const user_info = cur_user_info.data;
            setOtherPeople(all_users.filter((person) => {
                return !person.friend_requests.includes(user.id) && person._id !==user.id && !person.friends.includes(user.id)
            }));
            setFriends(all_users.filter((person)=> {
                return user_info.friends.includes(person._id);
            }));
            setFriendRequests(all_users.filter((person)=> {
                return user_info.friend_requests.includes(person._id);
            }));
        } catch(err) {
          console.log(err);
        }
      }

    const contextStuff = {
        friends,
        friend_requests,
        other_people,
        get_users
    }

    

    useEffect(()=> {
        get_users();
    },[]);

    return (
        <FriendsContext.Provider value={contextStuff}>
            {children}
        </FriendsContext.Provider>
    );

}