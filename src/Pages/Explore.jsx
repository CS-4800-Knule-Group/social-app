import React, { useState, useEffect } from 'react'
import './Explore.css'
import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import LoginForm from '../Components/LoginForm'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import CopyrightFooter from '../Components/CopyrightFooter.jsx'
import { useAuth } from '../authContext'
import { getUsers } from '../database'
import { TextField } from '@aws-amplify/ui-react'

const Explore = () => {
	const outletElements = document.getElementsByClassName('splitRight')
	if(outletElements.length > 0){
		document.getElementsByClassName('splitRight')[0].style.filter = 'blur(0px)';
	}
	  
  const apiUsers = 'https://knule.duckdns.org/users' 
  const {user} = useAuth();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([])
  const [userFilter, setUserFilter] = useState('');
  

  //On Page Render, get database of users for display
  const sortUsersByName = async() => {
    const userList = await getUsers();

    const sortedUsers = userList.sort((x, y) => {
      if (x.username.toLowerCase() < y.username.toLowerCase()) { return -1; }
      if (x.username.toLowerCase() > y.username.toLowerCase()) { return 1; }
      return 0
    })
    setUsers(sortedUsers);
	setFilteredUsers(sortedUsers)
  }
  useEffect(() => {
    sortUsersByName();
  }, []);

  const filterUsers = (filter) =>{
	let tempUserList = users;
	const pattern = filter.toLowerCase();

	if(userFilter != ''){
		tempUserList = tempUserList.filter( (user) => user.username.toLowerCase().includes(pattern)
			| user.fullName.toLowerCase().includes(pattern))
	}
	return tempUserList;
  }

  useEffect(() =>{
	setFilteredUsers(filterUsers(userFilter));
  }, [userFilter])

  const profileLink = (userId) => {
	if(userId == user.userId){
		return('/profile');
	}else{
		return(`/profile/${userId}`);
	}
  }
  
	return (
	<div>
		<div className='explore'>
			<h1>Search</h1>
			<div className='search'>
				<input
				className='searchBar'
				id="outlined-basic"
				variant="outlined"
				placeholder='Search'
				onChange={(e) => setUserFilter(e.target.value)}
				/>
			</div>
			{filteredUsers.length < 1 && <div>
				<br/>
				<p>No users matched your search</p>
				</div>}
			{filteredUsers.map(user => (
				<div key={user.userId} className='userCard'>
					<Link className='profileLink' to={profileLink(user.userId)}>
						<div className='user'>
							<img className='profilePicture' src={user.pfp != undefined ? user.pfp : '/kirb.jpg'} height={100} width={100} />
							<div className='profileInfo'>
								<div className='profileNames'>
									<h1 className='user'>{" @" + user.username}</h1>
									<h2 className='full'>{user.fullName}</h2>
								</div>
								<p className='bio'>{user.bio != "" ? user.bio : "No bio"}</p>
							</div>
						</div>
					</Link>
					<div className='visitSec'>
						<Link className='profileLink' to={profileLink(user.userId)}>
							<p className='visitButton'>VISIT</p>
						</Link>
					</div>
				</div>
			))}
		</div>
		<div className='footer-break'></div>
		<CopyrightFooter/>
	</div>
	);
}



export default Explore;