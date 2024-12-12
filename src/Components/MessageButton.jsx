import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'


const MessageButton = ({ params }) => {
  const navigate = useNavigate();
  return (
        <img onClick={() => navigate("/tempmsg/" + params.id)} className='message-button' alt='Message' src='/MessageIcon.png' />
  );
};

export default MessageButton;
