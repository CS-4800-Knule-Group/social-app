import React from 'react'
import logo from '/Knulle-Logo.png';
import { Link } from 'react-router-dom'
import './Header.css';


const Header = () => {
  return (
    <><div>
        <Link to={'/'}>
            <img src={logo} alt='K[NULL]E' className='logo'/>
        </Link>
        </div>
        <div>
        <header className='header'>
            <div className='header-container'>
                <div className='head-left'>
                    <Link to={'/'}>
                        <a className='head-text'>Home</a>
                    </Link>
                </div>
                <div className='head-right'>
                    <Link to={'/data'}>
                        <a className='head-text'>Data</a>
                    </Link>
                    
                    <Link to={'/profile'}>
                        <a className='head-text'>Profile</a>
                    </Link>
                    <Link to={'/login'}>
                        <a className='head-text'>Login</a>
                    </Link>
                </div>
            </div>
        </header>
    </div>
    </>
  )
}

export default Header