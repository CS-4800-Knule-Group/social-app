import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const MessageMenu = ({users, chats}) => {
    const navigate = useNavigate();

    const nav = (loc) => {
        navigate(loc);
        window.location.reload();
    }
    
  return (
    <div className='Messages'>
        <h1>Who would you like to message?</h1>
        {users.map((chatUser, index) =>(
            <div onClick={() => nav("/tempmsg/" + chatUser.userId)}>
                <h1>{chatUser.username}</h1>
                <p>{chats[index].text}</p>
                <p>{chats[index].createdAt}</p>

            </div>
        ))}
    </div>
  )
}

export default MessageMenu