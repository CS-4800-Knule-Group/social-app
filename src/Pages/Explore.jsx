import React, { useState, useEffect } from 'react'
import './Explore.css'
import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import LoginForm from '../Components/LoginForm'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

const Explore = () => {
 
  const apiUsers = 'https://knule.duckdns.org/users' 

  
  const [validCookie, setValidCookie] = useState(Cookies.get('loginAuth'));
  const [decryptToken, setDecryptToken] = useState(Cookies.get('loginAuth') ? jwtDecode(Cookies.get('loginAuth')) : undefined);
  const [openModal, setOpenModal] = useState(Cookies.get('loginAuth') ? false : true)
  const [users, setUsers] = useState([])

  //Compare login from a form (username & password)
  //Grant auth cookie if accepted
  const fetchLogin = async(e) => {
    e.preventDefault();
  
    const username = e.target.username.value;
    const password = e.target.password.value;
  
    try{
      const response = await fetch('https://knule.duckdns.org/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          "username": username,
          "password": password,
          
        })
    });
  
      const loginResult = await response.json();
      const inFifteen = new Date(new Date().getTime() + 2 * 60 * 1000)
      Cookies.set('loginAuth', loginResult.accessToken,
        {
          expires: inFifteen
        }
      );
      setValidCookie(Cookies.get('loginAuth'))
      
    } catch (error) {
      setValidCookie(undefined);
      console.error('Error authenticating login', error);
    }
  }
    
  //Update the valid cookie, openModal, and DecryptToken variables as validCookie is changed
  useEffect(() => {
    const login = Cookies.get('loginAuth');
      
    setValidCookie(login ? login : undefined);
    setDecryptToken(login ? jwtDecode(validCookie) : "Yeah this fucked up")
    setOpenModal(login ? false : true)
    console.log({validCookie})
    console.log({decryptToken})
    //console.log({openModal})

  }, [validCookie])

  //On Page Render, get database of users for display
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(apiUsers, {
          method: 'GET', // should be lowercase 'method'
        });

        if (!response.ok) {
          throw new Error('Could not reach /users');
        }
        const usersData = await response.json();
        setUsers(usersData); // Update the state with the fetched users
        console.log(usersData)
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };
    fetchUsers();
  }, []);  // only re-run the effect if apiEndpoint changes
  
  return (
    <div>
        {openModal && createPortal(
          <LoginForm onSubmit={fetchLogin} />,
          document.body
      )}
        
        <h1>Choose a user to view!</h1>
        
        {users.map(user => (
          <div key={user.userId} className='userCard'>
          <Link to={'/profile/'+ user.userId}>
          <div className='user'>
              <img className='profilePicture' src={user.pfp != undefined ? user.pfp : '/kirb.jpg'} height={100} width={100} />
              <div className='textInfo'>
                  <h1 className='username'>{user.fullName + " @" + user.username}</h1>
              </div>
          </div>
          </Link>
          </div>
        ))}
    </div>
  );
}



export default Explore;