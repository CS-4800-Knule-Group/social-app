import {React, useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import { createPortal } from 'react-dom';
import LoginForm from '../Components/LoginForm';
import { useParams } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import * as mutations from "../mutations.js"
import * as queries from "../queries.js"
import * as subscriptions from "../subscriptions.js"

const MsgTemp = () => {

    const apiUsers = 'https://knule.duckdns.org/users'
    const params = useParams();
    const [validCookie, setValidCookie] = useState(Cookies.get('loginAuth'));
    const [decryptToken, setDecryptToken] = useState(Cookies.get('loginAuth') ? jwtDecode(Cookies.get('loginAuth')) : undefined);
    const [openModal, setOpenModal] = useState(Cookies.get('loginAuth') ? false : true)
    const [recipientId, setRecipientId] = useState(params ? params.id : '');
    const [newMessage, setNewMessage] = useState([]);
    const [chats, setChats] = useState([]);
    const [currUser, setCurrUser] = useState([])

    const client = generateClient();

    const fetchLogin = async(e) => {
        e.preventDefault();
    
        const username = e.target.username.value;
        const password = e.target.password.value;
    
        try{
        const response = await fetch('https://knule.duckdns.org/auth/login', {
            method: 'POST',
            headers: {
            'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
            "username": username,
            "password": password,
            
            })
        });
    
        const loginResult = await response.json();
        const inFifteen = new Date(new Date().getTime() + 10 * 60 * 1000)
        Cookies.set('loginAuth', loginResult.acessToken,
            {
            expires: inFifteen
            }
        );
        setValidCookie(Cookies.get('loginAuth'))
        setDecryptToken(jwtDecode(Cookies.get('loginAuth')));
        
        } catch (error) {
        setValidCookie(undefined);
        console.error('Error authenticating login', error);
        }
    }
        

    useEffect(() => {
        setOpenModal(validCookie ? false : true)
        console.log({validCookie})
        console.log({decryptToken})
        //console.log({openModal})

    }, [validCookie])

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
                    userId: decryptToken.userId,
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
                ((chat.userId === decryptToken.userId && chat.targetId === recipientId) || 
                (chat.userId === recipientId && chat.targetId === decryptToken.userId)))
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
                    eq: decryptToken.userId
                }
            },{
                userId: {
                    eq: decryptToken.userId
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

    
    if(validCookie && recipientId != ''){
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
                            <p>{chat.userId == decryptToken.userId ? "You: " + chat.text : 
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
                {openModal && createPortal(
                  <LoginForm onSubmit={fetchLogin} />,
                  document.body
              )}
              <h1>Insert Target Username Here</h1>
                <input type='text' id='userInput' placeholder='Type your target username here...'/>
                <button onClick={changeRecipient}>Start Conversation</button>
                
            </div>
          )
    } 
  
}

export default MsgTemp