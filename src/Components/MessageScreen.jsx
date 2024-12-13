import React from 'react'

const MessageScreen = ({tarUser, chats, currUser, }) => {
  return (
    <div className='MessagingScreen'>
        <div className='Messaging'>
            <div className='poster'>
                <img className='profilePicture' src={tarUser.length != 0 ? tarUser[0].pfp != undefined ? tarUser[0].pfp : '/kirb.jpg' : '/kirb.jpg'} height={100} width={100} />
                <h1>{tarUser.length != 0 ? tarUser[0].username : "No user found"}</h1>
            </div>
            <div id='chat'>
                {chats
                .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
                .map((chat) => (
                    <div
                    key={chat.id}
                    className="chats"
                    >
                        <div>
                            <p>{chat.userId == currUser.userId ? "You: " + chat.text : 
                            tarUser.length ? tarUser[0].username + ": " + chat.text : "User not found"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className='MessagingTexter'>
            <input className='MessageChat' type='text' id='msgInput' placeholder='Type your msg here...' onChange={e => setNewMessage(e.target.value)}
            value={newMessage} onKeyUp={sendMessageEnter}/>
            <button className='MessageSend' onClick={sendMessage}>➤</button>
        </div>
    </div>
  )
}

export default MessageScreen