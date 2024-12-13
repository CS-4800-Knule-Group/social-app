import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const MessageMenu = ({users, chats}) => {
    const navigate = useNavigate();

    const nav = (loc) => {
        navigate(loc);
        window.location.reload();
    }
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
    
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        };
    
        return date.toLocaleString('en-US', options);
      };

  return (
    <div className='Messages'>
        <h1 className='messageTitle'>Message</h1>
        <div className='userDiv'>
            <p>----</p>
        </div>
        {users.length > 0 ? users.map((chatUser, index) =>(
            <div className='lastUser' onClick={() => nav("/tempmsg/" + chatUser.userId)}>
                <div className='usersList'>
                    <img className='allPfps' src={chatUser.pfp} height={100} width={100} />
                    <h1>{chatUser.username}</h1>
                </div>
                <p className='lastDate'>{formatDate(chats[index].createdAt)}</p>
                <p className='lastChat'>{chats[index].text}</p>
                <div className='userDiv'>
                    <p>----</p>
                </div>
            </div>
        )) : 
        <div>
            <h3>No messages so far</h3>
        </div>}
    </div>
  )
}

export default MessageMenu