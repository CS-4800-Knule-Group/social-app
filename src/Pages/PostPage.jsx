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
    const [commentContent, setCommentContent] = useState();
    const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const { postId } = params;
    const IMG_SIZE = 100;

    const postApi = `https://knule.duckdns.org/posts/post/${postId}`;
    // const postApi = `http://localhost:3000/posts/post/${postId}`;        // local test

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
        const userApi = `https://knule.duckdns.org/users/${post.userId}`;   // userId from post
        // const userApi = `http://localhost:3000/users/${post.userId}`;   // local test

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
        // const commentApi = `http://localhost:3000/comments/post/${post.postId}`      // local test
        const commentApi = `https://knule.duckdns.org/comments/post/${post.postId}`
        const fetchComments = async() => {
            try {
                const response = await fetch(commentApi);
                if (!response.ok) {
                    throw new Error('Failed to fetch comments')
                }
                const postComments = await response.json();

                const sortedComments = postComments
                    .sort((x, y) => new Date(x.createdAt) - new Date(y.createdAt))
                    .map(comment => ({
                        ...comment,
                        createdAt: moment(comment.createdAt).local().format('MMMM D, YYYY [at] h:mm A')
                    }))
                setComments(sortedComments);
                // console.log(postComments);
            } catch (error) {
                console.error('Error fetching comments');
            }
        }
        fetchComments();
        console.log(comments)
    }, [post])

    const createComment = async() => {
        if (isAuthenticated) {
            try {
                const response = await fetch(`http://localhost:3000/comments/newComment`, {
                // const response = await fetch(`https://knule.duckdns.org/comments/newComment`, {
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

                const newComment = await response.json();
                // Add the new comment to the existing comments state
                setComments((prevComments) => [...prevComments, newComment]);       // error here
                // Clear the comment box
                setCommentContent('');
            } catch (error) {
                console.error('Comment failed', error);
            }
        }
    }

    const toggleCommentBox = () => {
        setIsCommentBoxVisible((prev) => !prev);
    }

    const handleChange = (e) => {
        setCommentContent(e.target.value);
    }

    // Ensure post and users are available before proceeding
    if (!post || !users || !comments) {
        return <div>Loading...</div>;
    }

    return (
        <div className='big-container'>
            <div className='left-container'>
                <Post
                post={post}
                openProfile={openProfile}
                users={users}
                isSinglePostPage={true}
                toggleCommentBox={toggleCommentBox}
                width={80}
                commentsCount={comments.length}
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
            <div className='right-container' style={{ visibility: isCommentBoxVisible ? 'visible' : 'hidden' }}>
                    <div className='small-right-container'>
                        <img src="" className='post-profilePic' height={IMG_SIZE} width={IMG_SIZE}/>
                        <div className='comment-input'>
                            <textarea 
                                type="textarea" 
                                rows="10" cols="30" 
                                placeholder='Post your reply' 
                                className='comment-textbox' 
                                value={commentContent}
                                onChange={handleChange}
                            />
                        </div>
                        <button className='postButton' onClick={createComment}>
                            Reply
                        </button>
                    </div>
            </div>
        </div>
    )
}

export default PostPage