import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FollowLists.css';

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

    const closeModal = () =>{
        onClose();
        const outletElements = document.getElementsByClassName('splitRight')
        if(outletElements.length > 0){
            document.getElementsByClassName('splitRight')[0].style.filter = 'blur(0px)';
        }    
    }

    return (
        <div className="followBackground" data-testId="window">
            <p className="followClose" data-testId='closeBtn' onClick={closeModal}>X</p>
            <div className='followList'>
                {following.map(following => (
                    <div key={following.userId} className='follow'>
                        <div onClick={() => openPage(following.userId)} data-testId="openPage">
                            <img className='follow-profilePic' data-testId='following-profilePic' src={getProfilePicture(following.userId)} alt={following.username} />
                            <h1 className='follow-username'>{following.username}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FollowingList;