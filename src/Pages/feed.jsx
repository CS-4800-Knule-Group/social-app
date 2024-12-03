import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';
import moment from 'moment';
import CopyrightFooter from '../Components/CopyrightFooter.jsx'
import './Feed.css'
import Post from '../Components/Post.jsx';

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
                method: 'GET',
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
    }, [accessToken]);

    //On Page Render, update users with list of user data
    useEffect(() => { 
        const fetchUsers = async () => {
            try {
                const response = await fetch(apiUsers, {
                    method: 'GET',
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

    //Function to upload a post to the database
    const createPost = async() => {
        if(isAuthenticated){
            try{
                await fetch(`${apiPosts}/${user.userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({ "content": postContent })
                })
                window.location.reload();
            } catch (err){
                console.error("Post failed. " + err);
                window.location.reload();
            }
        }
    };
    
    const handleChange = (e) => {
        setPostContent(e.target.value);
    };

	const openProfile = (userId) => {
        navigate(`/profile/${userId}`);
        location.reload();
    };

    const openPost = (postId) => {
        navigate(`/post/${postId}`);
        location.reload();
    }
 
return (
    <div>
        <div className='feed'>
            <div className='post-input'>
                <input type='text' placeholder=" Speak your mind" className="post-textBox" onChange={handleChange}/>
                    <br/>
                <button className='post-button' onClick={createPost}>
                    Post
                </button>
            </div>
            
            {posts.map(post => (
				<Post
                    key={post.postId}
                    post={post}
                    users={users}
                    openProfile={openProfile}
                    onClick={() => openPost(post.postId)}
                />
            ))}
        </div>
        <CopyrightFooter/>
    </div>
)
};

export default Feed