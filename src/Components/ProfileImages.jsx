import React from 'react';

const ProfileImages = ({ banner, profilePic }) => {
  return (
    <div className="images">
      <div className='banner-container'>
        <img className='banner' src={banner} alt="Banner"/>
      </div>
      <img className='profilePic' src={profilePic ? profilePic : '/kirb.jpg'} alt="Profile" height={100} width={100} />
    </div>
  );
};

export default ProfileImages;
