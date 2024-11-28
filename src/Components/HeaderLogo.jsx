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
            <div className='logo-section'>
                <Link to="/">
                    <div className='logo-bg'>
                        <img className='logo' alt='Knule Logo' src='/Knule-Logo-White.png' />
                    </div>
                </Link>
            </div>
        </header>
  )
}

export default Header