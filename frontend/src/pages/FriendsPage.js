import React from 'react';
import FriendsList from './FriendsComponents/FriendsList';
import AddFriend from './FriendsComponents/AddFriend';
import RemoveFriend from './FriendsComponents/RemoveFriend';

const FriendsPage = ({ userId }) => {
  return (
    <div>
      <h1>Friends Page</h1>
      <AddFriend userId={userId} />
      <RemoveFriend userId={userId} />
      <FriendsList userId={userId} />
    </div>
  );
};

export default FriendsPage;