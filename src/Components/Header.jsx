import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import './Header.css';
import Cookies from 'js-cookie';


const Header = () => {

  const [validCookie, setValidCookie] = useState(Cookies.get('loginAuth'));

  useEffect(() => {
    const loggedIn = Cookies.get('loginAuth')
    setValidCookie(loggedIn);
  }, []);

  return (
    <header className='header'>
        <div className="header-container">
            <img className= 'logo' src='/Knule-Logo-White.png'/>
            <nav className="top-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/data" className="nav-link">Data</Link>
            <Link to="/register" className="nav-link">Register</Link>
            {!validCookie ? 
            <Link to="/profile" className="nav-link">Profile</Link> : 
            <button>Logout</button>}
            </nav>
        </div>
    </header>
  )
}

export default Header