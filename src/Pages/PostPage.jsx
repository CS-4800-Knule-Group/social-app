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
                // console.log(post)
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
                // console.log(userData)
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
        // console.log(comments)
    }, [post])

    const createComment = async() => {
        if (isAuthenticated) {
            try {
                const response = await fetch(`https://knule.duckdns.org/comments/newComment`, {
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
                newComment.createdAt = moment(newComment.createdAt).local().format('MMMM D, YYYY [at] h:mm A')
                // Add the new comment to the existing comments state
                setComments((prevComments) => [...prevComments, newComment]);
                // Clear the comment box
                setCommentContent('');
            } catch (error) {
                console.error('Comment failed', error);
            }
        }
    }

    const deleteComment = async (commentId) => {
        if (isAuthenticated) {
            setComments((prevComments) => prevComments.filter(comment => comment.commentId !== commentId));
            try {
                await fetch(`https://knule.duckdns.org/comments/${postId}/${commentId}`, {
                    method: "DELETE"
                })
            } catch (err) {
                console.log(err);
            }
        }
    }

    const toggleCommentBox = () => {
        setIsCommentBoxVisible((prev) => !prev);
    }

    const handleChange = (e) => {
        setCommentContent(e.target.value);
    }

    const toggleLike = async (postId, userId) => {
        if (isAuthenticated) {
            // update ui first
            const hasLiked = post.likes.some(like => like.S == userId);
            console.log(`${hasLiked}`)
            
            // Optimistic update
            setPost((prevPost) => ({
                ...prevPost,
                likes: hasLiked
                ? prevPost.likes.filter((like) => like.S !== userId)
                : [...prevPost.likes, { S: userId }],
            }));

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
                likesCount={post.likes.length}
                onLike={() => toggleLike(post.postId, user.userId)}
                liked={post.likes.some(like => like.S == user.userId)}
                />
                
                <div className='comments-container'>
                    {comments.map(comment => (
                        <Comment 
                            key={comment.commentId}
                            comment={comment}
                            deleteComment={deleteComment}
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