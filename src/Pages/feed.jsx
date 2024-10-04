import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import LoginForm from '../Components/LoginForm'
import { createPortal } from 'react-dom'
import './Feed.css'

const Feed = () => {
    
    const[posts, setPosts] = useState([])
    const apiPosts = 'https://knule.duckdns.org/posts'

    const [validCookie, setValidCookie] = useState(Cookies.get('loginAuth') ? Cookies.get('loginAuth') : false);
    const [decryptToken, setDecryptToken] = useState(Cookies.get('loginAuth') ? jwtDecode(Cookies.get('loginAuth')) : false);
    const [openModal, setOpenModal] = useState(Cookies.get('loginAuth') ? false : true)

    const [postContent, setPostContent] = useState();

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

    const sendPost = async() => {
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

    const handleChange = (e) => {
        setPostContent(e.target.value)
    }




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
                        <h1 className='username'>{post.userId}</h1>
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