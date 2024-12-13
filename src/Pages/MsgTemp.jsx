import {React, useState, useEffect, useMemo} from 'react'
import { useParams } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import * as mutations from "../mutations.js"
import * as queries from "../queries.js"
import * as subscriptions from "../subscriptions.js"
import { userById } from '../dataFilters.js';
import { useAuth } from '../authContext.jsx';
import './MsgTemp.css'
import { getUsers } from '../database.js';
import MessageMenu from '../Components/MessageMenu.jsx';
import MessageScreen from '../Components/MessageScreen.jsx';

const MsgTemp = () => {
    const outletElements = document.getElementsByClassName('splitRight')
	if(outletElements.length > 0){
		document.getElementsByClassName('splitRight')[0].style.filter = 'blur(0px)';
	}
    const apiUsers = 'https://knule.duckdns.org/users'
    const params = useParams();
    const { user } = useAuth();
    const [recipientId, setRecipientId] = useState(params ? params.id : '');
    const [chats, setChats] = useState([]);
    const [newMessage, setNewMessage] = useState([]);
    const [currUser, setCurrUser] = useState([])
    const [tarUser, setTarUser] = useState([])
    const [userChats, setUserChats] = useState([])
    const [chatUsers, setChatUsers] = useState([])
    const [updateChats, setUpdateChats] = useState(true);

    const client = generateClient();
        
    const filterUser = async () => {
        const usersData = await getUsers();
        const filteredUsers = userById(usersData, user.userId)
        console.log("f-user")
        console.log(filteredUsers)
        setCurrUser(filteredUsers)
        
    };

    useEffect(() => {
		filterUser();
	}, []);  // only re-run the effect if apiEndpoint changes

    useEffect(() => {
		filterUser();
	}, [user]);
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
            
            setTarUser(filteredUsers)
            console.log("This is tarUser")
            console.log(filteredUsers)

          } catch (error) {
            console.error('Error fetching users', error);
          }

          
        };
        fetchUsers();
      }, [recipientId]);  // only re-run the effect if apiEndpoint changes
        

    const sendMessage = async() => {
        await client.graphql({
            query: mutations.createMessages,
            variables: {
                input: {
                    text: newMessage,
                    userId: currUser.userId,
                    targetId: recipientId
                }
            }
        })

        setNewMessage("");
        setUpdateChats(!updateChats);

    }

    const sendMessageEnter = async(e) => {
        if (e.key === "Enter"){
            sendMessage();
            e.target.value = "";
        }
    }


    useEffect(() => {
        async function fetchChats() {
            let allChats = await client.graphql({
                query: queries.listMessages,
            });
            allChats.data.listMessages.items = allChats.data.listMessages.items.sort((x, y) => new Date(y.createdAt) - new Date(x.createdAt))
            //console.log("all chats:")
            //console.log(allChats.data.listMessages.items);
            //console.log("Current user id");
            //console.log(currUser.userId)
            const filterChats = allChats.data.listMessages.items.filter(chat => 
                ((chat.userId === currUser.userId) || 
                (chat.targetId === currUser.userId)));

            let msgChats = [];
            console.log(msgChats)
            if(params.id != undefined){
                msgChats = allChats.data.listMessages.items.filter(chat => 
                ((chat.userId === currUser.userId && chat.targetId === recipientId) || 
                (chat.userId === recipientId && chat.targetId === currUser.userId)))
            }

            console.log("These are filtered chats")
            console.log(filterChats);
            if(msgChats.length > 0);
            setChats(msgChats);

            let chatUsers = [];
            let targetExists = false;

            if(filterChats.length > 0){
                for(let j = 0; j < filterChats.length; j++){
                    if(filterChats[j].userId == currUser.userId){
                        chatUsers.push(filterChats[j]);
                        break;
                    }
                }
            }
            for(let i = 0; i < filterChats.length; i++){
                targetExists = false;
                    for(let j = 0; j < chatUsers.length; j++){
                        if(chatUsers[j].targetId == (filterChats[i].targetId)){
                            targetExists = true;
                            break;
                        }
                    }
                    if(!targetExists){
                        chatUsers.push(filterChats[i])
                    }   
            }
            //console.log("These are chats from users:")
            //console.log(chatUsers)
            setUserChats(chatUsers);
        }
        fetchChats();
    }, [currUser, updateChats]);

    useEffect(() => {
        const filterUsers = async() => {
            const allUsers = await getUsers();

            let tempUsers = [];

            for(let i = 0; i < userChats.length; i++){
                //console.log(userChats[i].targetId)
                for(let j = 0; j < allUsers.length; j++){
                    if(allUsers[j].userId == userChats[i].targetId){
                        tempUsers.push(allUsers[j]);
                        break;
                    }
                }
            }

            //console.log("FILTER THE USERS")
            //console.log(tempUsers)
            setChatUsers(tempUsers);

        }
        if(userChats.length > 0){
            filterUsers();
        }

    }, [userChats])


    useEffect(() => {
        let filter
        if (recipientId != undefined) {
            filter = {
                or:[{
                    userId: {
                        eq: recipientId
                    },
                    targetId: {
                        eq: currUser.userId
                    }
                },{
                    userId: {
                        eq: currUser.userId
                    },
                    targetId: {
                        eq: recipientId
                    }
                }]
            }
        }else{
            filter = {
                or:[{
                    targetId: {
                        eq: currUser.userId
                    }
                },{
                    userId: {
                        eq: currUser.userId
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

    if(currUser.userId != undefined){
        return(
            <div>
                <div className='otherMessages'>
                    <MessageMenu users={chatUsers} chats={userChats}/>

                </div>
                {(params.id != undefined) && 
                    <div className='MessagingScreen'>
                        <MessageScreen tarUser={tarUser} chats={chats} currUser={currUser}/>
                        <div className='MessagingTexter'>
                            <input className='MessageChat' type='text' id='msgInput' placeholder='Type your msg here...' onChange={e => setNewMessage(e.target.value)}
                                value={newMessage} onKeyUp={sendMessageEnter}/>
                            <button className='MessageSend' onClick={sendMessage}>➤</button>
                        </div>
                    </div>
                }
                
                {/*<div className='MessagingScreen'>
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
                </div> */}
            </div>
        )
    }else {
        return(
            <div>
                Loading
            </div>
        )
    }
  
}

export default MsgTemp