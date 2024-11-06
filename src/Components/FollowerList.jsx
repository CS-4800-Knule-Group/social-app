import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './LoginForm.css';

const FollowerList = ({ followers, onClose }) => {

return (
    <div className="login-form">
        <p onClick={onClose}>X</p>
        {followers.map(followers => (
					<div key={followers.userId} className='follower'>
						<Link to={'/profile/'+ followers.userId}>
						<img className='follower-profilePic' src='/kirb.jpg' height={100} width={100} />
						<h1 className='follower-username'>{followers.username}</h1>
						</Link>
					</div>)) } 
    </div>
);
};

export default FollowerList;