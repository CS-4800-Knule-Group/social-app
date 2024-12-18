import './App.css'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loginAuth = Cookies.get('loginAuth');

        if (loginAuth) {
            setLoggedIn(true);
            navigate('/feed');
            
        }
        else {
            setLoggedIn(false);
            navigate('/register');
        }
    }, []);

  return (
    <>
    <div>
      <h2 className='center-text'>Oh hi! This is</h2>
      <h1 className='center-text'>K[NUL]E</h1>
      <p className='center-text'>Join the future of social media</p>
      <div className='center-text'>
                  {loggedIn ? (
                      <p>Welcome back! <Link to="/profile">Go to your Profile</Link></p>
                  ) : (
                      <Link to={'/register'}>
                          <button>Click Here</button>
                      </Link>
                  )}
      </div>
    </div>
    </>
  )
}

export default App