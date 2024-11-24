import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { createPortal } from 'react-dom'
import { useAuth } from '../authContext'
import './Feed.css'
import PostButton from '../Components/PostButton'
import { getUsers } from '../database'

const Feed = () => {
    
    
    const apiPosts = 'https://knule.duckdns.org/posts'
    const apiUsers = 'https://knule.duckdns.org/users'

    const[posts, setPosts] = useState([])
    const[users, setUsers] = useState([])
    const {user, isAuthenticated} = useAuth();
    const [openModal, setOpenModal] = useState(isAuthenticated)
    const [postContent, setPostContent] = useState();


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

    //On Page Render, update users with list of user data
    useEffect(() => { 
        getUsers();
    }, []);


 
return (
    <div>
        <div className='feed'>
            <PostButton />
            
            {posts.map(post =>(
                <div className='post'>
                    <div className='poster'>
                        <img className='profilePicture' src='/kirb.jpg' height={100} width={100} />
                        <div className='textInfo'>
                                <h1 className='username'>
                                    {users.findIndex(i => i.userId ===(post.userId)) == -1 ? 'bad user' : users[users.findIndex(i => i.userId ===(post.userId))].username}
                                </h1>

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