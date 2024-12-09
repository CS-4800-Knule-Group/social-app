import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';
import moment from 'moment';
import CopyrightFooter from '../Components/CopyrightFooter.jsx'
import './Feed.css'
import Post from '../Components/Post.jsx';

const Feed = () => {
    const outletElements = document.getElementsByClassName('splitRight')
	if(outletElements.length > 0){
		document.getElementsByClassName('splitRight')[0].style.filter = 'blur(0px)';
	}
    
    const navigate = useNavigate();
    
    const apiPosts = 'https://knule.duckdns.org/posts'
    const apiPostsTest = 'http://localhost:3000/posts'
    const apiUsers = 'https://knule.duckdns.org/users'

    const { user, isAuthenticated } = useAuth();
    const accessToken = Cookies.get('loginAuth');

    const[posts, setPosts] = useState([]);
    const[users, setUsers] = useState([]);
    const [myLikes, setMyLikes] = useState([]);
    const [postContent, setPostContent] = useState();
    const [postImg, setPostImg] = useState([]);


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
                 console.log(postsData)

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
            console.log(posts)
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
            const formData = new FormData();
            formData.append("content", postContent);
            formData.append("img1", postImg);
            try{
                await fetch(`${apiPosts}/${user.userId}`, {
                    method: 'POST',
                    body: formData
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
    }

    const toggleLike = async (postId, userId) => {
        if (isAuthenticated) {
            // update ui first
            const hasLiked = posts.find(post => post.postId === postId)?.likes.some(like => like.S == userId);
            console.log(`${hasLiked}`)

            // Optionally, update the local state to reflect the new like/unlike
            setPosts(prevPosts => 
                prevPosts.map(post =>
                    post.postId === postId
                        ? {
                            ...post,
                            likes: hasLiked
                                ? post.likes.filter(like => like.S !== userId) // Remove like
                                : [...post.likes, { S: userId }] // Add like
                        }
                        : post
                )
            );
            
            try {
                if (hasLiked) {
                    const response = await fetch(`https://knule.duckdns.org/likes/${postId}/${userId}`, {
                        method: "DELETE"
                    })
                } else {
                    const response = await fetch(`https://knule.duckdns.org/likes/${postId}`, {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ "userId": userId })
                    })
                }
            } catch (error) {
                console.error('error liking post', error);
            }
        }
    }
 
return (
    <div>
        <div className='feed'>
            <div className='post-input'>
                <input type='file' className="inputFile" id="file" onChange={(e) => setPostImg(e.target.files[0])} accept='image/*'/>
                <label className='imageInput' for="file">+</label>
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
                    openPost={() => openPost(post.postId)}
                    isSinglePostPage={false}
                    commentsCount={post.comments.length}
                    likesCount={post.likes.length}
                    onLike={() => toggleLike(post.postId, user.userId)}
                    liked={post.likes.some(like => like.S == user.userId)}
                />
            ))}
        </div>
        <CopyrightFooter/>
    </div>
)
};

export default Feed