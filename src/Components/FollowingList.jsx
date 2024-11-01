import React, { useState } from 'react';
import './LoginForm.css';

const FollowingList = ({ following, onClose }) => {

return (
    <div className="login-form">
        {following.map(following => (
						<div key={following.userId} className='folloing'>
							<img className='following-profilePic' src='/kirb.jpg' height={100} width={100} />
							<h1 className='following-username'>{following.username}</h1>
						</div> )
                    )
        }
    </div>
);
};

export default FollowingList;