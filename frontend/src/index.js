import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GroupsContextProvider } from './context/GroupContext';
import { AuthContextProvider } from './context/AuthContext';
import { FriendsContextProvider } from './context/FriendContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GroupsContextProvider>
      <FriendsContextProvider>
        <App />
        </FriendsContextProvider>
      </GroupsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);