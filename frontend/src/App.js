import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

//pages & components
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile/UserProfile'
import GroupsList from './pages/GroupsList';
import Navbar from './components/Navbar';
import FriendsPage from './pages/FriendsPage';

function App() {
  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route 
              path = '/'
              element = {user ? <Home /> : <Navigate to={'/login'} />}
            />
            <Route 
              path = '/login'
              element = {!user ? <Login /> : <Navigate to={'/'} />}
            />
            <Route 
              path = '/signup'
              element = {!user ? <Signup /> : <Navigate to={'/'} />}
            />
            <Route 
              path="/profile" 
              element= {user ? <UserProfile /> : <Navigate to={'/'} />}
            />
            <Route 
              path = '/groupslist'
              element = {user ? <GroupsList /> : <Navigate to={'/'} />}
            />
            <Route 
              path='/friends'
              element={user ? <FriendsPage userId={user._id} /> : <Navigate to={'/'} />} // Use FriendsPage correctly
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
