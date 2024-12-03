// ProfileHeader.jsx
import React from 'react';

const ProfileHeader = ({ fullName, username, bio }) => {
  return (

	<div className='profile-text'>
		<h1 className='username'>{fullName || "NoDisplayNameFound"}</h1>
		<h3 className='fullName'>{(username || "NoUsernameFound")}</h3>
		<br/>
		<p className='bio'>
			{bio || "NoBioFound"}
		</p>
		<br/>
	</div>
  );
};

export default ProfileHeader;
