import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GroupsContextProvider } from './context/GroupContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GroupsContextProvider>
        <App />
      </GroupsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);