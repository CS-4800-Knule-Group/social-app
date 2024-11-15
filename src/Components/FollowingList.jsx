import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './LoginForm.css';

const FollowingList = ({ following, onClose }) => {

    return (
        <div className="login-form">
            <p onClick={onClose}>X</p>
            {following.map(following => (
                <div key={following.userId} className='following'>
                    <Link to={'/profile/' + following.userId}>
                        <img className='following-profilePic' src='/kirb.jpg' height={100} width={100} />
                        <h1 className='following-username'>{following.username}</h1>
                    </Link>
                </div>)
            )
            }
        </div>
    );
};

export default FollowingList;