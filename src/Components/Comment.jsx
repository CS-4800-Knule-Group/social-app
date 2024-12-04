import React, { useEffect, useState } from "react";
import moment from 'moment';
import './Comment.css';

const Comment = ({ comment }) => {
    const [user, setUser] = useState(null);
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
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user: ', error);
            }
        }
        fetchUser();
    }, [comment]);

    const openProfile = (userId) => {
        navigate(`/profile/${userId}`);
        location.reload();
    }

    return (
        <div className="whole-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" class="bi bi-arrow-return-right" className="comment-arrow" viewBox="0 0 16 16" fill="#a18f7c">
                <path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5"/>
            </svg>
            <div className="comment-box">
                <div className="leftside-comment">
                    <div className="comment-header">
                        <img className="comment-profilePic" src={user ? user.pfp : '/defaultProfilePic.jpg'} height={IMG_SIZE} width={IMG_SIZE}/>
                        <div className="header-texts">
                            <h1 className="comment-username" onClick={() => openProfile(user.userId)}>{user ? user.username : "NoUserNameFound"}</h1>
                            <p className="commentTime">{comment.createdAt}</p>
                        </div>
                    </div>

                    {comment && <p className="comment-text">{comment.content}</p>}
                </div>
            </div>
        </div>
    )
}

export default Comment;