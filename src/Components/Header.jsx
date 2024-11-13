import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css';


const Header = () => {
  return (
    <header className='header'>
        <div className="header-container">
            <Link to="/">
                <img className= 'logo' src='/Knule-Logo-White.png'/>
            </Link>
            <nav className="top-links">
            <Link to="/profile" className="nav-link">Profile</Link>
            <Link to="/feed" className="nav-link">Feed</Link>
            <Link to="/explore" className="nav-link">Explore</Link>
            <Link to="/register" className="nav-link">Register</Link>
            <Link to="/data" className="nav-link">Data</Link>
            </nav>
        </div>
    </header>
  )
}

export default Header