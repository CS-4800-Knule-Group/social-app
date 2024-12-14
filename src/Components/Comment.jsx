import React, { useEffect, useState } from "react";
import { useAuth } from '../authContext.jsx'
import { useNavigate } from 'react-router-dom';
import './Comment.css';

const genericUser = {
    userId: "5"
}
const Comment = ({ comment, deleteComment, testUser=genericUser }) => {
    const [commentUser, setCommentUser] = useState(null);
    console.log("Use auth")
    console.log(useAuth());
    let user
    if(useAuth() != undefined){
        user = useAuth();     // user of app
    }
    const navigate = useNavigate();
    const IMG_SIZE = 100;

    useEffect(() => {
        const userApi = `https://knule.duckdns.org/users/${comment.userId}`;   // userId from post
        // const userApi = `http://localhost:3000/users/${comment.userId}`;   // local test

        const fetchUser = async() => {
            try {
                const response = await fetch(userApi);
    
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                // parse json response
                const userData = await response.json();
                setCommentUser(userData);
            } catch (error) {
                console.error('Error fetching user: ', error);
            }
        }
        fetchUser();
    }, [comment]);

    const openProfile = (userId) => {
        if(commentUser){
            navigate(`/profile/${userId}`);
            location.reload();
        }
    }

    return (
        <div className="whole-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" class="bi bi-arrow-return-right" className="comment-arrow" viewBox="0 0 16 16" fill="#a18f7c">
                <path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5"/>
            </svg>
            <div className="comment-box">
                <div className="leftside-comment">
                    <div className="comment-header">
                        <img className="comment-profilePic" src={commentUser ? commentUser.pfp : '/defaultProfilePic.jpg'} height={IMG_SIZE} width={IMG_SIZE} onClick={() => openProfile(commentUser.userId)}/>
                        <div className="header-texts">
                            <h1 className="comment-username" data-testid={'comment-username'} onClick={() => openProfile(commentUser ? commentUser.userId : '')}>{commentUser ? commentUser.username : "NoUserNameFound"}</h1>
                            <p className="commentTime">{comment.createdAt}</p>
                        </div>
                    </div>

                    {comment && <p className="comment-text">{comment.content}</p>}
                </div>
                <div className="rightside-comment">
                    <svg xmlns="http://www.w3.org/2000/svg" className="deleteIcon" data-testid={'delete-Comment'} onClick={() => deleteComment(comment.commentId)} visibility={ user ? (user.userId == comment.userId ? "visible" : "hidden"): (testUser.userId == comment.userId ? "visible" : "hidden") } width="32" height="32" fill="#a18f7c" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Comment;