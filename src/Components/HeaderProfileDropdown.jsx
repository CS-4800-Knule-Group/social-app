import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css';
import Cookies from 'js-cookie';

const HeaderProfileDropdown = () => {
    const navigate = useNavigate();

    const signOut = () => {
        console.log("Logging out");
        Cookies.remove('loginAuth');

        navigate('/');
        location.reload();
    };

    const isLoggedIn = Cookies.get('loginAuth');

    return (
        <div>
            {isLoggedIn && (
                <div className='dropdown-content'>
                    <p onClick={() => navigate("/profile")} className='dropdown-text'>Profile</p>
                    <p onClick={signOut} className='dropdown-text'>Log Out</p>
                </div>
            )}
        </div>
  )
}

export default HeaderProfileDropdown