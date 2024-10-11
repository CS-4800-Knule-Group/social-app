import {React, useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import { createPortal } from 'react-dom';
import LoginForm from '../Components/LoginForm';
import { useParams } from 'react-router-dom';

const MsgTemp = () => {

    const params = useParams();
    const [validCookie, setValidCookie] = useState(Cookies.get('loginAuth'));
    const [decryptToken, setDecryptToken] = useState(Cookies.get('loginAuth') ? jwtDecode(Cookies.get('loginAuth')) : undefined);
    const [openModal, setOpenModal] = useState(Cookies.get('loginAuth') ? false : true)
    const [recipientId, setRecipientId] = useState(params ? params.id : '');

    let ws;

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
        
        console.log(recipientId);

        if( validCookie && recipientId!== ''){
            console.log("Server starting")
            ws = new WebSocket('ws://localhost:3000/' + decryptToken.userId)
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
            
            console.log('ws://localhost:3000/' + decryptToken.userId);
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

    const changeRecipient = () =>{
        setRecipientId(document.getElementById('userInput').value);
    }


    
    if(validCookie && recipientId != ''){
        return(
            <div>
                <h1>Insert Username Here</h1>
                <div id='chat'></div>
                <input type='text' id='msgInput' placeholder='Type your msg here...'/>
                <button onClick={sendMessage}>Send</button>
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