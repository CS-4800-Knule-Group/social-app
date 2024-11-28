import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css';
import Cookies from 'js-cookie';

const Header = () => {
    const navigate = useNavigate();

    const signOut = () => {
        console.log("Logging out");
        Cookies.remove('loginAuth');

        navigate('/');
        location.reload();
    };

    const isLoggedIn = Cookies.get('loginAuth');

    return (
        <header className='header'>
            <div className="nav-section">
                <nav className="top-links">
                    <Link to="/feed" className="nav-link">Home</Link>
                    <Link to="/explore" className="nav-link">Explore</Link>
                    <Link to="/profile" className="nav-link">Profile</Link>
                    <Link to="/register" className="nav-link">Register</Link>
                    <Link to="/data" className="nav-link">Data</Link>
                    
                    {isLoggedIn && (
                        <p onClick={signOut} className="nav-link">Sign Out</p>
                    )}
                </nav>
            </div>
        </header>
  )
}

export default Header