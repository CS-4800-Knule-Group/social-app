import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './Messages.css'
import { createPortal } from 'react-dom';
import LoginForm from '../Components/LoginForm.jsx';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


const Messages = () => {

  const [validCookie, setValidCookie] = useState(Cookies.get('loginAuth'));
  const [decryptToken, setDecryptToken] = useState(Cookies.get('loginAuth') ? jwtDecode(Cookies.get('loginAuth')) : undefined);
  const [openModal, setOpenModal] = useState(Cookies.get('loginAuth') ? false : true)
  const [openChat, setOpenChat] = useState(false)

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
      const inFifteen = new Date(new Date().getTime() + 2 * 60 * 1000)
      Cookies.set('loginAuth', loginResult.acessToken,
        {
          expires: inFifteen
        }
      );
      const decoded = jwtDecode(loginResult.acessToken);
      //console.log(decoded); 
      setValidCookie(Cookies.get('loginAuth'))
      
    } catch (error) {
      setValidCookie(undefined);
      console.error('Error authenticating login', error);
    }
  }
    

  useEffect(() => {
    const login = Cookies.get('loginAuth');
      
    setValidCookie(login ? login : undefined);
    setDecryptToken(login ? jwtDecode(validCookie) : "Yeah this fucked up")
    setOpenModal(login ? false : true)
    console.log({validCookie})
    console.log({decryptToken})
    //console.log({openModal})

  }, [validCookie])

  const toggleChat = () => {
    setOpenChat(openChat => !openChat)
    console.log(openChat)
  }

  // const apiChat = 'https://knule.duckdns.org/'
  
  
  /* useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await fetch(apiChat, {
          method: 'GET', // should be lowercase 'method'
        });

        if (!response.ok) {
          throw new Error('Could not reach /likes');
        }
        const chatData = await response.json();
        setLikes(chatData); // Update the state with the fetched users
        console.log(chat)
      } catch (error) {
        console.error('Error fetching chat', error);
      }
    };
    fetchChat();
  }, []);  // only re-run the effect if apiEndpoint changes
*/
  
  return (
    <div>
         {openModal && createPortal(
          <LoginForm onSubmit={fetchLogin} />,
          document.body
      )}
      {openChat && createPortal(
          <newMsg/>,
          document.body
      )}
        <button onClick={toggleChat}>Start a new chat</button>

       
        
        <br/>
      <h1>Messages</h1>
      <Link to={'/private'}>=
          <button>Chat with 'follower'</button>
        </Link>
        <p></p>
        <button> Chat with 'follower'</button>
        <p></p>
        <button> Chat with 'follower'</button>
    
    </div>
  );
}



export default Messages;