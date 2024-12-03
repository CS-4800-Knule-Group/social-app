import { React, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';
import Post from '../Components/Post';
import Comment from '../Components/Comment';
import moment from 'moment';
import './PostPage.css'

const PostPage = () => {
    const { user, isAuthenticated } = useAuth();
    const [post, setPost] = useState(null);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const { postId } = params;

    // // const postApi = `https://knule.duckdns.org/posts/post/${postId}`;
    const postApi = `http://localhost:3000/posts/post/${postId}`;

    useEffect(() => {
        const fetchPost = async() => {
            try {
                const response = await fetch(postApi);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                // parse JSON response
                const post = await response.json();
                post.timestamp = moment(post.timestamp).local().format('MMMM D, YYYY [at] h:mm A')
                setPost(post)
                console.log(post)
            } catch (error) {
                console.error('Error fetching post: ', error);
            }
        };
        fetchPost();
    }, [postId])

    useEffect(() => {
        if (!post) return;
        // const userApi = `https://knule.duckdns.org/users/${post.userId}`;   // userId from post
        const userApi = `http://localhost:3000/users/${post.userId}`;   // userId from post

        const fetchUser = async() => {
            try {
                const response = await fetch(userApi);
    
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                // parse json response
                const userData = await response.json();
                setUsers(userData);
                console.log(userData)
            } catch (error) {
                console.error('Error fetching user: ', error);
            }
        }
        fetchUser();
    }, [post])

    const openProfile = (userId) => {
        navigate(`/profile/${userId}`);
        location.reload();
    };

    useEffect(() => {
        if (!post) return;
        const commentApi = `http://localhost:3000/comments/post/${post.postId}`
        const fetchComments = async() => {
            try {
                const response = await fetch(commentApi);
                if (!response.ok) {
                    throw new Error('Failed to fetch comments')
                }
                const postComments = await response.json();
                setComments(postComments);
                console.log(postComments);
            } catch (error) {
                console.error('Error fetching comments');
            }
        }
        fetchComments();
    }, [post])

    const createComment = async() => {
        if (isAuthenticated) {
            try {
                await fetch(`http://localhost:3000/comments/post/${post.postId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        "postId": post.postId,
                        "userId": user.userId,
                        "content": commentContent
                    })
                });
                window.location.reload();
            } catch (error) {
                console.error('Comment failed');
            }
        }
    }

    // Ensure post and users are available before proceeding
    if (!post || !users || !comments) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            <Post 
            post={post}
            openProfile={openProfile}
            users={users}
            />
            
            <div className='comments-container'>
                {comments.map(comment => (
                    <Comment 
                        key={comment.commentId}
                        comment={comment}
                    />
                ))}
            </div>
        </div>
    )
}

export default PostPage