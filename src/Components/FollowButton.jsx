import React from 'react';
import { useAuth } from '../authContext';

const FollowButton = ({ onFollow, users }) => {
  const { user, isAuthenticated } = useAuth();
  return (
	<div className='follow-button' onClick={onFollow}>
        <p>
          {isAuthenticated ? (users.followers ? (users.followers.indexOf(user.userId) != -1 ?
          "Unfollow" : "Follow") : "Follow") : "Follow"}
          
        </p>
	 </div>
  );
};

export default FollowButton;
