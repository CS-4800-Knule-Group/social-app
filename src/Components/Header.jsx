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
            <Link to="/login" class="nav-link">Register</Link>
            <Link to="/logintwo" class="nav-link">Login</Link>
            </nav>
        </div>
    </header>
  )
}

export default Header