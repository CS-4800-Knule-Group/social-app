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
                    <div className='nav-link'>
                        <img className='nav-img' alt='' src='/HomeIcon.png' />
                        <Link to="/feed" className='nav-text'>Home</Link>
                    </div>

                    <div className='nav-link'>
                        <img className='nav-img' alt='' src='/ExploreIcon.png' />
                        <Link to="/explore" className='nav-text'>Explore</Link>
                    </div>

                    <div className='nav-link'>
                        <img className='nav-img' alt='' src='/HomeIcon.png' />
                        <Link to="/profile" className='nav-text'>Profile</Link>
                    </div>

                    <div className='nav-link'>
                        <img className='nav-img' alt='' src='/HomeIcon.png' />
                        <Link to="/register" className='nav-text'>Register</Link>
                    </div>

                    <div className='nav-link'>
                        <img className='nav-img' alt='' src='/HomeIcon.png' />
                        <Link to="/data" className='nav-text'>Data</Link>
                    </div>

                    {isLoggedIn && (
                        <div className='nav-link'>
                            <img className='nav-img' alt='' src='/HomeIcon.png' />
                            <Link onClick={signOut} className="nav-text">SignOut</Link>
                        </div>  
                    )}                  
                </nav>
            </div>
        </header>
  )
}

export default Header