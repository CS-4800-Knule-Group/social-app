import React from 'react';

const EditButton = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick}>Edit Profile</button>
    </div>
  );
};

export default EditButton;
