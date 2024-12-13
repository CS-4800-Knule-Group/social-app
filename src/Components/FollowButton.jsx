import React from 'react';
import { useAuth } from '../authContext';

const FollowButton = ({ onFollow, followed }) => {
  return (
	<div className='follow-button' onClick={onFollow}>
        <p className='follow-button-text'>
          {followed ? "Unfollow" : "Follow"}
        </p>
	 </div>
  );
};

export default FollowButton;
