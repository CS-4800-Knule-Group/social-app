import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './LoginForm.css';

const FollowerList = ({ followers, onClose }) => {

	const getProfilePicture = (userId) => {
        const user = followers.find(u => u.userId === userId)
        return user ? user.pfp : '/defaultProfilePic.jpg' // Fallback profile picture
    }

	return (
		<div className="login-form">
			<p onClick={onClose}>X</p>
			{followers.map(followers => (
				<div key={followers.userId} className='follower'>
					<Link to={'/profile/' + followers.userId}>
						<img className='follower-profilePic' src={getProfilePicture(followers.userId)} />
						<h1 className='follower-username'>{followers.username}</h1>
					</Link>
				</div>))}
		</div>
	);
};

export default FollowerList;