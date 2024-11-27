import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import LoginForm from '../Components/LoginForm'
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom'
import { useAuth } from '../authContext';
import moment from 'moment';
import './Feed.css'

const Feed = () => {
    const navigate = useNavigate();
    
    const apiPosts = 'https://knule.duckdns.org/posts'
    const apiUsers = 'https://knule.duckdns.org/users'

    const { user, isAuthenticated } = useAuth();
    const accessToken = Cookies.get('loginAuth')

    const[posts, setPosts] = useState([])
    const[users, setUsers] = useState([])
    const [postContent, setPostContent] = useState();


    //On page render, update Posts with the list of post data
    useEffect(() => {
        
        const fetchPosts = async () => {
            try {
                const response = await fetch(apiPosts, {
                method: 'GET', // should be lowercase 'method'
                header: {
                    'Authorization': 'BEARER ' + accessToken
                }
                });
        
                if (!response.ok) {
                throw new Error('Could not reach /posts');
                }
                const postsData = await response.json();
                // console.log(postsData)

                const sortedPosts = postsData
                    .sort((x, y) => new Date(y.timestamp) - new Date(x.timestamp))
                    .map(post => ({
                        ...post,
                        timestamp: moment(post.timestamp).local().format('MMMM D, YYYY [at] h:mm A')
                    }));

                setPosts(sortedPosts);         // Update the state with the fetched users sorted
            } catch (error) {
                console.error('Error fetching posts', error);
            }
            };
            fetchPosts();
    }, [])

    //Function to upload a post to the database
    const createPost = async() => {
        if(isAuthenticated){
            try{
                const response = await fetch(apiPosts + "/" + user.userId, {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        "content": postContent
                    }
                )})
                window.location.reload();
            } catch (err){
                console.error("Post failed. " + err);
                window.location.reload();
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
                // console.log(usersData)
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };
        fetchUsers();
    }, []);

    const getProfilePicture = (userId) => {
        const user = users.find(u => u.userId === userId)
        return user ? user.pfp : '/defaultProfilePic.jpg' // Fallback profile picture
    }

	const openPage = (userId) => {
        navigate(`/profile/${userId}`);
        location.reload();
    };
 
return (
    <div>
        <div className='feed'>
            <div className='post-input'>
                <input type='text' placeholder=" Post text" className="post-textBox" onChange={handleChange}/>
                    <br/>
                <button className='post-button' onClick={createPost}>
                    Post
                </button>
            </div>
            
            {posts.map(post =>(
                <div className='post'>
                <div className='poster'>
                        <img
                            className='profilePicture'
                            src={getProfilePicture(post.userId)} // Use the correct profile picture here
                            height={100}
                            width={100}
							onClick={() => openPage(post.userId)}
                            alt="Profile"
                        />
                    <div className='textInfo'>
                            <h1 className='username' onClick={() => openPage(post.userId)}>{users.findIndex(i => i.userId ===(post.userId)) == -1 ? 'bad user' : users[users.findIndex(i => i.userId ===(post.userId))].username}</h1>

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