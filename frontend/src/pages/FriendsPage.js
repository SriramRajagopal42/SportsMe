import React from 'react';
import FriendsList from './FriendsList';
import AddFriend from './AddFriend';
import RemoveFriend from './RemoveFriend';

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