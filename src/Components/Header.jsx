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
                <nav>
                    <ul>
                        <Link to={'/'}>
                            <li><a>Home</a></li>
                        </Link>
                        <Link to={'/profile'}>
                            <li><a>Profiles</a></li>
                        </Link>
                    </ul>
                </nav>
            </div>
        </header>
    </div>
    </>
  )
}

export default Header