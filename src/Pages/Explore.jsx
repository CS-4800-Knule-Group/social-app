import React, { useState, useEffect } from 'react'
import './Explore.css'
import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import LoginForm from '../Components/LoginForm'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../authContext'
import { getUsers } from '../database'

const Explore = () => {
 
  const apiUsers = 'https://knule.duckdns.org/users' 
  const {user} = useAuth();

  const [users, setUsers] = useState([])

  //On Page Render, get database of users for display
  const sortUsersByName = async() => {
    const userList = await getUsers();

    const sortedUsers = userList.sort((x, y) => {
      if (x.username.toLowerCase() < y.username.toLowerCase()) { return -1; }
      if (x.username.toLowerCase() > y.username.toLowerCase()) { return 1; }
      return 0
    })
    setUsers(sortedUsers);
  }
  useEffect(() => {
    sortUsersByName();
  }, []);  // only re-run the effect if apiEndpoint changes
  
	return (
	<div className='explore'>
		<h1>Choose a user to view!</h1>
		
		{users.map(user => (
			<div key={user.userId} className='userCard'>
				<Link to={'/profile/'+ user.userId}>
					<div className='user'>
						<img className='profilePicture' src={user.pfp != undefined ? user.pfp : '/kirb.jpg'} height={100} width={100} />
						<div className='profileInfo'>
							<h1 className='username'>{" @" + user.username}</h1>
							<h2>{user.fullName}</h2>
						</div>
					</div>
					<p>{user.bio}</p>
				</Link>
			</div>
		))}
	</div>
	);
}



export default Explore;