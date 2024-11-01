import React, { useState } from 'react';
import './LoginForm.css';

const FollowerList = ({ followers, onClose }) => {

return (
    <div className="login-form">
        {followers.map(followers => (
					<div key={followers.userId} className='follower'>
						<img className='follower-profilePic' src='/kirb.jpg' height={100} width={100} />
						<h1 className='follower-username'>{followers.username}</h1>
					</div>)) } 
    </div>
);
};

export default FollowerList;