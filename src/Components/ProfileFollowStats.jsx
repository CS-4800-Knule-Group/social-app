import React from 'react';

const ProfileFollowStats = ({ followers, following }) => {
  return (
    <div className='follow-section'>
					<div className='follow-text'>
						<p className='followers-text'>{followers ? followers.length : "unknown"}</p>
						<p>Followers</p>
					</div>
					<div className='vertical-line'></div>
					<div className='follow-text'>
						<p className='following-text'>{following ? following.length : "unknown"}</p>
						<p>Following</p>
					</div>
					<div className='vertical-line'></div>
				</div>
  );
};

export default ProfileFollowStats;
