import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FollowLists.css';

const FollowerList = ({ followers, onClose }) => {
    const navigate = useNavigate();

    const getProfilePicture = (userId) => {
        const user = followers.find(u => u.userId === userId)
        return user ? user.pfp : '/defaultProfilePic.jpg' // Fallback profile picture
    };

    const openPage = (userId) => {
        navigate(`/profile/${userId}`);
        location.reload();
    };

    const closeModal = () =>{
        onClose();
		document.getElementsByClassName('splitRight')[0].style.filter = 'blur(0px)';
    }

    return (
        <div className="followBackground">
            <p className="followClose" onClick={closeModal}>X</p>
            <div className='followList'>
            {followers.map(followers => (
                <div key={followers.userId} className='follow'>
                    <div onClick={() => openPage(followers.userId)}>
                        <img className='follow-profilePic' src={getProfilePicture(followers.userId)} />
                        <h1 className='follow-username'>{followers.username}</h1>
                    </div>
                </div>))}
            </div>
        </div>
    );
};

export default FollowerList;