import React, { useState, useEffect } from 'react'
import './Messages.css'
import { Link } from 'react-router-dom'

const Messages = () => {
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
        {/*turn into modal */}
        <button>Start a new chat</button>
    
        
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