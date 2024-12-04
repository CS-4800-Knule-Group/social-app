import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css';
import Cookies from 'js-cookie';
import { useAuth } from '../authContext'; // Import useAuth for user data
import { getUsers } from '../database'; // Make sure you have the correct path
import { userById } from '../dataFilters'; // Make sure you have the correct path

const HeaderProfile = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [currUser, setCurrUser] = useState();


    const filterUser = async () => {
        const usersData = await getUsers();
		const filteredUsers = userById(usersData, user.userId)
		setCurrUser(filteredUsers)
    }

    const signOut = () => {
        console.log("Logging out");
        Cookies.remove('loginAuth');

        navigate('/');
        location.reload();
    };

	useEffect(() => {
		filterUser();
	}, []);

    const isLoggedIn = Cookies.get('loginAuth');

    return (
        <header className='header'>
            <div className='dividerTop'></div>
            <div className='profSection'>
                <img className='profPic' src={currUser ? currUser.pfp : '/kirb.jpg'} alt="Profile Picture" height={100} width={100} />
                <div className='profText'>
    		        <h3 className='full'>{"@" + (currUser ? currUser.username : "User")}</h3>
                    <h1 className='user'>{currUser ? currUser.fullName : "Full Name"}</h1>
                </div>
            </div>
        </header>
  )
}

export default HeaderProfile