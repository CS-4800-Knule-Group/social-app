import React from 'react';

const FollowButton = ({ onFollow, decryptToken, users }) => {
  return (
	<div className='follow-button' onClick={onFollow}>
        <p>{decryptToken ? (decryptToken.userId && users.followers ? (users.followers.indexOf(decryptToken.userId) != -1 ?
        "Unfollow" : "Follow") : "Follow") : "Follow"}</p>
	 </div>
  );
};

export default FollowButton;
