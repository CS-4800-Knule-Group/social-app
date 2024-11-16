import React from 'react';
import { useParams, Link } from 'react-router-dom'


const MessageButton = ({ params }) => {
  return (
    <Link to={'/tempmsg/' + params.id}>
        <button>Send Message?</button>
    </Link>
  );
};

export default MessageButton;
