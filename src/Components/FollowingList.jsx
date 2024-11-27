import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const FollowingList = ({ following, onClose }) => {
    const navigate = useNavigate();

    const getProfilePicture = (userId) => {
        const user = following.find(u => u.userId === userId);
        return user ? user.pfp : '/defaultProfilePic.jpg'; // Fallback profile picture
    };

    const openPage = (userId) => {
        navigate(`/profile/${userId}`);
        location.reload();
    };

    return (
        <div className="login-form">
            <p onClick={onClose}>X</p>
            {following.map(following => (
                <div key={following.userId} className='following'>
                    <div onClick={() => openPage(following.userId)}>
                        <img className='following-profilePic' src={getProfilePicture(following.userId)} alt={following.username} />
                        <h1 className='following-username'>{following.username}</h1>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FollowingList;