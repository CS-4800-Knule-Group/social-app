import React, { useState, useEffect } from 'react'
import './Explore.css'
import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import LoginForm from '../Components/LoginForm'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../authContext'

const Explore = () => {
 
  const apiUsers = 'https://knule.duckdns.org/users' 
  const {user} = useAuth();

  const [users, setUsers] = useState([])

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
    <div className='explore'>
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