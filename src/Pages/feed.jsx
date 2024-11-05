import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import LoginForm from '../Components/LoginForm'
import { createPortal } from 'react-dom'
import './Feed.css'

const Feed = () => {
    
    
    const apiPosts = 'https://knule.duckdns.org/posts'
    const apiUsers = 'https://knule.duckdns.org/users'

    const[posts, setPosts] = useState([])
    const[users, setUsers] = useState([])
    const [validCookie, setValidCookie] = useState(Cookies.get('loginAuth') ? Cookies.get('loginAuth') : false);
    const [decryptToken, setDecryptToken] = useState(Cookies.get('loginAuth') ? jwtDecode(Cookies.get('loginAuth')) : false);
    const [openModal, setOpenModal] = useState(Cookies.get('loginAuth') ? false : true)
    const [postContent, setPostContent] = useState();

    
  //Compare login from a form (username & password)
  //Grant auth cookie if accepted
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
        Cookies.set('loginAuth', loginResult.accessToken,
            {
            expires: inFifteen
            }
        );
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
        //console.log({decryptToken})
        //console.log({openModal})

    }, [validCookie])

    //On page render, update Posts with the list of post data
    useEffect(() => {
        
        const fetchPosts = async () => {
            try {
                const response = await fetch(apiPosts, {
                method: 'GET', // should be lowercase 'method'
                });
        
                if (!response.ok) {
                throw new Error('Could not reach /posts');
                }
                const postsData = await response.json();
                
                console.log(postsData[0].timestamp);
                setPosts(postsData.sort((x, y) => {
                    return new Date(y.timestamp) - new Date(x.timestamp);    
                })); // Update the state with the fetched users
                console.log(posts)
            } catch (error) {
                console.error('Error fetching posts', error);
            }
            };
            fetchPosts();
    }, [])

    //Function to upload a post to the database
    const sendPost = async() => {
        if(validCookie){
            try{
                const response = await fetch(apiPosts + "/" + decryptToken.userId, {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        "content": postContent
                    }
                )})
                const postResult = await response;
                console.log(postResult);
                window.location.reload();
            } catch (err){
                console.error("Post failed. " + err);
            }
        }
    }
    //
    const handleChange = (e) => {
        setPostContent(e.target.value)
    }

    //On Page Render, update users with list of user data
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
                setUsers(usersData); // Update the state with the fetched users
                console.log(usersData)
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };
        fetchUsers();
    }, []);


 
return (
    <div>
        {openModal && createPortal(
          <LoginForm onSubmit={fetchLogin} />,
          document.body
        )}
        <div className='feed'>
            <div className='post-input'>
                <input type='text' placeholder=" Post text" className="post-textBox" onChange={handleChange}/>
                    <br/>
                <button className='post-button' onClick={sendPost}>
                    Post
                </button>
            </div>
            
            {posts.map(post =>(
                <div className='post'>
                <div className='poster'>
                    <img className='profilePicture' src='/kirb.jpg' height={100} width={100} />
                    <div className='textInfo'>
                            <h1 className='username'>{users.findIndex(i => i.userId ===(post.userId)) == -1 ? 'bad user' : users[users.findIndex(i => i.userId ===(post.userId))].username}</h1>

                        <p className='postTime'>{post.timestamp}</p>
                    </div>
                </div>
                <p>{post.content}</p>
            </div>
            ))}
        </div>
    </div>
)
}

export default Feed