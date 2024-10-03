import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css';


const Header = () => {
  return (
    <header class='header'>
        <div class="header-container">
            <img className= 'logo' src='/Knule-Logo-White.png'/>
            <nav class="top-links">
            <Link to="/" class="nav-link">Home</Link>
            <Link to="/data" class="nav-link">Data</Link>
            <Link to="/profile" class="nav-link">Profile</Link>
            <Link to="/register" class="nav-link">Register</Link>
			      <Link to="/feed" class="nav-link">Feed</Link>
            </nav>
        </div>
    </header>
  )
}

export default Header