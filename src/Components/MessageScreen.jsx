import {React, useState, useEffect} from 'react'
import { generateClient } from 'aws-amplify/api';
import * as mutations from "../mutations.js"
import * as queries from "../queries.js"
import * as subscriptions from "../subscriptions.js"

const MessageScreen = ({tarUser, chats, currUser }) => {

    const [newMessage, setNewMessage] = useState([]);
    const client = generateClient();
    
    

    const sendMessage = async() => {
        if(newMessage != ''){
            await client.graphql({
                query: mutations.createMessages,
                variables: {
                    input: {
                        text: newMessage,
                        userId: currUser.userId,
                        targetId: tarUser.userId
                    }
                }
            })
        }

        setNewMessage("");

    }

    const sendMessageEnter = async(e) => {
        if (e.key === "Enter"){
            await sendMessage();
            e.target.value = "";
        }
    }

    const testEnter = (e) =>{
        setNewMessage(e.target.value);
        console.log(e.target.value)
    }


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
                    <div key={chat.id} className="chats">
                        {chat.userId == currUser.userId ?
                            <p className='userChat'>{chat.text}</p>
                            :
                            <p className='otherChat'>{chat.text}</p>
                        }
                    </div>
                ))}
            </div>
        </div>
        {/* <div className='MessagingTexter'>
            <input className='MessageChat' type='text' id='msgInput' placeholder='Type your msg here...' onChange={e => testEnter(e)}
            value={newMessage} onKeyUp={sendMessageEnter}/>
            <button className='MessageSend' onClick={sendMessage}>➤</button>
        </div> */}
    </div>
  )
}

export default MessageScreen