import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClick = () => {
    logout();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo-container">
          <Link to='/'>
            <h1>SportsMe</h1>
          </Link>
        </div>
        <nav>
          {user && (
            <div>
              {/* <span>{user.username}</span> */}
              <div className="dropdown">
                <button className="button" onClick={toggleDropdown}>
                  Menu
                </button>
                {dropdownOpen && (
                  <div className="dropdown-content">
                    <Link to="/groupslist" onClick={() => setDropdownOpen(false)}>
                      <div className="dropdown-item">Search For Groups</div>
                    </Link>
                    <Link to="/friends" onClick={() => setDropdownOpen(false)}>
                      <div className="dropdown-item">Friends</div>
                    </Link>
                    <Link to={`/profile/${user.id}`} onClick={() => setDropdownOpen(false)}>
                      <div className="dropdown-item">My Profile</div>
                    </Link>
                    <Link to={`/profile/${user.id}`} onClick={() => setDropdownOpen(false)}>
                      <div className="dropdown-item" onClick={handleClick}>Log out</div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
