import React from 'react';
import FriendsList from './FriendsComponents/FriendsList';
import AddFriend from './FriendsComponents/AddFriend';
import RemoveFriend from './FriendsComponents/RemoveFriend';
import FriendRequests from './FriendsComponents/FriendRequests';
import { FriendsContextProvider } from '../context/FriendContext';


const FriendsPage = ({ userId }) => {
  return (
    <FriendsContextProvider>
      <div>
        <h1>Friends Page</h1>
        <AddFriend userId={userId} />
        {/* <RemoveFriend userId={userId} /> */}
        <FriendRequests />
        <FriendsList userId={userId} />
      </div>
    </FriendsContextProvider>
  );
};

export default FriendsPage;