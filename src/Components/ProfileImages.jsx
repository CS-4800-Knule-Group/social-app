import React from 'react';

const ProfileImages = ({ banner, profilePic }) => {
  return (
    <div className="images">
      <img className='banner' src={banner} alt="Banner" />
      <img className='profilePic' src={profilePic ? profilePic : '/kirb.jpg'} alt="Profile" height={100} width={100} />
    </div>
  );
};

export default ProfileImages;
