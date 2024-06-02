import React from 'react';
import FriendsList from './FriendsComponents/FriendsList';
import AddFriend from './FriendsComponents/AddFriend';
import RemoveFriend from './FriendsComponents/RemoveFriend';
import FriendRequests from './FriendsComponents/FriendRequests';
const FriendsPage = ({ userId }) => {
  return (
    <div>
      <h1>Friends Page</h1>
      <AddFriend userId={userId} />
      <RemoveFriend userId={userId} />
      <FriendsList userId={userId} />
      <FriendRequests />
    </div>
  );
};

export default FriendsPage;