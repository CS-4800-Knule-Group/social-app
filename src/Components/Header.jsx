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

                    <div onClick={() => navigate("/feed")} data-testid='Home' className='nav-link'>
                        <img className='nav-img' alt='' src='/HomeIcon.png' />
                        <Link to="/feed" className='nav-text'>Home</Link>
                    </div>

                    <div onClick={() => navigate("/explore")} className='nav-link'>
                        <img className='nav-img' alt='' src='/ExploreIcon.png' />
                        <Link to="/explore" className='nav-text'>Explore</Link>
                    </div>

                    <div onClick={() => navigate("/profile")} className='nav-link'>
                        <img className='nav-img' alt='' src='/ProfileIcon.png' />
                        <Link to="/profile" className='nav-text'>Profile</Link>
                    </div>

                    <div onClick={() => navigate("/tempMsg")} className='nav-link'>
                        <img className='nav-img' alt='' src='/MessageHeaderIcon.png' />
                        <Link to="/tempMsg" className='nav-text'>DM's</Link>
                    </div>
                </nav>
            </div>
        </header>
  )
}

export default Header