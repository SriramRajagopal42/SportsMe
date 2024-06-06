import React from 'react'
import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {

    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to='/'>
                    <h1>SportsMe</h1>
                </Link>
                <nav>
                    {user && (
                    <div>
                        {/*<span>{user.username}</span>*/}
                        <Link to ="/groupslist">
                            <button className="button">Search For Groups</button>
                        </Link>
                        <Link to="/friends">
                            <button className="button">Friends</button>
                        </Link>
                        <Link to ="/profile">
                            <button className="button">My Profile</button>
                        </Link>
                        <button className="button" onClick={handleClick}>Log out</button>
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
    )
}

export default Navbar