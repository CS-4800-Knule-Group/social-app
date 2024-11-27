import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './LoginForm.css';

const FollowingList = ({ following, onClose }) => {
    const getProfilePicture = (userId) => {
        const user = following.find(u => u.userId === userId)
        return user ? user.pfp : '/defaultProfilePic.jpg' // Fallback profile picture
    }

    return (
        <div className="login-form">
            <p onClick={onClose}>X</p>
            {following.map(following => (
                <div key={following.userId} className='following'>
                    <Link to={'/profile/' + following.userId}>
                        <img className='following-profilePic' src={getProfilePicture(following.userId)} />
                        <h1 className='following-username'>{following.username}</h1>
                    </Link>
                </div>)
            )
            }
        </div>
    );
};

export default FollowingList;