import React, { useEffect, useState } from 'react';
import './Header.css';
import Cookies from 'js-cookie';
import { useAuth } from '../authContext';
import { getUsers } from '../database';
import { userById } from '../dataFilters';

const HeaderProfile = () => {
    const { user } = useAuth();
    const [currUser, setCurrUser] = useState(null);

    const filterUser = async () => {
        const usersData = await getUsers();
        const filteredUsers = userById(usersData, user.userId);
        setCurrUser(filteredUsers);
    }

    useEffect(() => {
        if (user) { // Check if user exists before calling filterUser
            filterUser();
        }
    }, [user]); // Re-run filterUser if user changes

    const isLoggedIn = Cookies.get('loginAuth');

    if (currUser === null) {
        // While fetching user data or logged out profile is empty
        return
    }

    return (
        <header className='header'>
            <div className='dividerTop'></div>
            <div className='profSection'>
                <img className='profPic' src={currUser.pfp || '/kirb.jpg'} alt="Profile Picture" height={100} width={100} />
                <div className='profText'>
                    <h3 className='fullN'>{"@" + currUser.username}</h3>
                    <h1 className='userN'>{currUser.fullName}</h1>
                </div>
            </div>
        </header>
    );
}

export default HeaderProfile;
