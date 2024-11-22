import {React, useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import * as mutations from "../mutations.js"
import * as queries from "../queries.js"
import * as subscriptions from "../subscriptions.js"
import { userById } from '../dataFilters.js';
import { useAuth } from '../authContext.jsx';

const MsgTemp = () => {

    const apiUsers = 'https://knule.duckdns.org/users'
    const params = useParams();
    const { user, isAuthenticated, login } = useAuth();
    const [recipientId, setRecipientId] = useState(params ? params.id : '');
    const [newMessage, setNewMessage] = useState([]);
    const [chats, setChats] = useState([]);
    const [currUser, setCurrUser] = useState([])

    const client = generateClient();
        
    useEffect(() => {
		
		const filterUser = async () => {
			const usersData = await getUsers();
			const filteredUsers = userById(usersData, user.userId)
			setCurrUser(filteredUsers)
		};
		filterUser();
	}, []);  // only re-run the effect if apiEndpoint changes

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch(apiUsers, {
              method: 'GET', // should be lowercase 'method'
            });
    
            if (!response.ok) {
              throw new Error('Could not reach /users');
            }
            const usersData = await response.json();
            const filteredUsers = usersData.filter(user => user.userId == params.id)
            
            setCurrUser(filteredUsers)

          } catch (error) {
            console.error('Error fetching users', error);
          }

          
        };
        fetchUsers();
      }, []);  // only re-run the effect if apiEndpoint changes

    /*
    useEffect(() => {
        
        console.log(recipientId);

        if( validCookie && recipientId!== ''){
            console.log("Server starting")
            ws = new WebSocket('wss://knule.duckdns.org/' + decryptToken.userId)
            ws.onopen = () =>{
                console.log('Connected to ws server');
            }
    
            ws.onclose = () =>{
                console.log("ws connection closed");
            }
            
            ws.onmessage =(event) =>{
                const{from, text} = JSON.parse(event.data);
                const chatDiv = document.getElementById('chat');
                chatDiv.innerHTML += `<div class="message recieved"><strong>${from}:</strong> ${text}</div>`;
                chatDiv.scrollTop = chatDiv.scrollHeight;
            }
            
            console.log('wss://knule.duckdns.org/' + decryptToken.userId);
        }
    }, [recipientId])

    const sendMessage = () => {
        const input = document.getElementById('msgInput')
        const messageText = input.value;
        if (messageText.trim()) {
            const message = {
                recipientId: recipientId,
                text: messageText
            }
            ws.send(JSON.stringify(message))
            
            // display the sent message in the chat
            const chatDiv = document.getElementById('chat')
            chatDiv.innerHTML += `<div class="message sent"><strong>You:</strong> ${messageText}</div>`
            input.value = '';   // clear input
            chatDiv.scrollTop = chatDiv.scrollHeight;
        }
    }
        */

    const changeRecipient = () =>{
        setRecipientId(document.getElementById('userInput').value);
    }
        


    const sendMessage = async() => {
        await client.graphql({
            query: mutations.createMessages,
            variables: {
                input: {
                    text: newMessage,
                    userId: user.userId,
                    targetId: recipientId
                }
            }
        })

        setNewMessage("");

    }

    const sendMessageEnter = async(e) => {
        if (e.key === "Enter"){
            sendMessage();
            e.target.value = "";
        }
    }

    useEffect(() => {
        async function fetchChats() {
            const allChats = await client.graphql({
                query: queries.listMessages,
            });
            console.log(allChats.data.listMessages.items);
            
            const filterChats = allChats.data.listMessages.items.filter(chat => 
                ((chat.userId === user.userId && chat.targetId === recipientId) || 
                (chat.userId === recipientId && chat.targetId === user.userId)))
            console.log(filterChats);
            setChats(filterChats);
        }
        fetchChats();
    }, []);

    useEffect(() => {
        let filter
        if (recipientId) {
        filter = {
            or:[{
                userId: {
                    eq: recipientId
                },
                targetId: {
                    eq: user.userId
                }
            },{
                userId: {
                    eq: user.userId
                },
                targetId: {
                    eq: recipientId
                }
            }]
        }
    }

        const sub = client.graphql({
            query: subscriptions.onCreateMessages,
            variables: {
                filter
            }
        }).subscribe({
          next: ({ data }) =>
            setChats((prev) => [...prev, data.onCreateMessages]),
          error: (err) => console.log(err),
        });
        return () => sub.unsubscribe();
      }, []);

    
    if(recipientId != ''){
        return(
            <div>
                <h1>Chat with {currUser.length != 0 ? currUser[0].username : "No user found"} </h1>
                <div id='chat'>
                {chats
                .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
                .map((chat) => (
                    <div
                    key={chat.id}
                    className="chats"
                    >
                        <div>
                            <p>{chat.userId == user.userId ? "You: " + chat.text : 
                            currUser.length != 0 ? currUser[0].username + ": " + chat.text : "User not found"}</p>
                        </div>
                    </div>
                ))}
                </div>
                <input type='text' id='msgInput' placeholder='Type your msg here...' onChange={e => setNewMessage(e.target.value)}
                value={newMessage} onKeyUp={sendMessageEnter}/>
                <button onClick={sendMessage} >Send</button>
            </div>
        )
    }else{
        return (
            <div>
              <h1>Insert Target Username Here</h1>
                <input type='text' id='userInput' placeholder='Type your target username here...'/>
                <button onClick={changeRecipient}>Start Conversation</button>
                
            </div>
          )
    } 
  
}

export default MsgTemp