import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css';


const Header = () => {
  return (
    <header className='header'>
        <div className="header-container">
            <img className= 'logo' src='/Knule-Logo-White.png'/>
            <nav className="top-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/data" className="nav-link">Data</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <Link to="/register" className="nav-link">Register</Link>
			      <Link to="/feed" className="nav-link">Feed</Link>
            <Link to="/explore" className="nav-link">Explore</Link>
            </nav>
        </div>
    </header>
  )
}

export default Header